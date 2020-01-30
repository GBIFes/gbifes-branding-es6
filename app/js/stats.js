var $ = require('jquery');
var { locale } = require('./i18n_init');

function loadStats(){

  $.getJSON("https://registros-ws.gbif.es/occurrences/search?pageSize=0", function( data ) {
    $('#number_registros').html(addPeriods(data.totalRecords)).addClass('loaded_stats');
  });

  $.getJSON("https://colecciones.gbif.es/ws/institution", function( data ) {
    $('#number_instituciones').html(data.length).addClass('loaded_stats');
  });

  $.getJSON("https://colecciones.gbif.es/ws/dataResource", function( data ) {
    $('#number_bases').html(data.length).addClass('loaded_stats');
  });

  $.getJSON("https://registros-ws.gbif.es/occurrence/facets?q=*:*&facets=species&pageSize=0", function(data) {
    $("#number_species").html(addPeriods(data[0].count)).addClass('loaded_stats');
  });
}


function addPeriods(nStr)
{
  nStr += '';
  var sep = locale === 'en' ? ',': '.';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';

  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + sep + '$2');
  }
  return x1 + x2;
}

document.addEventListener("DOMContentLoaded",function(){
  if (document.location.host === 'datos.gbif.es') {
    loadStats();
  }
});
