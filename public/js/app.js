(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("js/autocomplete-conf.js", function(exports, require, module) {
'use strict';

var settings = require('./settings');
var bieService = settings.services.bieService.url;

// Look for BC_CONF in ALA's public/js/application.js for more details
// and options

window.BC_CONF = {};
BC_CONF.autocompleteURL = bieService + '/search/auto.json';
});

;require.register("js/collectory.js", function(exports, require, module) {
'use strict';

function addCollectoryDownloadsLegend() {
  setTimeout(function () {
    if (/^colecciones.gbif.es/.test(window.location.host)) {
      if ($('#logs-since-2018').length === 0) {
        console.log('Adding downloads label to collectory');
        $('#usage-stats>#usage').after('<div id="logs-since-2018"><label style="font-weight: normal; font-size: 12px;">* Las estad&iacute;sticas de uso comenzaron a registrarse el 1 de noviembre de 2018.</label></div>');
        // $("#usage-stats>#usage").after('<p id="logs-since-2018" class="lastUpdated">Las estad&iacute;sticas de uso comenzaron a registrarse el 1 de noviembre de 2018.</p>');
      }
    }
  }, 4000);
};

document.addEventListener("DOMContentLoaded", function () {
  addCollectoryDownloadsLegend();
});

// TODO do something with this
});

;require.register("js/css-loader.js", function(exports, require, module) {
/* DEPRECATED
var link = document.createElement( "link" );
link.href = "https://datos.gbif.es/css/font-awesome.min.css"
link.type = "text/css";
link.rel = "stylesheet";
link.media = "screen,print";

document.getElementsByTagName( "head" )[0].appendChild( link ); */
"use strict";
});

;require.register("js/i18n_init.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

function parseLanguages(acceptedLangs) {
  var defaultLang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var userPref = getUsersPreferredLanguages();
  var match = userPref ? userPref.find(function (lang) {
    return acceptedLangs.indexOf(lang) !== -1;
  }) : undefined;
  if (match === undefined && defaultLang !== false) {
    return defaultLang;
  }
  return match;
}

var cookieLang = 'datos-gbif-es-lang';
var locale = window.gbiflocale;

// https://github.com/Mikhus/domurl
var currentUrl = new Url();

var enabledLangs = gbifesjs.enabledLangs;

console.log('Navigator languages locale: ' + parseLanguages(enabledLangs, 'es'));

function i18n_init() {
  if (gbifesjs.isDevel) console.log("i18n init in development!");

  exports.locale = locale = currentUrl.query.lang;

  if (gbifesjs.isDevel) console.log('Lang locale: ' + locale);

  if (typeof locale === 'undefined') {
    exports.locale = locale = Cookies.get(cookieLang);
  }

  if (gbifesjs.isDevel) console.log('Initial locale: ' + locale);

  if (locale === undefined || locale === null) {
    exports.locale = locale = parseLanguages(enabledLangs, 'es');
  }

  if (gbifesjs.isDevel) console.log('Detect locale: ' + locale);

  var isValid = enabledLangs.indexOf(locale) > -1;

  if (!isValid) {
    exports.locale = locale = 'es';
    if (gbifesjs.isDevel) console.log('Setting default locale: ' + locale);
  } else {
    if (gbifesjs.isDevel) console.log('Setting locale from browser: ' + locale);
  }

  if (gbifesjs.isDevel) console.log('End locale: ' + locale);

  // Try only to set upper cookie
  Cookies.remove(cookieLang, { path: '/' });
  // try this
  Cookies.set(cookieLang, locale, { expires: 365, path: '/', domain: '.gbif.es' });
}

if (typeof locale === 'undefined') {
  if (gbifesjs.isDevel) console.log('init locale: ' + locale);
  i18n_init();
}

if (typeof Cookies.get('datos-gbif-es-lang-session') === 'undefined' && typeof currentUrl.query.lang === 'undefined') {
  // Workaround to set grails locale
  // This will use to do a uniq lang redirect (to force grails to set the lang for the session)
  var in30Minutes = 1 / 48;
  // grails default session lifetime is 30min
  Cookies.set('datos-gbif-es-lang-session', '/', { expires: in30Minutes });
  currentUrl.query.lang = locale;
  document.location.search = currentUrl.query;
}

exports.locale = locale;
exports.enabledLangs = enabledLangs;
});

require.register("js/i18n_menus.js", function(exports, require, module) {
'use strict';

/**
 * Simple function to internationalise menus and sections of the home page.
 */

var gbifesjs = require('./settings');
require('./jquery-eu-cookie-law-popup');
require('./jquery.i18n.properties.gbif');

var _require = require('./i18n_init'),
    locale = _require.locale;

var enabledLangs = gbifesjs.enabledLangs;

// IE don't have String.endsWith
// https://stackoverflow.com/a/2548133/642847
function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function i18n_menus() {
  console.log('Calling i18n_menus');
  if (gbifesjs.isDevel) console.log('locale in i18n_menus: ' + locale);

  // Add lang param to lang links
  if (locale) {
    $('.top-nav-menu a, .portal-link').each(function () {
      var $this = $(this);
      var _href = $this.attr('href');
      // Take care of #hash in links
      var uri = _href.split('#')[0];
      var hash = _href.split('#')[1];
      if (typeof hash === 'undefined') {
        // without hash
        $this.attr('href', _href + '?lang=' + locale);
      } else {
        $this.attr('href', uri + '?lang=' + locale + '#' + hash);
      }
      if (gbifesjs.isDevel) console.log('Added lang to href: ' + $this.attr('href'));
    });
  }

  var url = window.location.href;

  if (gbifesjs.isDevel) console.log('Enabled langs: ' + enabledLangs);

  // This part is for the lang links
  for (var i = 0; i < enabledLangs.length; i++) {
    var curlang = enabledLangs[i];
    var $link = $('.' + curlang + '-locale-link'); // or grab it by tagname etc

    var localeUrl = url;

    if (url.indexOf('lang=') !== -1) {
      localeUrl = url.replace(/lang=en|lang=es|lang=ca/gi, 'lang=' + curlang);
    } else if (url.indexOf('?') !== -1) {
      localeUrl = localeUrl + '&lang=' + curlang;
    } else {
      var uri = url.split('#')[0];
      var hash = url.split('#')[1];
      hash = typeof hash === 'undefined' ? '' : '#' + hash;
      localeUrl = uri + '?lang=' + curlang + hash;
    }
    $link.attr('href', localeUrl);
    if (gbifesjs.isDevel) console.log('Added lang to href: ' + $link.attr('href'));
  }

  // underscore current locale
  $('.wpml-ls-statics-shortcode_actions ul li').each(function (index) {
    var currentItem = $(this).text().replace(/^\s+|\s+$/gm, '').toLowerCase();
    $(this).removeClass('wpml-ls-current-language');
    if (currentItem === locale) {
      $(this).addClass('wpml-ls-current-language');
    }
  });

  var path = 'http://localhost:3333/i18n/';

  if (gbifesjs.isDevel) console.log('localePath: ' + path);
  var i18n = $.i18nGbif;

  if (typeof i18n === 'undefined') console.warn('i18n not yet loaded');

  // https://github.com/jquery-i18n-properties/jquery-i18n-properties
  i18n.properties({
    name: 'messages',
    path: path,
    mode: 'map',
    debug: false,
    encoding: 'UTF-8',
    cache: false,
    language: locale,
    async: true,
    callback: function callback() {
      if (gbifesjs.isDevel) console.log('i18n callback start');
      var keys = ['main_title_label', 'menu_portal_part1', 'menu_portal_part2', 'menu_home', 'menu_collections', 'menu_datasets', 'menu_search', 'menu_explore', 'menu_regions', 'top_menu_dataportal', 'footer_menu_about', 'footer_menu_biodiversity_data', 'footer_menu_collaborations', 'footer_menu_resources', 'footer_menu_news', 'footer_menu_training', 'footer_menu_software', 'footer_menu_contact', 'numbers_occurrences_label', 'numbers_datasets_label', 'numbers_institutions_label', 'numbers_species_label', 'lang_link_en', 'lang_link_es', 'lang_link_cat', 'footer_legal_info', 'search_input_advanced1', 'search_input_advanced2', 'sub_menu_collections', 'sub_menu_collections_detail', 'sub_menu_datasets', 'sub_menu_datasets_detail', 'sub_menu_explore', 'sub_menu_explore_detail', 'sub_menu_regions', 'sub_menu_regions_detail', 'footer_legal_code', 'banner_search_input_placeholder', 'main_search_input_placeholder', 'auth_bar_login', 'auth_bar_logout', 'auth_bar_signup', 'auth_bar_myprofile', 'autocompleteHeader_placeholder'];

      for (var _i = 0; _i < keys.length; _i++) {
        var trans = i18n.prop(keys[_i]);
        if (gbifesjs.isDevel) console.log('i18n of ' + keys[_i] + ': ' + trans);
        if (typeof trans !== 'undefined') {
          if (endsWith(keys[_i], '_placeholder')) {
            var elementID = keys[_i].substring(0, keys[_i].length - 12);
            // verify that this element exists
            $('#' + elementID) && $('#' + elementID).attr('placeholder', trans);
          } else {
            // verify that this element exists
            $('#' + keys[_i]) && $('#' + keys[_i]).html(trans);
          }
        }
      }

      $(document).euCookieLawPopup().init({
        cookiePolicyUrl: 'https://www.gbif.es/politica-de-cookies/',
        popupPosition: 'bottom',
        colorStyle: 'gbif',
        compactStyle: true,
        popupTitle: '',
        popupText: i18n.prop('cookie_message'),
        buttonContinueTitle: i18n.prop('cookie_accept_btn'),
        buttonLearnmoreTitle: i18n.prop('cookie_policy_btn'),
        buttonLearnmoreOpenInNewWindow: true,
        agreementExpiresInDays: 30,
        autoAcceptCookiePolicy: false,
        htmlMarkup: null
      });
    }
  });
}

// Warn, with min version fails so we load here
$(function () {
  // wait til gbif.es elements are visible
  var checkExist = setInterval(function () {
    if (window.jQuery && $('#menu_home').length && typeof $.i18nGbif !== 'undefined') {
      console.log("gbif_es_elements loaded");
      clearInterval(checkExist);
      i18n_menus();
    } else {
      if (gbifesjs.isDevel) console.log("gbif_es_elements not loaded");
    }
  }, 1000);
});
});

require.register("js/index-auth.js", function(exports, require, module) {
'use strict';

var Cookies = require('js-cookie');
var settings = require('./settings');
var authCookieName = 'ALA-Auth';
var loginClass = 'signedIn';
var logoutClass = 'signedOut';

var mainDrawerLoginStatusInIndex = function mainDrawerLoginStatusInIndex() {
  if (document.location.host === "datos.gbif.es" || document.location.host === "demo.gbif.es" || document.location.host === 'localhost:3333') {
    if (settings.isDevel) console.log("We are in the main url, let's see if we are authenticated");
    // As this page is plain html, we have to detect if with are authenticated via Cookies
    // NOTE: For make this work you need ala.cookie.httpOnly to false in /data/cas/config/application.yml
    // We should use another way to see if it's authenticated

    var authCookie = Cookies.get(authCookieName, { domain: settings.mainDomain, path: '/' });
    var in30Minutes = 1 / 48;

    if (typeof authCookie === 'undefined' && document.location.host === 'localhost:3333') {
      console.log("We set a test cookie if we are in development");
      Cookies.set(authCookieName, '/', { expires: in30Minutes });
    }

    if (typeof authCookie !== 'undefined') {
      // https://github.com/AtlasOfLivingAustralia/ala-bootstrap3/blob/master/grails-app/taglib/au/org/ala/bootstrap3/HeaderFooterTagLib.groovy
      if (settings.isDevel) console.log("Auth cookie present so logged in");
      $("#navbarOuterWrapper > div > div").removeClass("::loginStatus::").addClass("signedIn");
      $("#navbarSmallOuterWrapper").removeClass("::loginStatus::").addClass("signedIn");
    } else {
      if (settings.isDevel) console.log("No auth cookie not present so not-logged in");
      $("#navbarOuterWrapper > div > div").removeClass("::loginStatus:").addClass("signedOut");
      $("#navbarSmallOuterWrapper").removeClass("::loginStatus:").addClass("signedOut");
    }
  } else {
    if (settings.isDevel) console.log("We aren't in the main url");
  }
};

$(function () {
  // wait til drawer elements are visible
  var checkExist = setInterval(function () {
    if (window.jQuery && $('#navbarOuterWrapper').length) {
      clearInterval(checkExist);
      mainDrawerLoginStatusInIndex();
    } else {
      if (settings.isDevel) console.log("nav not loaded");
    }
  }, 1000);
});
});

require.register("js/init.js", function(exports, require, module) {
'use strict';

require('./settings.js').default;
require('./i18n_init.js');
require('./top-search.js');
require('./collectory.js');
require('./sentry.js');
require('./stats.js');
require('./i18n_menus.js');
require('./mante.js');
require('./index-auth.js');
require('./autocomplete-conf.js');

// THIS should be added to testPage:
// require('./application.js');


document.addEventListener('DOMContentLoaded', function () {
  console.log('App initialized');
});
});

require.register("js/jquery-eu-cookie-law-popup.js", function(exports, require, module) {
'use strict';

/**
 *
 * JQUERY EU COOKIE LAW POPUPS
 * version 1.1.1
 *
 * Code on Github:
 * https://github.com/wimagguc/jquery-eu-cookie-law-popup
 *
 * To see a live demo, go to:
 * http://www.wimagguc.com/2018/05/gdpr-compliance-with-the-jquery-eu-cookie-law-plugin/
 *
 * by Richard Dancsi
 * http://www.wimagguc.com/
 *
 */

(function ($) {

	// for ie9 doesn't support debug console >>>
	if (!window.console) window.console = {};
	if (!window.console.log) window.console.log = function () {};
	// ^^^

	$.fn.euCookieLawPopup = function () {

		var _self = this;

		///////////////////////////////////////////////////////////////////////////////////////////////
		// PARAMETERS (MODIFY THIS PART) //////////////////////////////////////////////////////////////
		_self.params = {
			cookiePolicyUrl: '/?cookie-policy',
			popupPosition: 'top',
			colorStyle: 'default',
			compactStyle: false,
			popupTitle: 'This website is using cookies',
			popupText: 'We use cookies to ensure that we give you the best experience on our website. If you continue without changing your settings, we\'ll assume that you are happy to receive all cookies on this website.',
			buttonContinueTitle: 'Continue',
			buttonLearnmoreTitle: 'Learn&nbsp;more',
			buttonLearnmoreOpenInNewWindow: true,
			agreementExpiresInDays: 30,
			autoAcceptCookiePolicy: false,
			htmlMarkup: null
		};

		///////////////////////////////////////////////////////////////////////////////////////////////
		// VARIABLES USED BY THE FUNCTION (DON'T MODIFY THIS PART) ////////////////////////////////////
		_self.vars = {
			INITIALISED: false,
			HTML_MARKUP: null,
			COOKIE_NAME: 'EU_COOKIE_LAW_CONSENT'
		};

		///////////////////////////////////////////////////////////////////////////////////////////////
		// PRIVATE FUNCTIONS FOR MANIPULATING DATA ////////////////////////////////////////////////////

		// Overwrite default parameters if any of those is present
		var parseParameters = function parseParameters(object, markup, settings) {

			if (object) {
				var className = $(object).attr('class') ? $(object).attr('class') : '';
				if (className.indexOf('eupopup-top') > -1) {
					_self.params.popupPosition = 'top';
				} else if (className.indexOf('eupopup-fixedtop') > -1) {
					_self.params.popupPosition = 'fixedtop';
				} else if (className.indexOf('eupopup-bottomright') > -1) {
					_self.params.popupPosition = 'bottomright';
				} else if (className.indexOf('eupopup-bottomleft') > -1) {
					_self.params.popupPosition = 'bottomleft';
				} else if (className.indexOf('eupopup-bottom') > -1) {
					_self.params.popupPosition = 'bottom';
				} else if (className.indexOf('eupopup-block') > -1) {
					_self.params.popupPosition = 'block';
				}
				if (className.indexOf('eupopup-color-default') > -1) {
					_self.params.colorStyle = 'default';
				} else if (className.indexOf('eupopup-color-inverse') > -1) {
					_self.params.colorStyle = 'inverse';
				}
				if (className.indexOf('eupopup-style-compact') > -1) {
					_self.params.compactStyle = true;
				}
			}

			if (markup) {
				_self.params.htmlMarkup = markup;
			}

			if (settings) {
				if (typeof settings.cookiePolicyUrl !== 'undefined') {
					_self.params.cookiePolicyUrl = settings.cookiePolicyUrl;
				}
				if (typeof settings.popupPosition !== 'undefined') {
					_self.params.popupPosition = settings.popupPosition;
				}
				if (typeof settings.colorStyle !== 'undefined') {
					_self.params.colorStyle = settings.colorStyle;
				}
				if (typeof settings.popupTitle !== 'undefined') {
					_self.params.popupTitle = settings.popupTitle;
				}
				if (typeof settings.popupText !== 'undefined') {
					_self.params.popupText = settings.popupText;
				}
				if (typeof settings.buttonContinueTitle !== 'undefined') {
					_self.params.buttonContinueTitle = settings.buttonContinueTitle;
				}
				if (typeof settings.buttonLearnmoreTitle !== 'undefined') {
					_self.params.buttonLearnmoreTitle = settings.buttonLearnmoreTitle;
				}
				if (typeof settings.buttonLearnmoreOpenInNewWindow !== 'undefined') {
					_self.params.buttonLearnmoreOpenInNewWindow = settings.buttonLearnmoreOpenInNewWindow;
				}
				if (typeof settings.agreementExpiresInDays !== 'undefined') {
					_self.params.agreementExpiresInDays = settings.agreementExpiresInDays;
				}
				if (typeof settings.autoAcceptCookiePolicy !== 'undefined') {
					_self.params.autoAcceptCookiePolicy = settings.autoAcceptCookiePolicy;
				}
				if (typeof settings.htmlMarkup !== 'undefined') {
					_self.params.htmlMarkup = settings.htmlMarkup;
				}
			}
		};

		var createHtmlMarkup = function createHtmlMarkup() {

			if (_self.params.htmlMarkup) {
				return _self.params.htmlMarkup;
			}

			var html = '<div class="eupopup-container' + ' eupopup-container-' + _self.params.popupPosition + (_self.params.compactStyle ? ' eupopup-style-compact' : '') + ' eupopup-color-' + _self.params.colorStyle + '">' + '<div class="eupopup-head">' + _self.params.popupTitle + '</div>' + '<div class="eupopup-body">' + _self.params.popupText + '</div>' + '<div class="eupopup-buttons">' + '<a href="#" class="eupopup-button eupopup-button_1">' + _self.params.buttonContinueTitle + '</a>' + '<a href="' + _self.params.cookiePolicyUrl + '"' + (_self.params.buttonLearnmoreOpenInNewWindow ? ' target=_blank ' : '') + ' class="eupopup-button eupopup-button_2">' + _self.params.buttonLearnmoreTitle + '</a>' + '<div class="clearfix"></div>' + '</div>' + '<a href="#" class="eupopup-closebutton">x</a>' + '</div>';

			return html;
		};

		// Storing the consent in a cookie
		var setUserAcceptsCookies = function setUserAcceptsCookies(consent) {
			var d = new Date();
			var expiresInDays = _self.params.agreementExpiresInDays * 24 * 60 * 60 * 1000;
			d.setTime(d.getTime() + expiresInDays);
			var expires = "expires=" + d.toGMTString();
			document.cookie = _self.vars.COOKIE_NAME + '=' + consent + "; " + expires + ";path=/";

			$(document).trigger("user_cookie_consent_changed", { 'consent': consent });
		};

		// Let's see if we have a consent cookie already
		var userAlreadyAcceptedCookies = function userAlreadyAcceptedCookies() {
			var userAcceptedCookies = false;
			var cookies = document.cookie.split(";");
			for (var i = 0; i < cookies.length; i++) {
				var c = cookies[i].trim();
				if (c.indexOf(_self.vars.COOKIE_NAME) == 0) {
					userAcceptedCookies = c.substring(_self.vars.COOKIE_NAME.length + 1, c.length);
				}
			}

			return userAcceptedCookies;
		};

		var hideContainer = function hideContainer() {
			// $('.eupopup-container').slideUp(200);
			$('.eupopup-container').animate({
				opacity: 0,
				height: 0
			}, 200, function () {
				$('.eupopup-container').hide(0);
			});
		};

		///////////////////////////////////////////////////////////////////////////////////////////////
		// PUBLIC FUNCTIONS  //////////////////////////////////////////////////////////////////////////
		var publicfunc = {

			// INITIALIZE EU COOKIE LAW POPUP /////////////////////////////////////////////////////////
			init: function init(settings) {

				parseParameters($(".eupopup").first(), $(".eupopup-markup").html(), settings);

				// No need to display this if user already accepted the policy
				if (userAlreadyAcceptedCookies()) {
					$(document).trigger("user_cookie_already_accepted", { 'consent': true });
					return;
				}

				// We should initialise only once
				if (_self.vars.INITIALISED) {
					return;
				}
				_self.vars.INITIALISED = true;

				// Markup and event listeners >>>
				_self.vars.HTML_MARKUP = createHtmlMarkup();

				if ($('.eupopup-block').length > 0) {
					$('.eupopup-block').append(_self.vars.HTML_MARKUP);
				} else {
					$('BODY').append(_self.vars.HTML_MARKUP);
				}

				$('.eupopup-button_1').on('click', function () {
					setUserAcceptsCookies(true);
					hideContainer();
					return false;
				});
				$('.eupopup-closebutton').on('click', function () {
					setUserAcceptsCookies(true);
					hideContainer();
					return false;
				});
				// ^^^ Markup and event listeners

				// Ready to start!
				$('.eupopup-container').show();

				// In case it's alright to just display the message once
				if (_self.params.autoAcceptCookiePolicy) {
					setUserAcceptsCookies(true);
				}
			}

		};

		return publicfunc;
	};

	$(document).ready(function () {
		if ($(".eupopup").length > 0) {
			$(document).euCookieLawPopup().init({
				'info': 'YOU_CAN_ADD_MORE_SETTINGS_HERE',
				'popupTitle': 'This website is using cookies. ',
				'popupText': 'We use them to give you the best experience. If you continue using our website, we\'ll assume that you are happy to receive all cookies on this website.'
			});
		}
	});

	$(document).on("user_cookie_consent_changed", function (event, object) {
		console.log("User cookie consent changed: " + $(object).attr('consent'));
	});
})(jQuery);
});

require.register("js/jquery.i18n.properties.gbif.js", function(exports, require, module) {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/******************************************************************************
 * jquery.i18n.properties
 *
 * Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and
 * MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses.
 *
 * @version     1.2.7
 * @url         https://github.com/jquery-i18n-properties/jquery-i18n-properties
 * @inspiration Localisation assistance for jQuery (http://keith-wood.name/localisation.html)
 *              by Keith Wood (kbwood{at}iinet.com.au) June 2007
 * Modified for gbif.es so is independent for jquery.i18n loaded by ALA modules so can be used
 * without collisions
 *
 *****************************************************************************/

(function ($) {

    $.i18nGbif = {};

    /**
     * Map holding bundle keys if mode is 'map' or 'both'. Values of this can also be an
     * Object, in which case the key is a namespace.
     */
    $.i18nGbif.map = {};

    var debug = function debug(message) {
        window.console && console.log('i18n::' + message);
    };

    /**
     * Load and parse message bundle files (.properties),
     * making bundles keys available as javascript variables.
     *
     * i18n files are named <name>.js, or <name>_<language>.js or <name>_<language>_<country>.js
     * Where:
     *      The <language> argument is a valid ISO Language Code. These codes are the lower-case,
     *      two-letter codes as defined by ISO-639. You can find a full list of these codes at a
     *      number of sites, such as: http://www.loc.gov/standards/iso639-2/englangn.html
     *      The <country> argument is a valid ISO Country Code. These codes are the upper-case,
     *      two-letter codes as defined by ISO-3166. You can find a full list of these codes at a
     *      number of sites, such as: http://www.iso.ch/iso/en/prods-services/iso3166ma/02iso-3166-code-lists/list-en1.html
     *
     * Sample usage for a bundles/Messages.properties bundle:
     * $.i18nGbif.properties({
     *      name:      'Messages',
     *      language:  'en_US',
     *      path:      'bundles'
     * });
     * @param  name      (string/string[], optional) names of file to load (eg, 'Messages' or ['Msg1','Msg2']). Defaults to "Messages"
     * @param  language    (string, optional) language/country code (eg, 'en', 'en_US', 'pt_BR'). if not specified, language reported by the browser will be used instead.
     * @param  path      (string, optional) path of directory that contains file to load
     * @param  mode      (string, optional) whether bundles keys are available as JavaScript variables/functions or as a map (eg, 'vars' or 'map')
     * @param  debug     (boolean, optional) whether debug statements are logged at the console
     * @param  cache        (boolean, optional) whether bundles should be cached by the browser, or forcibly reloaded on each page load. Defaults to false (i.e. forcibly reloaded)
     * @param  encoding  (string, optional) the encoding to request for bundles. Property file resource bundles are specified to be in ISO-8859-1 format. Defaults to UTF-8 for backward compatibility.
     * @param  callback     (function, optional) callback function to be called after script is terminated
     */
    $.i18nGbif.properties = function (settings) {

        var defaults = {
            name: 'Messages',
            language: '',
            path: '',
            namespace: null,
            mode: 'vars',
            cache: false,
            debug: false,
            encoding: 'UTF-8',
            async: false,
            callback: null
        };

        settings = $.extend(defaults, settings);

        if (settings.namespace && typeof settings.namespace == 'string') {
            // A namespace has been supplied, initialise it.
            if (settings.namespace.match(/^[a-z]*$/)) {
                $.i18nGbif.map[settings.namespace] = {};
            } else {
                debug('Namespaces can only be lower case letters, a - z');
                settings.namespace = null;
            }
        }

        // Ensure a trailing slash on the path
        if (!settings.path.match(/\/$/)) settings.path += '/';

        // Try to ensure that we have at a least a two letter language code
        settings.language = $.i18nGbif.normaliseLanguageCode(settings);

        // Ensure an array
        var files = settings.name && settings.name.constructor === Array ? settings.name : [settings.name];

        // A locale is at least a language code which means at least two files per name. If
        // we also have a country code, thats an extra file per name.
        settings.totalFiles = files.length * 2 + (settings.language.length >= 5 ? files.length : 0);
        if (settings.debug) {
            debug('totalFiles: ' + settings.totalFiles);
        }

        settings.filesLoaded = 0;

        files.forEach(function (file) {

            var defaultFileName, shortFileName, longFileName, fileNames;
            // 1. load base (eg, Messages.properties)
            defaultFileName = settings.path + file + '.properties';
            // 2. with language code (eg, Messages_pt.properties)
            var shortCode = settings.language.substring(0, 2);
            shortFileName = settings.path + file + '_' + shortCode + '.properties';
            // 3. with language code and country code (eg, Messages_pt_BR.properties)
            if (settings.language.length >= 5) {
                var longCode = settings.language.substring(0, 5);
                longFileName = settings.path + file + '_' + longCode + '.properties';
                fileNames = [defaultFileName, shortFileName, longFileName];
            } else {
                fileNames = [defaultFileName, shortFileName];
            }
            loadAndParseFiles(fileNames, settings);
        });

        // call callback
        if (settings.callback && !settings.async) {
            settings.callback();
        }
    }; // properties

    /**
     * When configured with mode: 'map', allows access to bundle values by specifying its key.
     * Eg, jQuery.i18n.prop('com.company.bundles.menu_add')
     */
    $.i18nGbif.prop = function (key /* Add parameters as function arguments as necessary  */) {

        var args = [].slice.call(arguments);

        var phvList, namespace;
        if (args.length == 2) {
            if ($.isArray(args[1])) {
                // An array was passed as the second parameter, so assume it is the list of place holder values.
                phvList = args[1];
            } else if (_typeof(args[1]) === 'object') {
                // Second argument is an options object {namespace: 'mynamespace', replacements: ['egg', 'nog']}
                namespace = args[1].namespace;
                var replacements = args[1].replacements;
                args.splice(-1, 1);
                if (replacements) {
                    Array.prototype.push.apply(args, replacements);
                }
            }
        }

        var value = namespace ? $.i18nGbif.map[namespace][key] : $.i18nGbif.map[key];
        if (value === null) {
            return '[' + (namespace ? namespace + '#' + key : key) + ']';
        }

        // Place holder replacement
        /**
        * Tested with:
        *   test.t1=asdf ''{0}''
        *   test.t2=asdf '{0}' '{1}'{1}'zxcv
        *   test.t3=This is \"a quote" 'a''{0}''s'd{fgh{ij'
        *   test.t4="'''{'0}''" {0}{a}
        *   test.t5="'''{0}'''" {1}
        *   test.t6=a {1} b {0} c
        *   test.t7=a 'quoted \\ s\ttringy' \t\t x
        *
        * Produces:
        *   test.t1, p1 ==> asdf 'p1'
        *   test.t2, p1 ==> asdf {0} {1}{1}zxcv
        *   test.t3, p1 ==> This is "a quote" a'{0}'sd{fgh{ij
        *   test.t4, p1 ==> "'{0}'" p1{a}
        *   test.t5, p1 ==> "'{0}'" {1}
        *   test.t6, p1 ==> a {1} b p1 c
        *   test.t6, p1, p2 ==> a p2 b p1 c
        *   test.t6, p1, p2, p3 ==> a p2 b p1 c
        *   test.t7 ==> a quoted \ s	tringy 		 x
        */

        var i;
        if (typeof value == 'string') {
            // Handle escape characters. Done separately from the tokenizing loop below because escape characters are
            // active in quoted strings.
            i = 0;
            while ((i = value.indexOf('\\', i)) != -1) {
                if (value.charAt(i + 1) == 't') {
                    value = value.substring(0, i) + '\t' + value.substring(i++ + 2); // tab
                } else if (value.charAt(i + 1) == 'r') {
                    value = value.substring(0, i) + '\r' + value.substring(i++ + 2); // return
                } else if (value.charAt(i + 1) == 'n') {
                    value = value.substring(0, i) + '\n' + value.substring(i++ + 2); // line feed
                } else if (value.charAt(i + 1) == 'f') {
                    value = value.substring(0, i) + '\f' + value.substring(i++ + 2); // form feed
                } else if (value.charAt(i + 1) == '\\') {
                    value = value.substring(0, i) + '\\' + value.substring(i++ + 2); // \
                } else {
                    value = value.substring(0, i) + value.substring(i + 1); // Quietly drop the character
                }
            }

            // Lazily convert the string to a list of tokens.
            var arr = [],
                j,
                index;
            i = 0;
            while (i < value.length) {
                if (value.charAt(i) == '\'') {
                    // Handle quotes
                    if (i == value.length - 1) {
                        value = value.substring(0, i); // Silently drop the trailing quote
                    } else if (value.charAt(i + 1) == '\'') {
                        value = value.substring(0, i) + value.substring(++i); // Escaped quote
                    } else {
                        // Quoted string
                        j = i + 2;
                        while ((j = value.indexOf('\'', j)) != -1) {
                            if (j == value.length - 1 || value.charAt(j + 1) != '\'') {
                                // Found start and end quotes. Remove them
                                value = value.substring(0, i) + value.substring(i + 1, j) + value.substring(j + 1);
                                i = j - 1;
                                break;
                            } else {
                                // Found a double quote, reduce to a single quote.
                                value = value.substring(0, j) + value.substring(++j);
                            }
                        }

                        if (j == -1) {
                            // There is no end quote. Drop the start quote
                            value = value.substring(0, i) + value.substring(i + 1);
                        }
                    }
                } else if (value.charAt(i) == '{') {
                    // Beginning of an unquoted place holder.
                    j = value.indexOf('}', i + 1);
                    if (j == -1) {
                        i++; // No end. Process the rest of the line. Java would throw an exception
                    } else {
                        // Add 1 to the index so that it aligns with the function arguments.
                        index = parseInt(value.substring(i + 1, j));
                        if (!isNaN(index) && index >= 0) {
                            // Put the line thus far (if it isn't empty) into the array
                            var s = value.substring(0, i);
                            if (s !== "") {
                                arr.push(s);
                            }
                            // Put the parameter reference into the array
                            arr.push(index);
                            // Start the processing over again starting from the rest of the line.
                            i = 0;
                            value = value.substring(j + 1);
                        } else {
                            i = j + 1; // Invalid parameter. Leave as is.
                        }
                    }
                } else {
                    i++;
                }
            } // while

            // Put the remainder of the no-empty line into the array.
            if (value !== "") {
                arr.push(value);
            }
            value = arr;

            // Make the array the value for the entry.
            if (namespace) {
                $.i18nGbif.map[settings.namespace][key] = arr;
            } else {
                $.i18nGbif.map[key] = arr;
            }
        }

        if (value.length === 0) {
            return "";
        }
        if (value.length == 1 && typeof value[0] == "string") {
            return value[0];
        }

        var str = "";
        for (i = 0, j = value.length; i < j; i++) {
            if (typeof value[i] == "string") {
                str += value[i];
            } else if (phvList && value[i] < phvList.length) {
                // Must be a number
                str += phvList[value[i]];
            } else if (!phvList && value[i] + 1 < args.length) {
                str += args[value[i] + 1];
            } else {
                str += "{" + value[i] + "}";
            }
        }

        return str;
    };

    function callbackIfComplete(settings) {

        if (settings.debug) {
            debug('callbackIfComplete()');
            debug('totalFiles: ' + settings.totalFiles);
            debug('filesLoaded: ' + settings.filesLoaded);
        }

        if (settings.async) {
            if (settings.filesLoaded === settings.totalFiles) {
                if (settings.callback) {
                    settings.callback();
                }
            }
        }
    }

    function loadAndParseFiles(fileNames, settings) {

        if (settings.debug) debug('loadAndParseFiles');

        if (fileNames !== null && fileNames.length > 0) {
            loadAndParseFile(fileNames[0], settings, function () {
                fileNames.shift();
                loadAndParseFiles(fileNames, settings);
            });
        } else {
            callbackIfComplete(settings);
        }
    }

    /** Load and parse .properties files */
    function loadAndParseFile(filename, settings, nextFile) {

        if (settings.debug) {
            debug('loadAndParseFile(\'' + filename + '\')');
            debug('totalFiles: ' + settings.totalFiles);
            debug('filesLoaded: ' + settings.filesLoaded);
        }

        if (filename !== null && typeof filename !== 'undefined') {
            $.ajax({
                url: filename,
                async: settings.async,
                cache: settings.cache,
                dataType: 'text',
                success: function success(data, status) {

                    if (settings.debug) {
                        debug('Succeeded in downloading ' + filename + '.');
                        debug(data);
                    }

                    parseData(data, settings);
                    nextFile();
                },
                error: function error(jqXHR, textStatus, errorThrown) {

                    if (settings.debug) {
                        debug('Failed to download or parse ' + filename + '. errorThrown: ' + errorThrown);
                    }
                    if (jqXHR.status === 404) {
                        settings.totalFiles -= 1;
                    }
                    nextFile();
                }
            });
        }
    }

    /** Parse .properties files */
    function parseData(data, settings) {

        var parsed = '';
        var lines = data.split(/\n/);
        var regPlaceHolder = /(\{\d+})/g;
        var regRepPlaceHolder = /\{(\d+)}/g;
        var unicodeRE = /(\\u.{4})/ig;
        for (var i = 0, j = lines.length; i < j; i++) {
            var line = lines[i];

            line = line.trim();
            if (line.length > 0 && line.match("^#") != "#") {
                // skip comments
                var pair = line.split('=');
                if (pair.length > 0) {
                    /** Process key & value */
                    var name = decodeURI(pair[0]).trim();
                    var value = pair.length == 1 ? "" : pair[1];
                    // process multi-line values
                    while (value.search(/\\$/) != -1) {
                        value = value.substring(0, value.length - 1);
                        value += lines[++i].trimRight();
                    }
                    // Put values with embedded '='s back together
                    for (var s = 2; s < pair.length; s++) {
                        value += '=' + pair[s];
                    }
                    value = value.trim();

                    /** Mode: bundle keys in a map */
                    if (settings.mode == 'map' || settings.mode == 'both') {
                        // handle unicode chars possibly left out
                        var unicodeMatches = value.match(unicodeRE);
                        if (unicodeMatches) {
                            unicodeMatches.forEach(function (match) {
                                value = value.replace(match, unescapeUnicode(match));
                            });
                        }
                        // add to map
                        if (settings.namespace) {
                            $.i18nGbif.map[settings.namespace][name] = value;
                        } else {
                            $.i18nGbif.map[name] = value;
                        }
                    }

                    /** Mode: bundle keys as vars/functions */
                    if (settings.mode == 'vars' || settings.mode == 'both') {
                        value = value.replace(/"/g, '\\"'); // escape quotation mark (")

                        // make sure namespaced key exists (eg, 'some.key')
                        checkKeyNamespace(name);

                        // value with variable substitutions
                        if (regPlaceHolder.test(value)) {
                            var parts = value.split(regPlaceHolder);
                            // process function args
                            var first = true;
                            var fnArgs = '';
                            var usedArgs = [];
                            parts.forEach(function (part) {

                                if (regPlaceHolder.test(part) && (usedArgs.length === 0 || usedArgs.indexOf(part) == -1)) {
                                    if (!first) {
                                        fnArgs += ',';
                                    }
                                    fnArgs += part.replace(regRepPlaceHolder, 'v$1');
                                    usedArgs.push(part);
                                    first = false;
                                }
                            });
                            parsed += name + '=function(' + fnArgs + '){';
                            // process function body
                            var fnExpr = '"' + value.replace(regRepPlaceHolder, '"+v$1+"') + '"';
                            parsed += 'return ' + fnExpr + ';' + '};';
                            // simple value
                        } else {
                            parsed += name + '="' + value + '";';
                        }
                    } // END: Mode: bundle keys as vars/functions
                } // END: if(pair.length > 0)
            } // END: skip comments
        }
        eval(parsed);
        settings.filesLoaded += 1;
    }

    /** Make sure namespace exists (for keys with dots in name) */
    // TODO key parts that start with numbers quietly fail. i.e. month.short.1=Jan
    function checkKeyNamespace(key) {

        var regDot = /\./;
        if (regDot.test(key)) {
            var fullname = '';
            var names = key.split(/\./);
            for (var i = 0, j = names.length; i < j; i++) {
                var name = names[i];

                if (i > 0) {
                    fullname += '.';
                }

                fullname += name;
                if (eval('typeof ' + fullname + ' == "undefined"')) {
                    eval(fullname + '={};');
                }
            }
        }
    }

    /** Ensure language code is in the format aa_AA. */
    $.i18nGbif.normaliseLanguageCode = function (settings) {

        var lang = settings.language;
        if (!lang || lang.length < 2) {
            if (settings.debug) debug('No language supplied. Pulling it from the browser ...');
            lang = navigator.languages && navigator.languages.length > 0 ? navigator.languages[0] : navigator.language || navigator.userLanguage /* IE */ || 'en';
            if (settings.debug) debug('Language from browser: ' + lang);
        }

        lang = lang.toLowerCase();
        lang = lang.replace(/-/, "_"); // some browsers report language as en-US instead of en_US
        if (lang.length > 3) {
            lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
        }
        return lang;
    };

    /** Unescape unicode chars ('\u00e3') */
    function unescapeUnicode(str) {

        // unescape unicode codes
        var codes = [];
        var code = parseInt(str.substr(2), 16);
        if (code >= 0 && code < Math.pow(2, 16)) {
            codes.push(code);
        }
        // convert codes to text
        return codes.reduce(function (acc, val) {
            return acc + String.fromCharCode(val);
        }, '');
    }
})(jQuery);
});

require.register("js/mante.js", function(exports, require, module) {
"use strict";

var gbifesjs = require('./settings');

$(function () {
  if (gbifesjs.inMante) {
    console.log("Setting manteinance banner");

    var manteDiv = "<div class=\"row\">\n    <div class=\"col-md-6\">\n      <div class=\"error-template\">\n        <h1>\n          \xA1Uuppps, vaya!</h1>\n        <h2>\n\n          Estamos haciendo mantenimiento en nuestro equipos</h2>\n        <div>\n          <p>\n            Perdonad las molestias pero estamos realizando labores de mantenimiento.\n            \xA1Volvemos en breve!</p>\n          <p>\n            El equipo de GBIF.ES</p>\n        </div>\n        <div class=\"error-actions\">\n          <a href=\"https://www.gbif.es\" style=\"margin-top: 10px;\" class=\"btn btn-info btn-lg\"><span class=\"glyphicon glyphicon-home\">\n          </span>&nbsp;&nbsp;Ir a gbif.es</a>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-6\">\n      <svg class=\"svg-box\" width=\"380px\" height=\"500px\" viewbox=\"0 0 837 1045\" version=\"1.1\"\n           xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n        <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n          <path d=\"M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z\" id=\"Polygon-1\" stroke=\"#00e095\" stroke-width=\"6\" sketch:type=\"MSShapeGroup\"></path>\n          <path d=\"M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z\" id=\"Polygon-2\" stroke=\"#00e095\" stroke-width=\"6\" sketch:type=\"MSShapeGroup\"></path>\n          <path d=\"M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z\" id=\"Polygon-3\" stroke=\"#00e095\" stroke-width=\"6\" sketch:type=\"MSShapeGroup\"></path>\n          <path d=\"M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z\" id=\"Polygon-4\" stroke=\"#00e095\" stroke-width=\"6\" sketch:type=\"MSShapeGroup\"></path>\n          <path d=\"M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z\" id=\"Polygon-5\" stroke=\"#00e095\" stroke-width=\"6\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </svg>\n    </div>\n  </div>";
    $("#mante-container").html(manteDiv);
    $("#mante-container").show();
  }
});
});

require.register("js/sentry.js", function(exports, require, module) {
'use strict';

var gbifesjs = require('./settings');

var _require = require('./i18n_init'),
    locale = _require.locale;

var Cookies = require('js-cookie');

var user = Cookies.get('ALA-Auth');

if (!gbifesjs.isDevel) {
  Sentry.init({ dsn: gbifesjs.sentryUrl });
  console.log('Sentry configured');
}

var user = Cookies.get('ALA-Auth', { domain: 'gbif.es', path: '/' });

if (typeof user !== 'undefined') {
  Sentry.configureScope(function (scope) {
    scope.setUser({ "email": user });
    console.log('Sentry setting email scope');
  });
} else {
  console.log('Cannot set sentry email scope');
}

Sentry.configureScope(function (scope) {
  scope.setTag("page_locale", locale);
  console.log('Sentry setting lang scope');
});

var buildInfo = 'development - 2020-06-03 05:48';

console.log('Build info: ' + buildInfo);

Sentry.configureScope(function (scope) {
  scope.setExtra("gbif-es-build", buildInfo);
});

// Sentry.captureMessage('Pro pro probando probando');
});

require.register("js/settings-demo.js", function(exports, require, module) {
'use strict';

module.exports = {
  isDevel: true,
  inMante: false,
  enabledLangs: ['es', 'en', 'ca'],
  mainLAUrl: 'https://demo.gbif.es/',
  mainDomain: 'gbif.es', // used for cookies (without http/https)
  baseFooterUrl: 'https://demo.gbif.es/brand-2020-brunch/',
  sentryUrl: "https://e8b7082a5d2f4d659690e56438f6015c@sentry.comunes.org/17",
  services: {
    collectory: { url: 'https://colecciones.gbif.es', title: 'Collections' },
    biocache: { url: 'https://registros.gbif.es', title: 'Occurrence records' },
    biocacheService: { url: 'https://registros-ws.gbif.es', title: 'Occurrence records webservice' },
    bie: { url: 'https://especies.gbif.es', title: 'Species' },
    bieService: { url: 'https://especies-ws.gbif.es', title: 'Species webservice' },
    regions: { url: 'https://regiones.gbif.es', title: 'Regions' },
    lists: { url: 'https://listas.gbif.es', title: 'Species List' },
    spatial: { url: 'https://espacial.gbif.es', title: 'Spatial Portal' },
    images: { url: 'https://imagenes.gbif.es', title: 'Images Service' },
    collectoryDIS: { url: 'https://demo.gbif.es/collections', title: 'Collections' },
    biocacheDIS: { url: 'https://demo.gbif.es/ala-hub', title: 'Occurrence records' },
    biocacheServiceDIS: { url: 'https://demo.gbif.es/biocache-service', title: 'Occurrence records webservice' },
    bieDIS: { url: 'https://demo.gbif.es/ala-bie', title: 'Species' },
    regionsDIS: { url: 'https://demo.gbif.es/bie-index', title: 'Regions' },
    listsDIS: { url: 'https://demo.gbif.es/specieslists', title: 'Species List' },
    spatialDIS: { url: 'https://espacial.gbif.es', title: 'Spatial Portal' },
    imagesDIS: { url: 'https://demo.gbif.es/dimages', title: 'Images Service' },
    cas: { url: 'https://auth.gbif.es', title: 'CAS' }
  },
  otherLinks: [{ title: 'Datasets', url: 'https://demo.gbif.es/collectory/datasets' }, { title: 'Explore your area', url: 'http://demo.gbif.es/ala-hub/explore/your-area/' }, { title: 'Datasets', url: 'https://demo.gbif.es/collectory/datasets' }, { title: 'twitter', url: 'https://twitter.com/GbifEs', icon: 'twitter' }]
};
});

;require.register("js/settings-prod.js", function(exports, require, module) {
'use strict';

module.exports = {
  isDevel: false,
  inMante: false,
  enabledLangs: ['es', 'en', 'ca'],
  mainLAUrl: 'https://datos.gbif.es/',
  mainDomain: 'gbif.es', // used for cookies (without http/https)
  baseFooterUrl: 'https://datos.gbif.es/brand-2020-brunch/',
  sentryUrl: "https://e8b7082a5d2f4d659690e56438f6015c@sentry.comunes.org/17",
  services: {
    collectory: { url: 'https://colecciones.gbif.es', title: 'Collections' },
    biocache: { url: 'https://registros.gbif.es', title: 'Occurrence records' },
    biocacheService: { url: 'https://registros-ws.gbif.es', title: 'Occurrence records webservice' },
    bie: { url: 'https://especies.gbif.es', title: 'Species' },
    bieService: { url: 'https://especies-ws.gbif.es', title: 'Species webservice' },
    regions: { url: 'https://regiones.gbif.es', title: 'Regions' },
    lists: { url: 'https://listas.gbif.es', title: 'Species List' },
    spatial: { url: 'https://espacial.gbif.es', title: 'Spatial Portal' },
    images: { url: 'https://imagenes.gbif.es', title: 'Images Service' },
    cas: { url: 'https://auth.gbif.es', title: 'CAS' }
  },
  otherLinks: [{ title: 'Datasets', url: 'https://colecciones.gbif.es/datasets' }, { title: 'Explore your area', url: 'http://registros.gbif.es/explore/your-area/' }, { title: 'Datasets', url: 'https://colecciones.gbif.es/datasets' }, { title: 'twitter', url: 'https://twitter.com/GbifEs', icon: 'twitter' }]
};
});

;require.register("js/settings.js", function(exports, require, module) {
'use strict';

module.exports = {
  isDevel: true,
  inMante: false,
  enabledLangs: ['es', 'en', 'ca'],
  mainLAUrl: 'https://demo.gbif.es/',
  mainDomain: 'gbif.es', // used for cookies (without http/https)
  baseFooterUrl: 'https://demo.gbif.es/brand-2020-brunch/',
  sentryUrl: "https://e8b7082a5d2f4d659690e56438f6015c@sentry.comunes.org/17",
  services: {
    collectory: { url: 'https://colecciones.gbif.es', title: 'Collections' },
    biocache: { url: 'https://registros.gbif.es', title: 'Occurrence records' },
    biocacheService: { url: 'https://registros-ws.gbif.es', title: 'Occurrence records webservice' },
    bie: { url: 'https://especies.gbif.es', title: 'Species' },
    bieService: { url: 'https://especies-ws.gbif.es', title: 'Species webservice' },
    regions: { url: 'https://regiones.gbif.es', title: 'Regions' },
    lists: { url: 'https://listas.gbif.es', title: 'Species List' },
    spatial: { url: 'https://espacial.gbif.es', title: 'Spatial Portal' },
    images: { url: 'https://imagenes.gbif.es', title: 'Images Service' },
    collectoryDIS: { url: 'https://demo.gbif.es/collections', title: 'Collections' },
    biocacheDIS: { url: 'https://demo.gbif.es/ala-hub', title: 'Occurrence records' },
    biocacheServiceDIS: { url: 'https://demo.gbif.es/biocache-service', title: 'Occurrence records webservice' },
    bieDIS: { url: 'https://demo.gbif.es/ala-bie', title: 'Species' },
    regionsDIS: { url: 'https://demo.gbif.es/bie-index', title: 'Regions' },
    listsDIS: { url: 'https://demo.gbif.es/specieslists', title: 'Species List' },
    spatialDIS: { url: 'https://espacial.gbif.es', title: 'Spatial Portal' },
    imagesDIS: { url: 'https://demo.gbif.es/dimages', title: 'Images Service' },
    cas: { url: 'https://auth.gbif.es', title: 'CAS' }
  },
  otherLinks: [{ title: 'Datasets', url: 'https://demo.gbif.es/collectory/datasets' }, { title: 'Explore your area', url: 'http://demo.gbif.es/ala-hub/explore/your-area/' }, { title: 'Datasets', url: 'https://demo.gbif.es/collectory/datasets' }, { title: 'twitter', url: 'https://twitter.com/GbifEs', icon: 'twitter' }]
};
});

;require.register("js/stats.js", function(exports, require, module) {
'use strict';

var settings = require('./settings');

var _require = require('./i18n_init'),
    locale = _require.locale;

var _require2 = require('countup.js'),
    CountUp = _require2.CountUp;

var collectory = settings.services.collectory.url;
var biocacheService = settings.services.biocacheService.url;

var setCounter = function setCounter(id, val, onEnd) {
  var options = {
    separator: locale === 'en' ? ',' : '.',
    duration: 1
  };
  // If testing set some dummy value
  if (val === 0 && settings.isDevel) {
    val = 123456;
  }
  options.startVal = Math.round(val - val * 4 / 100); // we increment only a %
  console.log('Start val ' + options.startVal + ' to ' + val);
  var countUp = new CountUp(id, val, options);
  if (!countUp.error) {
    countUp.start(function () {
      $('#' + id).addClass('loaded_stats');if (typeof onEnd !== 'undefined') onEnd();
    });
  } else {
    console.error(countUp.error);
  }
};

// If you want to show collections stats:
// `${collectory}/ws/dataResource/count`

var loadStats = function loadStats() {
  $.getJSON(biocacheService + '/occurrences', function (data) {
    setCounter('number_registros', data.totalRecords, function () {
      return $.getJSON(collectory + '/ws/dataResource/count', function (data) {
        setCounter('number_bases', data.total, function () {
          return $.getJSON(collectory + '/ws/institution/count', function (data) {
            setCounter('number_instituciones', data.total);
          });
        });
      });
    });
  });
  // Right now this is slow so we put here
  $.getJSON(biocacheService + '/occurrence/facets?q=*:*&facets=species&pageSize=0', function (data) {
    setCounter("number_species", data[0].count);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  if (document.location.host === 'datos.gbif.es' || document.location.host === 'demo.gbif.es' || document.location.host === 'localhost:3333' || settings.isDevel) {
    console.log('Loading stats');
    loadStats();
  } else {
    console.log('Not loading stats');
  }
});
});

require.register("js/top-search.js", function(exports, require, module) {
'use strict';

var gbifesjs = require('./settings');

var enableBieSearch = function enableBieSearch() {
  // if (document.location.host !== 'localhost:3002') {

  // Maybe better:
  // if (/^datos.gbif.es/.test(window.location.host)) {

  if (document.location.host !== 'datos.gbif.es' && document.location.host !== 'demo.gbif.es' && document.location.host !== 'auth.gbif.es'
  // Is useful also
  // &&  document.location.host !== 'especies.gbif.es'
  ) {
      if (gbifesjs.isDevel) console.log('Enabling BIE search in ' + document.location.host);
      $("#top-search-icon-button").show();
      $("#top-search-icon-button-big").show();
      $("#top-search-icon-button-small").show();
    }
};

$(function () {
  enableBieSearch();
});
});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map