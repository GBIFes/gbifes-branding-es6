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
