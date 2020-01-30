function addCollectoryDownloadsLegend() {
  setTimeout(() => {
  if (/^colecciones.gbif.es/.test(window.location.host)) {
    if ($('#logs-since-2018').length === 0) {
      console.log('Adding downloads label to collectory');
      $('#usage-stats>#usage').after('<div id="logs-since-2018"><label style="font-weight: normal; font-size: 12px;">* Las estad&iacute;sticas de uso comenzaron a registrarse el 1 de noviembre de 2018.</label></div>');
      // $("#usage-stats>#usage").after('<p id="logs-since-2018" class="lastUpdated">Las estad&iacute;sticas de uso comenzaron a registrarse el 1 de noviembre de 2018.</p>');
    }
  }
}, 4000);
};

document.addEventListener("DOMContentLoaded",function(){
  addCollectoryDownloadsLegend();
});


// TODO do something with this
