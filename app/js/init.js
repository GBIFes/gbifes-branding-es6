require('./settings.js');
require('./i18n_init.js');
require('./top-search.js');
require('./collectory.js');
require('./sentry.js');
require('./stats.js');
require('./i18n_menus.js');

// THIS should be added to testPage:
// require('./application.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('App initialized');
});
