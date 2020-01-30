// See http://brunch.io for documentation.

// For a different structure than /app/ see:
// https://github.com/brunch/brunch/issues/1676

const fs = require('fs');

const header = fs.readFileSync('app/assets/head.html', 'utf8');
const headlo = fs.readFileSync('app/assets/headLocal.html', 'utf8');
const banner = fs.readFileSync('app/assets/banner.html', 'utf8');
const footer = fs.readFileSync('app/assets/footer.html', 'utf8');
// const indexEs = fs.readFileSync('assets/index.html', 'utf8');
// const toReplace = [/\.js$/, /testPage\.html$/];
const toReplaceTest = [/index\.html$/, /testPage\.html$/];
const toReplaceProd = [/index\.html$/];

exports.files = {
  javascripts: {
    joinTo: {
      'js/vendor.js': /^(?!app)/, // Files that are not in `app/js` dir.
      'js/app.js': /^app\/js/
    }
  },
  stylesheets: {
    joinTo: {
      'css/app.css': /^app\/css/
    }
  }
};

exports.plugins = {
  // TODO add eslint
  babel: {presets: ['latest']},
  copycat: {
    // just copy ALA default builded files to our build
    // These are loaded by ala-bootstrap3, so we need to load manunally in our development testPage
    'js': 'commonui-bs3-2019/build/js/',
    'css': 'commonui-bs3-2019/build/css/',
    'fonts': 'commonui-bs3-2019/build/fonts/',
    verbose : true, //shows each file that is copied to the destination directory
    onlyChanged: true //only copy a file if it's modified time has changed (only effective when using brunch watch)
  },
  replacement: {
    replacements: [
      { files: toReplaceTest, match: {find: 'HEADLO_HERE', replace: headlo}},
      { files: toReplaceProd, match: {find: 'HEADER_HERE', replace: banner}},
      { files: toReplaceTest, match: {find: 'BANNER_HERE', replace: banner}},
      { files: toReplaceTest, match: {find: 'FOOTER_HERE', replace: footer}},
      // { files: toReplaceTest, match: {find: 'INDEX_ES', replace: indexEs}},
      { files: toReplaceTest, match: {find: '::containerClass::', replace: 'container'}},
      { files: toReplaceTest, match: {find: '::headerFooterServer::', replace: 'http://localhost:3333/'}},
      { files: toReplaceTest, match: {find: '::loginStatus::', replace: 'signedOut'}},
      { files: toReplaceTest, match: {find: '::loginURL::', replace: 'https://auth.gbif.es/cas/login'}},
      { files: toReplaceTest, match: {find: '::searchServer::', replace: 'https://especies.gbif.es'}},
      { files: toReplaceTest, match: {find: '::searchPath::', replace: '/search'}}
    ]
  }
};

exports.server = {
  noPushState: true // returns 404 when not found
  // indexPath: 'testTemplate.html'
}

// https://github.com/brunch/brunch/issues/1295
exports.npm = {
  globals: { $: 'jquery', jQuery: 'jquery' }
}

exports.paths = {
  watched: ['app/js', 'app/css', 'app/assets']
}
