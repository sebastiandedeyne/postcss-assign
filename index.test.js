const postcss = require('postcss');
const plugin = require('./');

function run(input, output, ) {
    return postcss([plugin()]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

const input = `
    .alert{@include .red;}
    .button{@include .red;}
    .red{background-color: red;}
    .red{color: white;}
`;

const expected = `
    .alert{background-color: red;color: white;}
    .button{background-color: red;color: white;}
    .red{background-color: red;}
    .red{color: white;}
`;

it('replaces includes with class properties', () => {
    return run(input, expected);
});
