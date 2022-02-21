document.addEventListener("DOMContentLoaded", () => {
  if (document.location.host === 'listas.gbif.es') $("#downloadLink").next().next().hide();
  if (document.location.host === 'registros.gbif.es') $("#spatialPortalLink").hide();
  if (document.location.host === 'especies.gbif.es') $("#overview > div > div:nth-child(2) > div.taxon-map > div.map-buttons > a:nth-child(1)").hide();
});
