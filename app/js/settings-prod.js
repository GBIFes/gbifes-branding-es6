module.exports = {
  isDevel: false,
  inMante: false,
  enabledLangs:  ['es', 'en', 'ca'],
  mainLAUrl: 'https://datos.gbif.es/',
  mainDomain: 'gbif.es', // used for cookies (without http/https)
  baseFooterUrl: 'https://datos.gbif.es/brand-2020-brunch/',
  sentryUrl: "https://a769ac65ea144535bfe30afcbc431ef4@sentry.comunes.org/2",
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
  otherLinks: [
    { title: 'Datasets', url: 'https://colecciones.gbif.es/datasets' },
    { title: 'Explore your area', url: 'http://registros.gbif.es/explore/your-area/' },
    { title: 'Datasets', url: 'https://colecciones.gbif.es/datasets' },
    { title: 'twitter', url: 'https://twitter.com/GbifEs', icon: 'twitter' }
  ]
}
