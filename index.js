const postcss = require('postcss');

module.exports = postcss.plugin('postcss-echo', () => {
    const selectors = {};

    return root => {
        root.walkRules(node => {
            if (! selectors[node.selector]) {
                selectors[node.selector] = [];
            }
          
            selectors[node.selector].push(...node.nodes);
        });
        
        root.walkAtRules('echo', node => {
            const nodes = selectors[node.params].map(
                node => node.clone()
            );
            
            node.replaceWith(nodes);
        });
    };
});
