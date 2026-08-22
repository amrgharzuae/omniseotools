import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface GenerateMetaRequestBody {
  topicOrUrl?: string;
  targetKeywords?: string;
  brandName?: string;
  tone?: "professional" | "engaging" | "direct" | "creative";
}

interface MetaResponseData {
  title: string;
  description: string;
}

function getApiKeys(): { geminiKey?: string; openAiKey?: string } {
  let geminiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GEMINI_API_KEY ||
    (process.env.AI_API_KEY && !process.env.AI_API_KEY.startsWith("sk-")
      ? process.env.AI_API_KEY
      : undefined);

  let openAiKey =
    process.env.OPENAI_API_KEY ||
    (process.env.AI_API_KEY && process.env.AI_API_KEY.startsWith("sk-")
      ? process.env.AI_API_KEY
      : undefined);

  // Fallback direct reader for .env.local in development
  if (!geminiKey && !openAiKey) {
    try {
      const envPath = path.resolve(process.cwd(), ".env.local");
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, "utf-8");
        for (const line of content.split("\n")) {
          const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*?)\s*$/);
          if (match) {
            const key = match[1];
            const val = match[2].replace(/^["']|["']$/g, "").trim();
            if (
              key === "GEMINI_API_KEY" ||
              key === "GOOGLE_API_KEY" ||
              key === "GOOGLE_GEMINI_API_KEY"
            ) {
              geminiKey = val;
            } else if (key === "OPENAI_API_KEY") {
              openAiKey = val;
            } else if (key === "AI_API_KEY") {
              if (val.startsWith("sk-")) openAiKey = val;
              else geminiKey = val;
            }
          }
        }
      }
    } catch {
      // Ignore file read error
    }
  }

  return { geminiKey: geminiKey?.trim(), openAiKey: openAiKey?.trim() };
}

export async function POST(request: NextRequest) {
  try {
    let body: GenerateMetaRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON in request body.",
        },
        { status: 400 }
      );
    }

    const { topicOrUrl, targetKeywords, brandName, tone = "professional" } = body || {};

    // Validate required parameter
    if (!topicOrUrl || typeof topicOrUrl !== "string" || !topicOrUrl.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a topic, keyword, or webpage context to generate metadata.",
        },
        { status: 400 }
      );
    }

    const validTones = ["professional", "engaging", "direct", "creative"] as const;
    const selectedTone = tone && validTones.includes(tone as any) ? tone : "professional";

    const { geminiKey, openAiKey } = getApiKeys();

    const systemPrompt = `You are an expert Google SEO copywriter.
Generate a high-CTR Title and Meta Description for the topic.

STRICT CONSTRAINTS:
1. Title: Exactly 50 to 60 characters. Front-load primary keywords. Append brand name if provided. Title Case.
2. Meta Description: Exactly 140 to 155 characters. Highlight primary benefit and end with an actionable CTA.
3. Tone: ${selectedTone}.
4. Output: Strict raw JSON only: {"title": "string (50-60 chars)", "description": "string (140-155 chars)"}`;

    const userPrompt = `Topic / URL: ${topicOrUrl.trim()}
Target Keywords: ${targetKeywords?.trim() || "Extract primary intent"}
Brand Name: ${brandName?.trim() || "None"}
Tone: ${selectedTone}`;

    let parsedResult: MetaResponseData | null = null;

    if (geminiKey) {
      // Prioritize ultra-fast flash-lite models for sub-second responses
      const geminiModels = [
        "gemini-flash-lite-latest",
        "gemini-3.5-flash-lite",
        "gemini-3.1-flash-lite",
        "gemini-3.6-flash",
      ];
      let lastGeminiError = "";

      for (const model of geminiModels) {
        try {
          const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;

          const response = await fetch(geminiEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `${systemPrompt}\n\n${userPrompt}`,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.6,
                responseMimeType: "application/json",
                maxOutputTokens: 220, // Strict token ceiling for sub-second SEO generation
              },
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            lastGeminiError = `Gemini (${model}) ${response.status}: ${errorText}`;
            console.warn(lastGeminiError);
            continue;
          }

          const data = await response.json();
          const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawContent) {
            const cleanJson = rawContent.replace(/```(?:json)?\s*([\s\S]*?)\s*```/i, "$1").trim();
            parsedResult = JSON.parse(cleanJson);
            if (parsedResult?.title && parsedResult?.description) {
              break;
            }
          }
        } catch (e: any) {
          lastGeminiError = e.message || String(e);
          console.warn(`Attempt with ${model} failed:`, e);
        }
      }

      if (!parsedResult) {
        throw new Error(lastGeminiError || "Failed to generate metadata using Google Gemini API.");
      }
    } else if (openAiKey) {
      // OpenAI API Fallback with strict max_tokens
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.6,
          max_tokens: 220,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const rawContent = data.choices?.[0]?.message?.content;
      if (!rawContent) {
        throw new Error("Empty response from OpenAI API.");
      }

      const cleanJson = rawContent.replace(/```(?:json)?\s*([\s\S]*?)\s*```/i, "$1").trim();
      parsedResult = JSON.parse(cleanJson);
    } else {
      return NextResponse.json(
        {
          success: false,
          error:
            "Gemini API key is not configured. Please add GEMINI_API_KEY=your_key in your .env.local file to enable AI generation.",
        },
        { status: 500 }
      );
    }

    if (
      !parsedResult ||
      typeof parsedResult.title !== "string" ||
      typeof parsedResult.description !== "string"
    ) {
      throw new Error("Malformed response format received from AI model.");
    }

    const cleanTitle = parsedResult.title.replace(/^["'\s]+|["'\s]+$/g, "").trim();
    const cleanDesc = parsedResult.description.replace(/^["'\s]+|["'\s]+$/g, "").trim();

    return NextResponse.json(
      {
        success: true,
        data: {
          title: cleanTitle,
          description: cleanDesc,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during AI metadata generation.";
    console.error("Error in /api/generate-meta:", error);

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}