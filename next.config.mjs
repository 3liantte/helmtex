/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  trailingSlash: true,
  // transformers.js (in-browser visualizer): keep the Node build out of the
  // server bundle (its native onnxruntime-node binary breaks webpack), and
  // stub Node-only deps out of the client bundle.
  serverExternalPackages: ["@huggingface/transformers"],
  // ...but "external" also means Next traces the whole package into every
  // serverless function that reaches it, which blew the /visualizer function
  // past Vercel's 250MB limit (transformers pulls onnxruntime-node +
  // onnxruntime-web + a full set of per-platform sharp/libvips binaries).
  // Nothing server-side ever loads it: the import lives behind
  // isPreciseModeAvailable(), which is false without `window`, and the browser
  // gets its own copy from the client bundle. So drop it from every trace.
  // NB: only the copies under @huggingface/ are excluded — the top-level
  // sharp/@img that Next's image optimizer needs stay put.
  outputFileTracingExcludes: {
    "**": [
      "node_modules/@huggingface/**",
      "node_modules/onnxruntime-node/**",
      "node_modules/onnxruntime-web/**",
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "onnxruntime-node": false,
        sharp: false,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "image.pollinations.ai",
      },
    ],
    // WebP only. The catalog swatches are already WebP, so re-encoding them to
    // AVIF cost ~3.4s each (vs 0.33s) to save ~24% in bytes — slow enough that
    // the fabric preview modal, which asks for the largest size, timed out and
    // rendered blank. Resolution is unchanged, so the zoom lens is unaffected.
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
