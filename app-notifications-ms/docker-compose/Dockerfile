FROM php:8.1-fpm as php

ARG PHP_OPCACHE_ENABLE
ARG PHP_OPCACHE_ENABLE_CLI
ARG PHP_OPCACHE_VALIDATE_TIMESTAMPS
ARG PHP_OPCACHE_REVALIDATE_FREQ

ENV PHP_OPCACHE_ENABLE=${PHP_OPCACHE_ENABLE}
ENV PHP_OPCACHE_ENABLE_CLI=${PHP_OPCACHE_ENABLE_CLI}
ENV PHP_OPCACHE_VALIDATE_TIMESTAMPS=${PHP_OPCACHE_VALIDATE_TIMESTAMPS}
ENV PHP_OPCACHE_REVALIDATE_FREQ=${PHP_OPCACHE_REVALIDATE_FREQ}

RUN usermod -u 1000 www-data

RUN apt-get update -y \
    && apt-get install -y unzip libpq-dev libcurl4-gnutls-dev nginx \
    && docker-php-ext-install pdo bcmath curl opcache pdo_pgsql

# Criação de um estágio intermediário para instalação do Composer
FROM composer:latest as composer

# Copia apenas o binário do Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Estágio final para a construção da imagem otimizada para produção
FROM php

WORKDIR /var/www

COPY ./docker-compose/conf/php/php.ini /usr/local/etc/php/php.ini
COPY ./docker-compose/conf/php/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf
COPY ./docker-compose/conf/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini
COPY ./docker-compose/conf/nginx/nginx.conf /etc/nginx/nginx.conf

# Copia o script de entrada
COPY ./docker-compose/conf/entrypoint.sh /usr/local/bin/start.sh

# Copia os arquivos e diretórios do projeto (exceto storage)
COPY --chown=www-data:www-data .. .
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Permissões para o script de entrada
RUN chmod +x /usr/local/bin/start.sh

# Definição do diretório de trabalho
WORKDIR /var/www


RUN rm -rf /var/www/storage \
    && mkdir -p /var/www/storage \
    && mkdir -p /var/www/storage/app \
    && mkdir -p /var/www/storage/app/public \
    && mkdir -p /var/www/storage/framework \
    && mkdir -p /var/www/storage/framework/cache \
    && mkdir -p /var/www/storage/framework/sessions \
    && mkdir -p /var/www/storage/framework/testing \
    && mkdir -p /var/www/storage/framework/views \
    && mkdir -p /var/www/storage/logs

RUN touch /var/www/storage/logs/laravel.log

RUN chmod 777 -R /var/www/storage/ \
    && chown -R www-data:www-data /var/www/ \
    && chown -R www-data:www-data /var/www/storage/ \
    && chown -R www-data:www-data /var/www/storage/logs/laravel.log

RUN composer install --no-dev --optimize-autoloader

ENTRYPOINT ["sh", "/usr/local/bin/start.sh"]
