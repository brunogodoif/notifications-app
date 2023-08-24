#!/bin/bash

echo "Run clear cache, route, config..."
php artisan config:clear
php artisan view:clear
php artisan cache:clear
php artisan route:cache
php artisan config:cache
php artisan optimize:clear

echo "Run Migrations"
php /var/www/artisan migrate

echo "Run Seeders"
php /var/www/artisan db:seed

echo echo "Generate Docs Swagger"
php artisan l5-swagger:generate

echo "Up application backend"
php-fpm -D
nginx -g "daemon off;"
