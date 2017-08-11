const postcss = require('postcss');

module.exports = postcss.plugin('postcss-assign', () => {
    return root => {
        const selectors = {};

        // Get the new contents for a node, if it's an `@assign` rule.
        // Recursively gets the new contents of deeper `@assign` rules too.
        function getNewNodeContents(node) {
            if (node.type !== 'atrule' || node.name !== 'assign') {
                return node;
            }

            if (! selectors.hasOwnProperty(node.params)) {
                return [];
            }

            return flatMap(selectors[node.params], node => {
                return getNewNodeContents(node.clone());
            });
        }

        // First walk all the rules to create an index of available selectors.
        root.walkRules(function (node) {
            if (! selectors.hasOwnProperty(node.selector)) {
                selectors[node.selector] = [];
            }

            selectors[node.selector].push(...node.nodes);
        });

        // Then find all the @assign rules, and replace them with selectors from the index.
        root.walkAtRules('assign', function replaceAssigns(rule) {
            rule.replaceWith(
                getNewNodeContents(rule)
            );
        });
    };
});

function flatMap(array, callback) {
    return array.map(callback).reduce((flattened, item) => {
        return flattened.concat(Array.isArray(item) ? item : [item]);
    }, []);
}
