export type DirectiveCategory =
  | "privacy"
  | "hardware"
  | "payments"
  | "performance";

export type DirectiveValueMode = "none" | "self" | "all" | "custom" | "omit";

export interface DirectiveDefinition {
  id: string;
  name: string;
  category: DirectiveCategory;
  description: string;
  threatMitigation: string;
  w3cStatus: "W3C Working Draft" | "W3C Editor's Draft" | "Chrome Standard" | "Experimental";
  standardDefault: "()" | "(self)" | "*" | "omit";
  riskLevel: "critical" | "high" | "medium" | "low";
  specUrl: string;
  browserSupport: {
    chrome: string;
    firefox: string;
    safari: string;
    edge: string;
  };
  sampleOrigins?: string[];
}

export interface DirectiveState {
  mode: DirectiveValueMode;
  includeSelf: boolean;
  customOrigins: string[];
}

export type PermissionsPolicyState = Record<string, DirectiveState>;

export interface PolicyPreset {
  id: string;
  name: string;
  badge?: string;
  description: string;
  targetAudience: string;
  state: Record<string, { mode: DirectiveValueMode; includeSelf?: boolean; customOrigins?: string[] }>;
}

export const DIRECTIVE_CATEGORIES: Array<{
  id: DirectiveCategory;
  name: string;
  description: string;
  iconName: string;
  badgeColor: string;
}> = [
  {
    id: "privacy",
    name: "Privacy & Tracking Protection",
    description: "Neutralize ad tracking, cohort profiling (FLoC / Topics), and behavioral telemetry APIs.",
    iconName: "EyeOff",
    badgeColor: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
  },
  {
    id: "hardware",
    name: "Device Hardware & Sensors",
    description: "Restrict access to physical peripherals, video cameras, microphones, and inertial sensors.",
    iconName: "Cpu",
    badgeColor: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
  },
  {
    id: "payments",
    name: "Payments & Identity",
    description: "Secure payment gateways, passkeys, WebAuthn, smart cards, and physical device connectivity.",
    iconName: "CreditCard",
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    id: "performance",
    name: "Performance & Rendering",
    description: "Govern media playback, display modes, synchronous execution, and UI presentation.",
    iconName: "Gauge",
    badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  },
];

export const DIRECTIVE_DEFINITIONS: DirectiveDefinition[] = [
  // 1. Privacy & Tracking Protection
  {
    id: "interest-cohort",
    name: "interest-cohort (FLoC / Privacy Sandbox)",
    category: "privacy",
    description: "Controls whether the browser groups users into cohort buckets based on browsing history for targeted advertising (Google FLoC).",
    threatMitigation: "Disabling prevents third-party ad networks and browser vendors from profiling user browsing patterns without consent.",
    w3cStatus: "W3C Editor's Draft",
    standardDefault: "()",
    riskLevel: "critical",
    specUrl: "https://wicg.github.io/floc/#permissions-policy-integration",
    browserSupport: { chrome: "89+", firefox: "N/A (Rejected)", safari: "N/A (Rejected)", edge: "89+" },
  },
  {
    id: "browsing-topics",
    name: "browsing-topics (Chrome Topics API)",
    category: "privacy",
    description: "Controls whether the browser calculates high-level interest topics from a user's recent webpage visits to serve targeted ads.",
    threatMitigation: "Disabling blocks Chrome's Topics API from categorizing your visitors into commercial ad segments.",
    w3cStatus: "W3C Editor's Draft",
    standardDefault: "()",
    riskLevel: "critical",
    specUrl: "https://patcg-foundation.github.io/topics/#permissions-policy-integration",
    browserSupport: { chrome: "115+", firefox: "N/A (Rejected)", safari: "N/A (Rejected)", edge: "115+" },
  },
  {
    id: "attribution-reporting",
    name: "attribution-reporting (Ad Conversion Measurement)",
    category: "privacy",
    description: "Controls whether cross-site conversion tracking and ad click/view attribution can be reported to ad networks.",
    threatMitigation: "Restricts ad platforms from collecting cross-site attribution and impression telemetry.",
    w3cStatus: "W3C Editor's Draft",
    standardDefault: "()",
    riskLevel: "high",
    specUrl: "https://wicg.github.io/attribution-reporting-api/#permissions-policy-integration",
    browserSupport: { chrome: "115+", firefox: "N/A", safari: "N/A", edge: "115+" },
  },
  {
    id: "run-ad-auction",
    name: "run-ad-auction (Protected Audience API)",
    category: "privacy",
    description: "Controls whether the browser can run in-browser ad auctions using the Protected Audience (FLEDGE) API.",
    threatMitigation: "Prevents unauthorized scripts from executing ad bidding algorithms and auction queries locally in the visitor's browser.",
    w3cStatus: "W3C Editor's Draft",
    standardDefault: "()",
    riskLevel: "high",
    specUrl: "https://wicg.github.io/turtledove/#permissions-policy-integration",
    browserSupport: { chrome: "115+", firefox: "N/A", safari: "N/A", edge: "115+" },
  },
  {
    id: "join-ad-interest-group",
    name: "join-ad-interest-group (Ad Remarketing)",
    category: "privacy",
    description: "Controls whether scripts can add the visitor's browser to interest groups for targeted retargeting advertisements.",
    threatMitigation: "Prevents embedded widgets or compromised dependencies from enrolling visitors in remarketing pools.",
    w3cStatus: "W3C Editor's Draft",
    standardDefault: "()",
    riskLevel: "high",
    specUrl: "https://wicg.github.io/turtledove/#permissions-policy-integration",
    browserSupport: { chrome: "115+", firefox: "N/A", safari: "N/A", edge: "115+" },
  },
  {
    id: "compute-pressure",
    name: "compute-pressure (Hardware Pressure API)",
    category: "privacy",
    description: "Controls whether web applications can observe CPU utilization, processor throttling, and thermal states of the device.",
    threatMitigation: "Mitigates device fingerprinting vectors that infer hardware specs through CPU load telemetry.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "medium",
    specUrl: "https://w3c.github.io/compute-pressure/#permissions-policy",
    browserSupport: { chrome: "115+", firefox: "In Development", safari: "N/A", edge: "115+" },
  },
  {
    id: "client-hint-dpr",
    name: "ch-dpr (Device Pixel Ratio Client Hints)",
    category: "privacy",
    description: "Controls whether the browser forwards client-hint device pixel ratio headers to third-party endpoints.",
    threatMitigation: "Prevents passive screen resolution fingerprinting across cross-origin requests.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "(self)",
    riskLevel: "low",
    specUrl: "https://wicg.github.io/client-hints-infrastructure/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "N/A", safari: "N/A", edge: "88+" },
  },

  // 2. Device Hardware & Sensors
  {
    id: "camera",
    name: "camera (Video Stream Input)",
    category: "hardware",
    description: "Controls access to video input devices including webcams and external cameras.",
    threatMitigation: "Stops rogue third-party advertising or analytics scripts from secretly requesting or accessing video feeds.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "critical",
    specUrl: "https://w3c.github.io/mediacapture-main/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "74+", safari: "11.1+", edge: "88+" },
  },
  {
    id: "microphone",
    name: "microphone (Audio Stream Input)",
    category: "hardware",
    description: "Controls access to audio input devices such as built-in and external microphones.",
    threatMitigation: "Blocks unauthorized audio listening, acoustic eavesdropping, and covert background recording.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "critical",
    specUrl: "https://w3c.github.io/mediacapture-main/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "74+", safari: "11.1+", edge: "88+" },
  },
  {
    id: "geolocation",
    name: "geolocation (Physical GPS & Location)",
    category: "hardware",
    description: "Controls access to the Geolocation API for obtaining precise latitude, longitude, and altitude coordinates.",
    threatMitigation: "Prevents unauthorized location tracking and geospatial profiling of users across embedded elements.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "critical",
    specUrl: "https://w3c.github.io/geolocation-api/#permissions-policy",
    browserSupport: { chrome: "88+", firefox: "74+", safari: "11.1+", edge: "88+" },
  },
  {
    id: "display-capture",
    name: "display-capture (Screen Sharing)",
    category: "hardware",
    description: "Controls access to the Screen Capture API (getDisplayMedia) for capturing the visitor's screen or window contents.",
    threatMitigation: "Blocks unauthorized desktop recording and screen scraping from embedded frames or injected scripts.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "critical",
    specUrl: "https://w3c.github.io/mediacapture-screen-share/#permissions-policy-integration",
    browserSupport: { chrome: "94+", firefox: "107+", safari: "13+", edge: "94+" },
  },
  {
    id: "accelerometer",
    name: "accelerometer (Motion Sensing)",
    category: "hardware",
    description: "Controls access to motion sensors measuring physical device acceleration along 3-dimensional axes.",
    threatMitigation: "Prevents motion-based keystroke sniffing, side-channel eavesdropping, and battery drain.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "medium",
    specUrl: "https://w3c.github.io/accelerometer/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "N/A", safari: "N/A", edge: "88+" },
  },
  {
    id: "gyroscope",
    name: "gyroscope (Orientation & Rotation)",
    category: "hardware",
    description: "Controls access to rotational velocity and orientation sensors measuring physical device tilt.",
    threatMitigation: "Mitigates behavioral biometric tracking and motion sensor acoustic eavesdropping attacks.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "medium",
    specUrl: "https://w3c.github.io/gyroscope/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "N/A", safari: "N/A", edge: "88+" },
  },
  {
    id: "magnetometer",
    name: "magnetometer (Compass & Magnetic Field)",
    category: "hardware",
    description: "Controls access to magnetic field sensors measuring geomagnetic field orientation.",
    threatMitigation: "Prevents indoor positioning inference and hardware fingerprinting.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "medium",
    specUrl: "https://w3c.github.io/magnetometer/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "N/A", safari: "N/A", edge: "88+" },
  },
  {
    id: "ambient-light-sensor",
    name: "ambient-light-sensor (Ambient Lighting)",
    category: "hardware",
    description: "Controls access to ambient light sensors measuring environmental illuminance levels in lux.",
    threatMitigation: "Blocks cross-device ultrasonic beaconing and light-based display reflection side channels.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "medium",
    specUrl: "https://w3c.github.io/ambient-light/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "N/A", safari: "N/A", edge: "88+" },
  },
  {
    id: "screen-wake-lock",
    name: "screen-wake-lock (Screen Wake Lock API)",
    category: "hardware",
    description: "Controls whether web applications can prevent the visitor's device screen from dimming or locking.",
    threatMitigation: "Prevents unwanted display power drain caused by rogue background scripts.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "(self)",
    riskLevel: "low",
    specUrl: "https://w3c.github.io/screen-wake-lock/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "126+", safari: "16.4+", edge: "88+" },
  },
  {
    id: "midi",
    name: "midi (Musical Instrument Digital Interface)",
    category: "hardware",
    description: "Controls access to connected MIDI musical instruments, synthesizer controllers, and sysex commands.",
    threatMitigation: "Restricts hardware communication with peripheral synthesizer devices and firmware tampering.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "medium",
    specUrl: "https://webaudio.github.io/web-midi-api/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "108+", safari: "N/A", edge: "88+" },
  },
  {
    id: "xr-spatial-tracking",
    name: "xr-spatial-tracking (WebXR AR/VR Tracking)",
    category: "hardware",
    description: "Controls access to virtual, augmented, and mixed reality spatial tracking hardware and head-mounted displays.",
    threatMitigation: "Prevents unauthorized room mapping, headset sensor data collection, and biometric eye tracking.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "medium",
    specUrl: "https://immersive-web.github.io/webxr/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "N/A", safari: "17.4+", edge: "88+" },
  },

  // 3. Payments & Identity
  {
    id: "payment",
    name: "payment (Payment Request API)",
    category: "payments",
    description: "Controls access to the Payment Request API for initiating browser-mediated checkout flows (Apple Pay, Google Pay).",
    threatMitigation: "Stops unvetted third-party iframes from spawning fraudulent payment dialogues or skimming credit cards.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "(self)",
    riskLevel: "critical",
    specUrl: "https://w3c.github.io/payment-request/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "N/A", safari: "11.1+", edge: "88+" },
    sampleOrigins: ["https://js.stripe.com", "https://apple.com", "https://pay.google.com"],
  },
  {
    id: "identity-credentials-get",
    name: "identity-credentials-get (FedCM / WebID)",
    category: "payments",
    description: "Controls access to Federated Credential Management (FedCM) API for seamless third-party identity login.",
    threatMitigation: "Restricts identity provider token requests to authorized authentication domains only.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "(self)",
    riskLevel: "high",
    specUrl: "https://w3c-fedid.github.io/FedCM/#permissions-policy",
    browserSupport: { chrome: "116+", firefox: "In Development", safari: "In Development", edge: "116+" },
  },
  {
    id: "otp-credentials",
    name: "otp-credentials (WebOTP API)",
    category: "payments",
    description: "Controls access to the WebOTP API for automatically reading SMS one-time verification passcodes for 2FA.",
    threatMitigation: "Prevents malicious third-party frames from intercepting sensitive banking SMS verification codes.",
    w3cStatus: "W3C Editor's Draft",
    standardDefault: "(self)",
    riskLevel: "critical",
    specUrl: "https://wicg.github.io/web-otp/#permissions-policy",
    browserSupport: { chrome: "93+", firefox: "N/A", safari: "N/A", edge: "93+" },
  },
  {
    id: "publickey-credentials-get",
    name: "publickey-credentials-get (WebAuthn / Passkeys)",
    category: "payments",
    description: "Controls whether the browser can query WebAuthn passkeys and hardware security keys for authentication.",
    threatMitigation: "Blocks phishing frames from initiating unsolicited FIDO2 / Passkey biometric credential prompts.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "(self)",
    riskLevel: "high",
    specUrl: "https://w3c.github.io/webauthn/#permissions-policy",
    browserSupport: { chrome: "88+", firefox: "74+", safari: "13+", edge: "88+" },
  },
  {
    id: "usb",
    name: "usb (WebUSB API)",
    category: "payments",
    description: "Controls access to universal serial bus (USB) connected hardware peripherals directly from JavaScript.",
    threatMitigation: "Blocks arbitrary low-level communication with plugged-in flash drives, hardware tokens, or debugging cables.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "critical",
    specUrl: "https://wicg.github.io/webusb/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "N/A (Security Risk)", safari: "N/A (Security Risk)", edge: "88+" },
  },
  {
    id: "serial",
    name: "serial (Web Serial API)",
    category: "payments",
    description: "Controls access to hardware serial ports (COM ports, Arduinos, microcontrollers, barcode scanners).",
    threatMitigation: "Prevents malicious scripts from interacting directly with raw serial hardware interfaces.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "critical",
    specUrl: "https://wicg.github.io/serial/#permissions-policy",
    browserSupport: { chrome: "89+", firefox: "N/A", safari: "N/A", edge: "89+" },
  },
  {
    id: "bluetooth",
    name: "bluetooth (Web Bluetooth API)",
    category: "payments",
    description: "Controls access to Bluetooth Low Energy (BLE) peripheral devices and wireless sensors.",
    threatMitigation: "Stops unauthorized pairing and data transmission with nearby wireless medical, fitness, or IoT devices.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "critical",
    specUrl: "https://webbluetoothcg.github.io/web-bluetooth/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "N/A (Security Risk)", safari: "N/A (Security Risk)", edge: "88+" },
  },
  {
    id: "smart-card",
    name: "smart-card (Web Smart Card API)",
    category: "payments",
    description: "Controls access to PC/SC smart card readers and physical cryptographic chip cards.",
    threatMitigation: "Blocks access to government identity smart cards, corporate badges, and bank card chips.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "critical",
    specUrl: "https://wicg.github.io/web-smart-card/#permissions-policy",
    browserSupport: { chrome: "125+", firefox: "N/A", safari: "N/A", edge: "125+" },
  },
  {
    id: "web-share",
    name: "web-share (Web Share API)",
    category: "payments",
    description: "Controls whether the document can invoke the operating system's native share sheet dialogue.",
    threatMitigation: "Prevents abusive popup spamming of native OS share targets.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "(self)",
    riskLevel: "low",
    specUrl: "https://w3c.github.io/web-share/#permissions-policy-integration",
    browserSupport: { chrome: "89+", firefox: "N/A", safari: "14+", edge: "89+" },
  },

  // 4. Performance & Rendering
  {
    id: "autoplay",
    name: "autoplay (HTML5 Audio/Video Auto-Playback)",
    category: "performance",
    description: "Controls whether HTML5 `<video>` and `<audio>` elements can automatically start playback with audio.",
    threatMitigation: "Eliminates intrusive auto-playing video ads, acoustic annoyance, and unexpected mobile bandwidth consumption.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "(self)",
    riskLevel: "medium",
    specUrl: "https://w3c.github.io/webappsec-permissions-policy/#autoplay",
    browserSupport: { chrome: "88+", firefox: "74+", safari: "11.1+", edge: "88+" },
  },
  {
    id: "fullscreen",
    name: "fullscreen (HTML5 Fullscreen API)",
    category: "performance",
    description: "Controls whether the page or embedded iframes can expand to occupy the user's entire screen display.",
    threatMitigation: "Prevents phishing attacks that render fake browser chrome or OS login dialogs in fullscreen mode.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "(self)",
    riskLevel: "medium",
    specUrl: "https://fullscreen.spec.whatwg.org/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "74+", safari: "11.1+", edge: "88+" },
  },
  {
    id: "picture-in-picture",
    name: "picture-in-picture (PiP Floating Video)",
    category: "performance",
    description: "Controls whether HTML5 video elements can pop out into an always-on-top floating picture-in-picture window.",
    threatMitigation: "Prevents unauthorized video elements from floating over user interfaces or obstructing content.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "(self)",
    riskLevel: "low",
    specUrl: "https://w3c.github.io/picture-in-picture/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "N/A", safari: "13.1+", edge: "88+" },
  },
  {
    id: "sync-xhr",
    name: "sync-xhr (Synchronous XMLHttpRequest)",
    category: "performance",
    description: "Controls whether JavaScript can execute synchronous (blocking) XMLHttpRequest network calls.",
    threatMitigation: "Disabling prevents poorly written legacy third-party scripts from freezing the main UI thread and degrading INP/FID.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "medium",
    specUrl: "https://xhr.spec.whatwg.org/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "74+", safari: "11.1+", edge: "88+" },
  },
  {
    id: "document-domain",
    name: "document-domain (document.domain Relaxation)",
    category: "performance",
    description: "Controls whether scripts can set `document.domain` to relax the same-origin policy between subdomains.",
    threatMitigation: "Prevents subdomain-takeover vulnerabilities and cross-subdomain DOM security boundary relaxation.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "()",
    riskLevel: "high",
    specUrl: "https://html.spec.whatwg.org/multipage/origin.html#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "N/A", safari: "N/A", edge: "88+" },
  },
  {
    id: "encrypted-media",
    name: "encrypted-media (EME / DRM Protected Media)",
    category: "performance",
    description: "Controls access to the Encrypted Media Extensions (EME) API for playing DRM-protected audio/video streams.",
    threatMitigation: "Restricts closed-source Content Decryption Modules (CDMs) from running inside unvetted cross-origin frames.",
    w3cStatus: "W3C Working Draft",
    standardDefault: "(self)",
    riskLevel: "low",
    specUrl: "https://w3c.github.io/encrypted-media/#permissions-policy-integration",
    browserSupport: { chrome: "88+", firefox: "74+", safari: "12+", edge: "88+" },
  },
];

export const POLICY_PRESETS: PolicyPreset[] = [
  {
    id: "strict-lockdown",
    name: "Strict Lockdown (Recommended)",
    badge: "Maximum Security",
    description: "Ideal for SaaS dashboards, content portals, utility sites, and security-critical web apps. Disables all tracking and hardware sensors while permitting standard UI display.",
    targetAudience: "SaaS Apps, Developer Tools, SEO Platforms, Blogs & News Sites",
    state: {
      "interest-cohort": { mode: "none" },
      "browsing-topics": { mode: "none" },
      "attribution-reporting": { mode: "none" },
      "run-ad-auction": { mode: "none" },
      "join-ad-interest-group": { mode: "none" },
      "compute-pressure": { mode: "none" },
      "client-hint-dpr": { mode: "self" },
      camera: { mode: "none" },
      microphone: { mode: "none" },
      geolocation: { mode: "none" },
      "display-capture": { mode: "none" },
      accelerometer: { mode: "none" },
      gyroscope: { mode: "none" },
      magnetometer: { mode: "none" },
      "ambient-light-sensor": { mode: "none" },
      "screen-wake-lock": { mode: "self" },
      midi: { mode: "none" },
      "xr-spatial-tracking": { mode: "none" },
      payment: { mode: "none" },
      "identity-credentials-get": { mode: "self" },
      "otp-credentials": { mode: "self" },
      "publickey-credentials-get": { mode: "self" },
      usb: { mode: "none" },
      serial: { mode: "none" },
      bluetooth: { mode: "none" },
      "smart-card": { mode: "none" },
      "web-share": { mode: "self" },
      autoplay: { mode: "none" },
      fullscreen: { mode: "self" },
      "picture-in-picture": { mode: "self" },
      "sync-xhr": { mode: "none" },
      "document-domain": { mode: "none" },
      "encrypted-media": { mode: "self" },
    },
  },
  {
    id: "ecommerce-standard",
    name: "E-Commerce Standard",
    badge: "Store / Checkout",
    description: "Configured for modern online stores with payment gateways (Stripe, Apple/Google Pay), barcode camera scanning, and localized store finding.",
    targetAudience: "Shopify, WooCommerce, Next.js Commerce, BigCommerce, Magento",
    state: {
      "interest-cohort": { mode: "none" },
      "browsing-topics": { mode: "none" },
      "attribution-reporting": { mode: "none" },
      "run-ad-auction": { mode: "none" },
      "join-ad-interest-group": { mode: "none" },
      "compute-pressure": { mode: "none" },
      "client-hint-dpr": { mode: "self" },
      camera: { mode: "self" }, // For QR/barcode product lookup
      microphone: { mode: "none" },
      geolocation: { mode: "self" }, // Store locator / shipping calculation
      "display-capture": { mode: "none" },
      accelerometer: { mode: "none" },
      gyroscope: { mode: "none" },
      magnetometer: { mode: "none" },
      "ambient-light-sensor": { mode: "none" },
      "screen-wake-lock": { mode: "self" },
      midi: { mode: "none" },
      "xr-spatial-tracking": { mode: "self" }, // AR 3D product preview
      payment: {
        mode: "custom",
        includeSelf: true,
        customOrigins: ["https://js.stripe.com", "https://apple.com", "https://pay.google.com"],
      },
      "identity-credentials-get": { mode: "self" },
      "otp-credentials": { mode: "self" }, // 2FA checkout SMS
      "publickey-credentials-get": { mode: "self" }, // Passkeys
      usb: { mode: "none" },
      serial: { mode: "none" },
      bluetooth: { mode: "none" },
      "smart-card": { mode: "none" },
      "web-share": { mode: "self" },
      autoplay: { mode: "self" },
      fullscreen: { mode: "self" },
      "picture-in-picture": { mode: "self" },
      "sync-xhr": { mode: "none" },
      "document-domain": { mode: "none" },
      "encrypted-media": { mode: "self" },
    },
  },
  {
    id: "media-streaming",
    name: "Media & Streaming Platform",
    badge: "Video / Audio",
    description: "Engineered for streaming video platforms, podcasts, conferencing apps, and interactive multimedia hubs.",
    targetAudience: "YouTube / Vimeo embeds, Video Portals, WebRTC Calling, Podcasting Hubs",
    state: {
      "interest-cohort": { mode: "none" },
      "browsing-topics": { mode: "none" },
      "attribution-reporting": { mode: "none" },
      "run-ad-auction": { mode: "none" },
      "join-ad-interest-group": { mode: "none" },
      "compute-pressure": { mode: "self" },
      "client-hint-dpr": { mode: "self" },
      camera: { mode: "self" },
      microphone: { mode: "self" },
      geolocation: { mode: "none" },
      "display-capture": { mode: "self" },
      accelerometer: { mode: "none" },
      gyroscope: { mode: "none" },
      magnetometer: { mode: "none" },
      "ambient-light-sensor": { mode: "none" },
      "screen-wake-lock": { mode: "self" },
      midi: { mode: "self" },
      "xr-spatial-tracking": { mode: "self" },
      payment: { mode: "self" },
      "identity-credentials-get": { mode: "self" },
      "otp-credentials": { mode: "self" },
      "publickey-credentials-get": { mode: "self" },
      usb: { mode: "none" },
      serial: { mode: "none" },
      bluetooth: { mode: "none" },
      "smart-card": { mode: "none" },
      "web-share": { mode: "self" },
      autoplay: { mode: "self" },
      fullscreen: { mode: "all" },
      "picture-in-picture": { mode: "all" },
      "sync-xhr": { mode: "none" },
      "document-domain": { mode: "none" },
      "encrypted-media": { mode: "self" },
    },
  },
  {
    id: "pwa-webapp",
    name: "Progressive Web App (PWA)",
    badge: "Mobile & Hybrid",
    description: "Balanced setup for rich web apps, offline tools, hybrid mobile PWAs, and collaborative web applications.",
    targetAudience: "React/Vue PWAs, Productivity Tools, Native-like Web Apps",
    state: {
      "interest-cohort": { mode: "none" },
      "browsing-topics": { mode: "none" },
      "attribution-reporting": { mode: "none" },
      "run-ad-auction": { mode: "none" },
      "join-ad-interest-group": { mode: "none" },
      "compute-pressure": { mode: "self" },
      "client-hint-dpr": { mode: "self" },
      camera: { mode: "self" },
      microphone: { mode: "self" },
      geolocation: { mode: "self" },
      "display-capture": { mode: "self" },
      accelerometer: { mode: "self" },
      gyroscope: { mode: "self" },
      magnetometer: { mode: "none" },
      "ambient-light-sensor": { mode: "none" },
      "screen-wake-lock": { mode: "self" },
      midi: { mode: "none" },
      "xr-spatial-tracking": { mode: "none" },
      payment: { mode: "self" },
      "identity-credentials-get": { mode: "self" },
      "otp-credentials": { mode: "self" },
      "publickey-credentials-get": { mode: "self" },
      usb: { mode: "none" },
      serial: { mode: "none" },
      bluetooth: { mode: "none" },
      "smart-card": { mode: "none" },
      "web-share": { mode: "self" },
      autoplay: { mode: "self" },
      fullscreen: { mode: "self" },
      "picture-in-picture": { mode: "self" },
      "sync-xhr": { mode: "none" },
      "document-domain": { mode: "none" },
      "encrypted-media": { mode: "self" },
    },
  },
  {
    id: "permissive-dev",
    name: "Permissive Staging / Dev Mode",
    badge: "Testing Only",
    description: "Permits all APIs across same-origin or wildcards for sandbox testing and debugging local developer environments.",
    targetAudience: "Localhost, Staging QA, Integration Sandbox Testing",
    state: {
      "interest-cohort": { mode: "omit" },
      "browsing-topics": { mode: "omit" },
      "attribution-reporting": { mode: "omit" },
      "run-ad-auction": { mode: "omit" },
      "join-ad-interest-group": { mode: "omit" },
      "compute-pressure": { mode: "omit" },
      "client-hint-dpr": { mode: "omit" },
      camera: { mode: "all" },
      microphone: { mode: "all" },
      geolocation: { mode: "all" },
      "display-capture": { mode: "all" },
      accelerometer: { mode: "all" },
      gyroscope: { mode: "all" },
      magnetometer: { mode: "all" },
      "ambient-light-sensor": { mode: "all" },
      "screen-wake-lock": { mode: "all" },
      midi: { mode: "all" },
      "xr-spatial-tracking": { mode: "all" },
      payment: { mode: "all" },
      "identity-credentials-get": { mode: "all" },
      "otp-credentials": { mode: "all" },
      "publickey-credentials-get": { mode: "all" },
      usb: { mode: "all" },
      serial: { mode: "all" },
      bluetooth: { mode: "all" },
      "smart-card": { mode: "all" },
      "web-share": { mode: "all" },
      autoplay: { mode: "all" },
      fullscreen: { mode: "all" },
      "picture-in-picture": { mode: "all" },
      "sync-xhr": { mode: "all" },
      "document-domain": { mode: "all" },
      "encrypted-media": { mode: "all" },
    },
  },
];

export function getInitialPermissionsPolicyState(): PermissionsPolicyState {
  const defaultPreset = POLICY_PRESETS[0];
  const state: PermissionsPolicyState = {};

  for (const directive of DIRECTIVE_DEFINITIONS) {
    const presetVal = defaultPreset.state[directive.id];
    if (presetVal) {
      state[directive.id] = {
        mode: presetVal.mode,
        includeSelf: presetVal.includeSelf ?? (presetVal.mode === "self"),
        customOrigins: presetVal.customOrigins || (directive.sampleOrigins ? [...directive.sampleOrigins] : []),
      };
    } else {
      state[directive.id] = {
        mode: directive.standardDefault === "()" ? "none" : directive.standardDefault === "(self)" ? "self" : "omit",
        includeSelf: false,
        customOrigins: [],
      };
    }
  }

  return state;
}

/**
 * Builds the canonical Permissions-Policy header string.
 * Example output:
 * camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(self "https://js.stripe.com")
 */
export function buildPermissionsPolicyString(
  state: PermissionsPolicyState,
  options?: { multiline?: boolean }
): string {
  const directives: string[] = [];

  for (const def of DIRECTIVE_DEFINITIONS) {
    const item = state[def.id];
    if (!item || item.mode === "omit") continue;

    let valueStr = "";
    if (item.mode === "none") {
      valueStr = "()";
    } else if (item.mode === "self") {
      valueStr = "(self)";
    } else if (item.mode === "all") {
      valueStr = "*";
    } else if (item.mode === "custom") {
      const origins: string[] = [];
      if (item.includeSelf) {
        origins.push("self");
      }
      for (const origin of item.customOrigins) {
        const trimmed = origin.trim();
        if (trimmed) {
          // Wrap in quotes if not already wrapped
          const clean = trimmed.replace(/^["']|["']$/g, "");
          origins.push(`"${clean}"`);
        }
      }
      if (origins.length === 0) {
        valueStr = "()";
      } else {
        valueStr = `(${origins.join(" ")})`;
      }
    }

    if (valueStr) {
      directives.push(`${def.id}=${valueStr}`);
    }
  }

  if (options?.multiline) {
    return directives.join(",\n  ");
  }

  return directives.join(", ");
}

/**
 * Calculates a security audit score & recommendations for the current Permissions Policy state.
 */
export interface PolicyAuditResult {
  score: number;
  grade: "A+" | "A" | "B" | "C" | "F";
  statusText: string;
  badgeVariant: "emerald" | "blue" | "amber" | "rose";
  passedChecks: string[];
  warnings: string[];
  criticalRisks: string[];
  totalConfigured: number;
  totalDirectives: number;
}

export function auditPermissionsPolicy(state: PermissionsPolicyState): PolicyAuditResult {
  let score = 100;
  const passedChecks: string[] = [];
  const warnings: string[] = [];
  const criticalRisks: string[] = [];

  let configuredCount = 0;
  const total = DIRECTIVE_DEFINITIONS.length;

  for (const def of DIRECTIVE_DEFINITIONS) {
    const item = state[def.id];
    if (item && item.mode !== "omit") {
      configuredCount++;
    }
  }

  // 1. Check FLoC & Topics tracking
  const floc = state["interest-cohort"]?.mode;
  const topics = state["browsing-topics"]?.mode;
  if (floc === "none" && topics === "none") {
    passedChecks.push("Google FLoC and Chrome Topics ad tracking are completely disabled ()");
  } else if (floc === "all" || topics === "all") {
    criticalRisks.push("Tracking APIs (FLoC/Topics) are set to wildcard (*), allowing third-party behavioral profiling.");
    score -= 25;
  } else {
    warnings.push("Privacy tracking directives (interest-cohort or browsing-topics) are not explicitly disabled.");
    score -= 10;
  }

  // 2. Check Camera & Microphone
  const camera = state["camera"]?.mode;
  const mic = state["microphone"]?.mode;
  if (camera === "none" && mic === "none") {
    passedChecks.push("Hardware camera & microphone access are locked down globally ()");
  } else if (camera === "all" || mic === "all") {
    criticalRisks.push("Camera or microphone is set to wildcard (*). Rogue third-party iframes can activate audio/video streams.");
    score -= 30;
  } else if (camera === "self" || mic === "self") {
    passedChecks.push("Camera and microphone are restricted to same-origin (self)");
  }

  // 3. Check Geolocation
  const geo = state["geolocation"]?.mode;
  if (geo === "none") {
    passedChecks.push("Geolocation GPS tracking is disabled across all origins ()");
  } else if (geo === "all") {
    criticalRisks.push("Geolocation is set to wildcard (*). Cross-origin frames can track user physical location.");
    score -= 20;
  }

  // 4. Check Raw Hardware Access (USB, Serial, Bluetooth, Smart Card)
  const usb = state["usb"]?.mode;
  const serial = state["serial"]?.mode;
  const bluetooth = state["bluetooth"]?.mode;
  const smartCard = state["smart-card"]?.mode;
  if (usb === "none" && serial === "none" && bluetooth === "none" && smartCard === "none") {
    passedChecks.push("Raw hardware connectivity (WebUSB, Web Serial, Bluetooth, Smart Card) is fully blocked");
  } else if (usb === "all" || serial === "all" || bluetooth === "all") {
    criticalRisks.push("Direct peripheral communication (USB/Serial/Bluetooth) is enabled globally (*). Severe security threat.");
    score -= 35;
  } else if (usb === "self" || serial === "self" || bluetooth === "self") {
    warnings.push("WebUSB/Serial/Bluetooth are enabled for same-origin. Verify if your app strictly requires peripheral access.");
    score -= 5;
  }

  // 5. Check Display Capture
  const screenCapture = state["display-capture"]?.mode;
  if (screenCapture === "all") {
    criticalRisks.push("display-capture is set to wildcard (*). Unauthorized embedded frames could attempt screen recording.");
    score -= 20;
  }

  // 6. Check sync-xhr
  const syncXhr = state["sync-xhr"]?.mode;
  if (syncXhr === "none") {
    passedChecks.push("Synchronous XMLHttpRequest (sync-xhr) is disabled, protecting UI thread responsiveness and INP");
  }

  // 7. Check document-domain
  const docDomain = state["document-domain"]?.mode;
  if (docDomain === "none") {
    passedChecks.push("document-domain relaxation is blocked, preserving strict origin isolation");
  }

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  let grade: PolicyAuditResult["grade"] = "F";
  let statusText = "Vulnerable";
  let badgeVariant: PolicyAuditResult["badgeVariant"] = "rose";

  if (score >= 95) {
    grade = "A+";
    statusText = "Hardened (Enterprise Grade)";
    badgeVariant = "emerald";
  } else if (score >= 85) {
    grade = "A";
    statusText = "Secure (Standard Compliant)";
    badgeVariant = "emerald";
  } else if (score >= 70) {
    grade = "B";
    statusText = "Moderate (Acceptable for Media/Commerce)";
    badgeVariant = "blue";
  } else if (score >= 50) {
    grade = "C";
    statusText = "Loose (Potential Information Leak)";
    badgeVariant = "amber";
  } else {
    grade = "F";
    statusText = "High Risk (Insecure API Exposure)";
    badgeVariant = "rose";
  }

  return {
    score,
    grade,
    statusText,
    badgeVariant,
    passedChecks,
    warnings,
    criticalRisks,
    totalConfigured: configuredCount,
    totalDirectives: total,
  };
}
