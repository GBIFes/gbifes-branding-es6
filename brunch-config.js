// See http://brunch.io for documentation.
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
