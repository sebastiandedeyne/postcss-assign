var postcss = require('postcss');

var plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

const input = `
.red {
    background-color: red;
}

.red {
  color: white;
}

.alert.-danger {
    @echo .red;
}

.button.-danger {
    @echo .red;
}
`;

const expected = `
.red {
    background-color: red;
}

.red {
  color: white;
}

.alert.-danger {
    background-color: red;
  color: white;
}

.button.-danger {
    background-color: red;
  color: white;
}
`;


it('does something', () => {
    return run(input, expected, { });
});


