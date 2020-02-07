## Introduction

The new GBIF.ES branding using https://brunch.io instead of gulp and using [ALA commonui](https://github.com/AtlasOfLivingAustralia/commonui-bs3-2019) as submodule to get the assets used by ALA modules.

## Usage

```
# During development
brunch watchlis
# or
brunch build
# or
brunch build --production
```

Test with:
- http://localhost:3333/?lang=es
- http://localhost:3333/testPage.html?lang=es

## Why brunch?

We can use npm modules, ES6 js code, sourcemaps, minimize, browser dev watch/reload etc, without suffering with gulp configuration.

We copy the ALA dependencies (jquery, autocomplete, etc)  so we can integrate ALA modules well.

See the `brunch-config.js` for more details.
