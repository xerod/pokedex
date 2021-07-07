const { ESBuildMinifyPlugin } = require("esbuild-loader");

function useEsbuildMinify(config, options) {
  const terserIndex = config.optimization.minimizer.findIndex(
    (minimizer) => minimizer.constructor.name === "TerserPlugin"
  );
  if (terserIndex > -1) {
    config.optimization.minimizer.splice(
      terserIndex,
      1,
      new ESBuildMinifyPlugin(options)
    );
  }
}

function useEsbuildLoader(config, options) {
  const jsLoader = config.module.rules.find(
    (rule) => rule.test && rule.test.test(".js")
  );

  if (jsLoader) {
    jsLoader.use.loader = "esbuild-loader";
    jsLoader.use.options = options;
  }
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: "react",
      })
    );

    useEsbuildMinify(config);

    useEsbuildLoader(config, {
      // Specify `tsx` if you're using TypeSCript
      loader: "tsx",
      target: "es2017",
    });

    return config;
  },
  images: {
    async headers() {
      return [
        {
          source: "/images/(.*)",
          headers: [
            {
              key: "Cache-Control",
              value:
                "public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=2592000",
            },
          ],
        },
      ];
    },
    domains: ["raw.githubusercontent.com"],
    imageSizes: [120],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
