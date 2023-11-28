const settings = require('./settings');
const collectory = settings.services.collectory.url;
const biocacheService = settings.services.biocacheService.url;
const bent = require('bent')
const getJSON = bent('json')

// If you want to show collections stats:
// `${collectory}/ws/dataResource/count`

let loadStats = async () => {
  let stats = {};
  let data = await getJSON(`${biocacheService}/occurrences/search`);
  stats["records"] = data.totalRecords;
  data = await getJSON(`${collectory}/ws/dataResource/count`);
  stats["drs"] = data.total;
  data = await getJSON(`${collectory}/ws/institution/count`);
  stats["institutions"] = data.total;
  // Right now this is slow
  data = await getJSON(`${biocacheService}/occurrence/facets?q=*:*&facets=species&pageSize=0`);
  stats["species"] = data[0].count;
  console.log(JSON.stringify(stats));
}

loadStats();
