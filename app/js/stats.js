var settings = require('./settings');
var { locale } = require('./i18n_init');
var { CountUp } = require('countup.js');
const base = "$_LOCALES_URL/";

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

var loadStats = () => {
  $.getJSON(`${base}/stats.json`, (data) => {
    console.info(`Stats loaded: ${JSON.stringify(data)}`);
    setCounter('number_registros', data.records, () =>
      setCounter('number_bases', data.drs, () =>
        setCounter('number_instituciones', data.institutions, () =>
          setCounter("number_species", data.species)
        )
      )
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.location.host === 'datos.gbif.es' || document.location.host === 'demo.gbif.es' || document.location.host === 'localhost:3333'
      || settings.isDevel ) {
    console.log('Loading stats');
    loadStats();
  } else {
    console.log('Not loading stats');
  }
});
