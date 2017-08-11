const postcss = require('postcss');

module.exports = postcss.plugin('postcss-assign', () => {
    return root => {
        const selectors = {};

        // First walk all the rules to create an index of available selectors.
        root.walkRules(mapNodesToSelectors(selectors));

        // Then find all the @include rules, and replace them with selectors from the index.
        root.walkAtRules('include', replaceIncludeNode(selectors));
    };
});

const mapNodesToSelectors = selectors => node => {
    if (! selectors.hasOwnProperty(node.selector)) {
        selectors[node.selector] = [];
    }

    selectors[node.selector].push(...node.nodes);
};

const replaceIncludeNode = selectors => node => {
    const nodes = selectors.hasOwnProperty(node.params)
        ? selectors[node.params].map(node => node.clone())
        : [];

    node.replaceWith(nodes);
};
