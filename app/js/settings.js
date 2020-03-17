module.exports = {
  isDevel: true,
  inMante: false,
  enabledLangs:  ['es', 'en', 'ca'],
  mainLAUrl: 'https://datos.gbif.es/',
  baseFooterUrl: 'https://datos.gbif.es/brand-2020-brunch/',
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
    cas: { url: 'https://auth.gbif.es', title: 'CAS' }
  },
  otherLinks: [
    { title: 'Datasets', url: 'https://colecciones.gbif.es/datasets' },
    { title: 'Explore your area', url: 'http://registros.gbif.es/explore/your-area/' },
    { title: 'Datasets', url: 'https://colecciones.gbif.es/datasets' },
    { title: 'twitter', url: 'https://twitter.com/GbifEs', icon: 'twitter' }
  ]
}
