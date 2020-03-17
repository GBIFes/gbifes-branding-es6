var settings = require('./settings');
var { locale } = require('./i18n_init');
var { CountUp } = require('countup.js');

var collectory = settings.services.collectory.url;
var biocacheService = settings.services.biocacheService.url;

var setCounter = (id, val, onEnd) => {
  const options = {
    separator: locale === 'en' ? ',': '.',
    duration: 1
  };
  // If testing set some dummy value
  if (val === 0 && settings.isDevel) {
    val = 123456;
  }
  options.startVal = Math.round(val - val * 4/100); // we increment only a %
  console.log(`Start val ${options.startVal} to ${val}`);
  const countUp = new CountUp(id, val, options);
  if (!countUp.error) {
    countUp.start(() => { $(`#${id}`).addClass('loaded_stats'); if (typeof onEnd !== 'undefined') onEnd(); });
  } else {
    console.error(countUp.error);
  }
};

// If you want to show collections stats:
// `${collectory}/ws/dataResource/count`

var loadStats = () => {
  $.getJSON(`${biocacheService}/occurrences`, (data) => {
    setCounter('number_registros', data.totalRecords, () =>
      $.getJSON(`${collectory}/ws/dataResource/count`, (data) => {
        setCounter('number_bases', data.total, () =>
          $.getJSON(`${collectory}/ws/institution/count`, (data) => {
            setCounter('number_instituciones', data.total);
          })
        )
      })
    )});
  // Right now this is slow so we put here
  $.getJSON(`${biocacheService}/occurrence/facets?q=*:*&facets=species&pageSize=0`, (data) => {
    setCounter("number_species", data[0].count);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.location.host === 'datos.gbif.es' || document.location.host === 'demo.gbif.es' || document.location.host === 'localhost:3333'
      || settings.isDevel ) {
    loadStats();
  }
});
