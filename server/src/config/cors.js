const DEFAULT_CLIENT_URLS = [
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:3000",
  "https://ystream-client.vercel.app",
  "https://video-call-client-kappa.vercel.app",
  "https://mesaurav.in",
  "https://www.mesaurav.in"
];

function normalizeOrigin(origin) {
  const value = String(origin || "").trim().toLowerCase().replace(/\/+$/, "");
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

export function getClientOrigins() {
  const configuredOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",").map((item) => item.trim()).filter(Boolean)
    : [];
  return [...new Set([...DEFAULT_CLIENT_URLS, ...configuredOrigins].map(normalizeOrigin).filter(Boolean))];
}

export function isOriginAllowed(origin) {
  if (!origin) return true;
  const normalized = normalizeOrigin(origin);
  const allowed = getClientOrigins();

  if (allowed.includes(normalized)) return true;

  // Allow specific project preview deployments (e.g. ystream-*.vercel.app)
  if (/^https:\/\/ystream(-[a-z0-9-]+)?\.vercel\.app$/i.test(normalized)) {
    return true;
  }

  return false;
}

export function corsOrigin(origin, callback) {
  if (isOriginAllowed(origin)) {
    callback(null, true);
    return;
  }

  callback(new Error(`CORS blocked origin: ${origin}`));
}

