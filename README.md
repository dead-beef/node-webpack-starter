# Node Webpack Starter

## Overview

Front-end starter kit based on NodeJS and Webpack.

## Project structure

* `./src` - application
  * `./src/js` - scripts
  * `./src/css` - stylesheets (scss files are compiled to application css bundle)
    * `./src/css/main.scss` - main application stylesheet
    * `./src/css/vendor.scss` - main vendor stylesheet
    * `./src/css/_materialize_variables.scss` - MaterializeCSS variables
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

### Dependencies

```
npm run build:vendor
```

### Application

Continuous

```
npm run build:watch
```

Single run

```
npm run build
```

### Minification

#### Dependencies

```
npm run build:min:vendor
```

#### Application

Continuous

```
npm run build:min:watch
```

Single run

```
npm run build:min
```

## Testing

### Unit

Continuous

```
npm run test:watch
```

Single run

```
npm test
```

## Code Linting

```
npm run lint
```

## Licenses

* [`node-webpack-starter`](LICENSE)
