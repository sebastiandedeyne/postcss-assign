/*eslint-env jest*/

const postcss = require('postcss');
const assign = require('./');

function assert(input, expected) {
    return postcss([assign()]).process(input).then(result => {
        expect(result.css).toEqual(expected);
        expect(result.warnings().length).toBe(0);
    });
}

it('replaces assigns with class properties', async () => {
    const input = `
        .alert{@assign .red;}
        .button{@assign .red;}
        .red{background-color: red;}
        .red{color: white;}
    `;

    const expected = `
        .alert{background-color: red;color: white;}
        .button{background-color: red;color: white;}
        .red{background-color: red;}
        .red{color: white;}
    `;

    await assert(input, expected);
});

it('removes unknown assigns', async () => {
    const input = `
        .alert{@assign .red;}
    `;

    const expected = `
        .alert{}
    `;

    await assert(input, expected);
});

it('cascades assigns', async () => {
    const input = `
        .alert-big{@assign .alert;font-size: 2em;}
        .alert{@assign .red;}
        .red{@assign .bg-red;color: white;}
        .bg-red{background-color: red;}
    `;

    const expected = `
        .alert-big{background-color: red;color: white;font-size: 2em;}
        .alert{background-color: red;color: white;}
        .red{background-color: red;color: white;}
        .bg-red{background-color: red;}
    `;

    await assert(input, expected);
});
