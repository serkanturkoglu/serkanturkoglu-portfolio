import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// No nonces here on purpose: this site is fully statically generated, and
// nonce-based CSP would force every page into dynamic rendering. The
// 'unsafe-inline' allowances below match Next.js's own documented
// "without nonces" CSP pattern, plus what this app actually needs:
// - style-src 'unsafe-inline': several components set `style={{...}}`
//   directly (gradients, video sizing math) — blocking that would break
//   the page, not just add risk.
// - frame-src player.vimeo.com: every project embed is a Vimeo iframe.
const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://i.vimeocdn.com",
  "font-src 'self' data:",
  "connect-src 'self' https://vimeo.com https://player.vimeo.com https://i.vimeocdn.com",
  "frame-src https://player.vimeo.com https://vimeo.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
];

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives.join("; ") },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  // Removes the "X-Powered-By: Next.js" response header, which otherwise
  // advertises the exact framework to anyone fingerprinting the stack.
  poweredByHeader: false,
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
