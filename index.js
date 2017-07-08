const postcss = require('postcss');

module.exports = postcss.plugin('postcss-include-selector', () => {
    return root => {
        const selectors = {};

        root.walkRules(node => {
            if (! selectors.hasOwnProperty(node.selector)) {
                selectors[node.selector] = [];
            }
            selectors[node.selector].push(...node.nodes);
        });
        
        root.walkAtRules('include', node => {
            if (selectors.hasOwnProperty(node.params)) {
                const nodes = selectors[node.params].map(node => node.clone());
                node.replaceWith(nodes);
            }
        });
    };
});
