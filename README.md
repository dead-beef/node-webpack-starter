# Node Webpack Starter

## Overview

Front-end starter kit based on NodeJS and Webpack.

## Project structure

* `./src` - application
  * `./src/js` - scripts
  * `./src/css` - stylesheets (scss files are compiled to application css bundle)
    * `./src/css/main.scss` - main application stylesheet
    * `./src/css/vendor.scss` - main vendor stylesheet
    * `./src/css/_materialize.scss` - MaterializeCSS variables
  * `./src/img` - images
* `./build` - temporary build files
* `./dist` - bundled application
* `./tests` - unit tests
* `./config` - configuration

## Requirements

- [`Node.js`](https://nodejs.org/)
- [`NPM`](https://nodejs.org/)
- [`Git`](https://git-scm.com/)

## Installation

```
git clone https://github.com/dead-beef/node-webpack-starter.git
cd node-webpack-starter
npm install
```

## Building
```bash
# dependencies
npm run build:vendor
# minified dependencies
npm run build:min:vendor
# application, single run
npm run build
# application, continuous
npm run build:watch
# minified application, single run
npm run build:min
# minified application, continuous
npm run build:min:watch
```

## Testing
```bash
# unit, single run
npm test
# unit, continuous
npm run test:watch
# select browsers (default: Chromium)
TEST_BROWSERS="Firefox Chrome" npm test
```

## Code Linting

```
npm run lint
```

## Licenses

* [`node-webpack-starter`](LICENSE)
