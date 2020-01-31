/**
 * Simple function to internationalise menus and sections of the home page.
 */

var gbifesjs = require('./settings').default;
require('./jquery-eu-cookie-law-popup');
var { locale } = require('./i18n_init');
var enabledLangs = gbifesjs.enabledLangs;

// IE don't have String.endsWith
// https://stackoverflow.com/a/2548133/642847
function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function i18n_menus() {
  console.log('Calling i18n_menus');
  if (gbifesjs.isDevel) console.log(`locale in i18n_menus: ${locale}`);

  // Add lang param to lang links
  if (locale) {
    $('.top-nav-menu a, .portal-link').each(function () {
      const $this = $(this);
      const _href = $this.attr('href');
      // Take care of #hash in links
      const uri = _href.split('#')[0];
      const hash = _href.split('#')[1];
      if (typeof hash === 'undefined') {
        // without hash
        $this.attr('href', `${_href}?lang=${locale}`);
      } else {
        $this.attr('href', `${uri}?lang=${locale}#${hash}`);
      }
      if (gbifesjs.isDevel) console.log(`Added lang to href: ${$this.attr('href')}`);
    });
  }

  const url = window.location.href;

  if (gbifesjs.isDevel) console.log(`Enabled langs: ${enabledLangs}`);

  // This part is for the lang links
  for (let i = 0; i < enabledLangs.length; i++) {
    const curlang = enabledLangs[i];
    const $link = $(`.${curlang}-locale-link`); // or grab it by tagname etc

    let localeUrl = url;

    if (url.indexOf('lang=') !== -1) {
      localeUrl = url.replace(/lang=en|lang=es|lang=ca/gi, `lang=${curlang}`);
    } else if (url.indexOf('?') !== -1) {
      localeUrl = `${localeUrl}&lang=${curlang}`;
    } else {
      const uri = url.split('#')[0];
      let hash = url.split('#')[1];
      hash = typeof hash === 'undefined' ? '' : `#${hash}`;
      localeUrl = `${uri}?lang=${curlang}${hash}`;
    }
    $link.attr('href', localeUrl);
    if (gbifesjs.isDevel) console.log(`Added lang to href: ${$link.attr('href')}`);
  }


  // underscore current locale
  $('.wpml-ls-statics-shortcode_actions ul li').each(function (index) {
    const currentItem = $(this).text().replace(/^\s+|\s+$/gm, '').toLowerCase();
    $(this).removeClass('wpml-ls-current-language');
    if (currentItem === locale) {
      $(this).addClass('wpml-ls-current-language');
    }
  });

  const path = `::headerFooterServer::/i18n/`;

  if (gbifesjs.isDevel) console.log(`localePath: ${path}`);
  if (typeof jQuery.i18n === 'undefined') console.warn('jQuery.i18n not yet loaded');

  // https://github.com/jquery-i18n-properties/jquery-i18n-properties
  jQuery.i18n.properties({
    name: 'messages',
    path: path,
    mode: 'map',
    debug: false,
    encoding: 'UTF-8',
    cache: false,
    language: locale,
    async: true,
    callback: function() {
      if (gbifesjs.isDevel) console.log(`i18n callback start`);
      const keys = [
        'main_title_label',
        'menu_portal_part1',
        'menu_portal_part2',
        'menu_home',
        'menu_collections',
        'menu_datasets',
        'menu_search',
        'menu_explore',
        'menu_regions',
        'top_menu_dataportal',
        'footer_menu_about',
        'footer_menu_biodiversity_data',
        'footer_menu_collaborations',
        'footer_menu_resources',
        'footer_menu_news',
        'footer_menu_training',
        'footer_menu_software',
        'footer_menu_contact',
        'numbers_occurrences_label',
        'numbers_datasets_label',
        'numbers_institutions_label',
        'numbers_species_label',
        'lang_link_en',
        'lang_link_es',
        'lang_link_cat',
        'footer_legal_info',
        'search_input_advanced1',
        'search_input_advanced2',
        'sub_menu_collections',
        'sub_menu_collections_detail',
        'sub_menu_datasets',
        'sub_menu_datasets_detail',
        'sub_menu_explore',
        'sub_menu_explore_detail',
        'sub_menu_regions',
        'sub_menu_regions_detail',
        'footer_legal_code',
        'banner_search_input_placeholder',
        'main_search_input_placeholder',
        'auth_bar_login',
        'auth_bar_logout',
        'auth_bar_signup',
        'auth_bar_myprofile',
        'autocompleteHeader_placeholder'
      ];

      for (let i = 0; i < keys.length; i++) {
        const trans = jQuery.i18n.prop(keys[i]);
        if (gbifesjs.isDevel) console.log(`i18n of ${keys[i]}: ${trans}`);
        if (typeof trans !== 'undefined') {
          if (endsWith(keys[i], '_placeholder')) {
            const elementID = keys[i].substring(0, keys[i].length - 12);
            // verify that this element exists
            $(`#${elementID}`) && $(`#${elementID}`).attr('placeholder', trans);
          } else {
            // verify that this element exists
            $(`#${keys[i]}`) && $(`#${keys[i]}`).html(trans);
          }
        }
      }

      $(document).euCookieLawPopup().init({
        cookiePolicyUrl : 'https://www.gbif.es/politica-de-cookies/',
        popupPosition : 'bottom',
        colorStyle : 'gbif',
        compactStyle : true,
        popupTitle : '',
        popupText : jQuery.i18n.prop('cookie_message'),
        buttonContinueTitle : jQuery.i18n.prop('cookie_accept_btn'),
        buttonLearnmoreTitle :jQuery.i18n.prop('cookie_policy_btn'),
        buttonLearnmoreOpenInNewWindow : true,
        agreementExpiresInDays : 30,
        autoAcceptCookiePolicy : false,
        htmlMarkup : null
      });
    }
  });
}

// Warn, with min version fails so we load here
/* $.getScript('/js/jquery.i18n.properties.min.js', function() {
 *   console.log('$.i18n loaded.');
 * });
 *  */
$(function() {
  // wait til gbif.es elements are visible
  var checkExist = setInterval(function() {
    if ($('#menu_home').length) {
      console.log("gbif_es_elements loaded");
      clearInterval(checkExist);
      i18n_menus();
    } else {
      if (gbifesjs.isDevel) console.log("gbif_es_elements not loaded");
    }
  }, 1000);
});
