# Way2Web Form helpers.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-stats]

Fix the form atrtibute for old browsers, and add the key combinations to click on a button, like Ctrl+S to submit the form.

Add this to your javascript file:
```
new W2Form().init();
```

The default key combinations are Ctrl with the keys in the object:
```
{
    's':      'button.btn-primary[type=submit]',
    'a':      'a.btn-default',
    'Delete': 'button.btn-danger[type=submit]'
}
```


## Test the package.

To test the package, clone the package to your system.
Than run this command.

```
npm run build
```

This will copy the test files to the dist, and also build the package files include the dependencies.

When this script is complete without errors, you can open `dist/index.html` in your browser.
Open the dev tools, tab console, and you see all the results of the tests.

If you only want to check the eslint rules, just run.

```
npm run lint
```


[downloads-image]: https://img.shields.io/npm/dt/way2web-form.svg
[npm-url]: https://www.npmjs.com/package/way2web-form
[npm-image]: https://img.shields.io/npm/v/way2web-form.svg
[npm-stats]: https://npm-stat.com/charts.html?package=way2web-form
