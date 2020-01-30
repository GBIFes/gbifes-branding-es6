var Url = require('domurl');
var Cookies = require('js-cookie');
var gbifesjs = require('./settings');

// import "./navigator-languages-parser.js";
// For some reason the import fails so copied here:
// https://www.npmjs.com/package/navigator-languages-parser

function getUsersPreferredLanguages() {
  if (navigator.languages !== undefined) {
    return navigator.languages;
  } else if (navigator.language !== undefined) {
    return [navigator.language];
  } else {
    return undefined;
  } // create else for final fallback, and also create a test for it
}

function parseLanguages(acceptedLangs, defaultLang = false) {
  const userPref = getUsersPreferredLanguages();
  const match = userPref ? userPref.find(lang => acceptedLangs.indexOf(lang) !== -1) : undefined;
  if (match === undefined && defaultLang !== false ) {
    return defaultLang;
  }
  return match;
}

var locale = window.gbiflocale;

// https://github.com/Mikhus/domurl
var currentUrl  = new Url;

const enabledLangs = ['es', 'en', 'ca'];

console.log(`Navigator languages locale: ${parseLanguages(enabledLangs, 'es')}`);

function i18n_init() {
  if (gbifesjs.isDevel) console.log("i18n init in development!");

  locale = currentUrl.query.lang;

  if (gbifesjs.isDevel) console.log(`Lang locale: ${locale}`);

  if (typeof locale === 'undefined') {
    locale = Cookies.get('datos-gbif-es-lang')
  }

  if (gbifesjs.isDevel) console.log(`Initial locale: ${locale}`);

  if (locale === undefined || locale === null) {
    locale = parseLanguages(enabledLangs, 'es');
  }

  if (gbifesjs.isDevel) console.log(`Detect locale: ${locale}`);

  const isValid = (enabledLangs.indexOf(locale) > -1);

  if (!isValid) {
    locale = 'es';
    if (gbifesjs.isDevel) console.log(`Setting default locale: ${locale}`);
  } else {
    if (gbifesjs.isDevel) console.log(`Setting locale from browser: ${locale}`);
  }

  if (gbifesjs.isDevel) console.log(`End locale: ${locale}`);

  // localhost
  Cookies.set('datos-gbif-es-lang', locale, { expires: 365, path: '/'});
  // try this
  Cookies.set('datos-gbif-es-lang', locale, { expires: 365, path: '/', domain: '.gbif.es' });

}

if (typeof locale === 'undefined') {
  if (gbifesjs.isDevel) console.log(`init locale: ${locale}`);
  i18n_init();
}

if (typeof Cookies.get('datos-gbif-es-lang-session') === 'undefined' && typeof currentUrl.query.lang === 'undefined') {
  // Workaround to set grails locale
  // This will use to do a uniq lang redirect (to force grails to set the lang for the session)
  var in30Minutes = 1/48;
  // grails default session lifetime is 30min
  Cookies.set('datos-gbif-es-lang-session', '/', { expires: in30Minutes });
  currentUrl.query.lang = locale;
  document.location.search = currentUrl.query;
}

export { locale, enabledLangs };
