require('./settings.js').default;
require('./i18n_init.js');
require('./top-search.js');
require('./collectory.js');
require('./sentry.js');
require('./stats.js');
require('./i18n_menus.js');
require('./mante.js');
require('./index-auth.js');
// require('./autocomplete-conf.js');
require('./disable-spatial-buttons.js');
require('./image-legend-workaround.js');
require('url-polyfill');

// THIS should be added to testPage:
// require('./application.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('App initialized');
});
