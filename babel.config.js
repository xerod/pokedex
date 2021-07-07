const graphqlTagOptions = {
  strip: true,
  importSources: ["graphql-tag"],
};

module.exports = {
  presets: ["next/babel"],
  plugins: [["@emotion"], ["graphql-tag", graphqlTagOptions]],
};
