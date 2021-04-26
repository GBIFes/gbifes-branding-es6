#!/bin/bash
cp app/js/settings-demo.js app/js/settings.js
brunch build --production
rsync -a --delete public/ demo.gbif.es:/srv/demo.gbif.es/www/brand-2020-brunch/
rsync -a public/ demo.gbif.es:/srv/demo.gbif.es/www/
cp app/js/settings-prod.js app/js/settings.js
brunch build --production
# TODO
rsync -a --delete public/ datos.gbif.es:/srv/auth.gbif.es/www/brand-2020-brunch/
rsync -a public/ datos.gbif.es:/srv/auth.gbif.es/www/
cp app/js/settings-demo.js app/js/settings.js

curl -s https://registros.gbif.es/headerFooter/clearCache && \
curl -s https://especies.gbif.es/headerFooter/clearCache && \
curl -s https://listas.gbif.es/headerFooter/clearCache && \
curl -s https://imagenes.gbif.es/headerFooter/clearCache && \
curl -s https://doi.gbif.es/headerFooter/clearCache && \
curl -s https://alertas.gbif.es/headerFooter/clearCache && \
curl -s https://regiones.gbif.es/headerFooter/clearCache && \
curl -s https://auth.gbif.es/userdetails/headerFooter/clearCache && \
curl -s https://colecciones.gbif.es/headerFooter/clearCache

