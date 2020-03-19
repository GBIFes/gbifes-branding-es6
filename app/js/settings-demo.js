module.exports = {
  isDevel: true,
  inMante: false,
  enabledLangs:  ['es', 'en', 'ca'],
  mainLAUrl: 'https://demo.gbif.es/',
  mainDomain: 'gbif.es', // used for cookies (without http/https)
  baseFooterUrl: 'https://demo.gbif.es/brand-2020-brunch/',
  sentryUrl: "https://e8b7082a5d2f4d659690e56438f6015c@sentry.comunes.org/17",
  services: {
    collectory: { url: 'https://colecciones.gbif.es', title: 'Collections' },
    biocache: { url: 'https://registros.gbif.es', title: 'Occurrence records' },
    biocacheService: { url: 'https://registros-ws.gbif.es', title: 'Occurrence records webservice' },
    bie: { url: 'https://especies.gbif.es', title: 'Species' },
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
  otherLinks: [
    { title: 'Datasets', url: 'https://demo.gbif.es/collectory/datasets' },
    { title: 'Explore your area', url: 'http://demo.gbif.es/ala-hub/explore/your-area/' },
    { title: 'Datasets', url: 'https://demo.gbif.es/collectory/datasets' },
    { title: 'twitter', url: 'https://twitter.com/GbifEs', icon: 'twitter' }
  ]
}
