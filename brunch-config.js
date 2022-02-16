// See http://brunch.io for documentation.

// For a different structure than /app/ see:
// https://github.com/brunch/brunch/issues/1676

const fs = require('fs');
const settings = require('./app/js/settings.js');
const headerLocal = fs.readFileSync('app/assets/headLocal.html', 'utf8');
const header = fs.readFileSync('app/assets/head.html', 'utf8');
const banner = fs.readFileSync('app/assets/banner.html', 'utf8');
const footer = fs.readFileSync('app/assets/footer.html', 'utf8');

const toReplace = [/index\.html$/,
                   /testPage\.html$/,
                   /errorPage\.html$/
];

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
  babel: {presets: ['env']},
  // This do some var substition in code also:
  jscc: {
    values: {
      _BUILD: `${process.env.NODE_ENV} - ${new Date().toISOString().replace('T', ' ').substr(0, 16)}`,
      _LOCALES_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3333': settings.baseFooterUrl
    }
  },
  copycat: {
    // just copy ALA default builded files to our build
    // These are loaded by ala-bootstrap3 library, so we need to load manually in our development testPage
    'js': [ 'commonui-bs3-2019/build/js/', 'app/js/jquery.i18n.properties.gbif.js', 'app/js/stats-job.js', 'app/js/settings.js' ],
    'css': [ 'commonui-bs3-2019/build/css/', 'app/custom-bootstrap' ],
    'fonts': 'commonui-bs3-2019/build/fonts/',
    verbose : false, // shows each file that is copied to the destination directory
    onlyChanged: true // only copy a file if it's modified time has changed (only effective when using brunch watch)
  },
  replacement: {
    replacements: [
      { files: toReplace, match: { find: 'HEADLOCAL_HERE', replace: headerLocal }},
      { files: toReplace, match: { find: 'HEAD_HERE', replace: header }},
      { files: toReplace, match: { find: 'BANNER_HERE', replace: banner }},
      { files: toReplace, match: { find: 'FOOTER_HERE', replace: footer }},
      { files: toReplace, match: { find: '::containerClass::', replace: 'container' }},
      { files: toReplace, match: { find: '::headerFooterServer::', replace:
                                   process.env.NODE_ENV === 'development' ?
                                   'http://localhost:3333':
                                   settings.baseFooterUrl }},
      { files: toReplace, match: { find: '::loginURL::', replace: 'https://auth.gbif.es/cas/login' }},
      { files: toReplace, match: { find: '::searchServer::', replace: 'https://especies.gbif.es' }},
      { files: toReplace, match: { find: '::searchPath::', replace: '/search' }}
    ]
  },
  // https://www.npmjs.com/package/brunch-browser-sync
  browserSync: {
    port: 3333,
    open: false // Don't open a browser tab on each modification
  }
  // Also:
  // https://github.com/mikefarah/git-digest-brunch
};

exports.server = {
  noPushState: true, // returns 404 when file not found
  indexPath: 'testPage.html'
}

exports.paths = {
  watched: ['app/js', 'app/css', 'app/assets']
}

exports.conventions = {
  // file won't be compiled and will be just moved to public directory instead
  ignored: [
    "app/js/stats-job.js"
  ]
};
// exports.optimize = true; // same like brunch build --production
