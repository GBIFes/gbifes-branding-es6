var gbifesjs = require('./settings').default;

var enableBieSearch = () => {
  // if (document.location.host !== 'localhost:3002') {

  // Maybe better:
  // if (/^datos.gbif.es/.test(window.location.host)) {

  if (document.location.host !== 'datos.gbif.es' &&
      document.location.host !== 'auth.gbif.es' &&
      document.location.host !== 'especies.gbif.es'
  ) {
    if (gbifesjs.isDevel) console.log(`Enabling BIE search in ${document.location.host}`);
    $("#top-search-icon-button").show();
    $("#top-search-icon-button-big").show();
    $("#top-search-icon-button-small").show();
  }
}

$(function(){
  enableBieSearch();
});
