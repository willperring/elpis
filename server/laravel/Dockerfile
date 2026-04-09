# This dockerfile is intended simply to provide a local development instance,
# rather than produce an image for hosting
FROM php:8.4-apache

RUN apt update \
 && apt install -y \
        curl \
        git \
        libpq-dev \
        netcat-traditional \
        net-tools \
        sudo \
        zip

RUN pecl install xdebug

RUN docker-php-ext-install \
        pdo_pgsql \
        pgsql

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
RUN composer global require laravel/installer

COPY ./apache.conf /etc/apache2/sites-enabled/000-default.conf
RUN a2enmod rewrite

COPY ./xdebug.ini /usr/local/etc/php/conf.d/

WORKDIR /var/www/elpis-laravel

COPY composer.json .
RUN composer install --no-scripts

COPY . .
RUN composer install

RUN groupadd dev -g 1000
RUN useradd dev -g dev -d /home/dev -m
USER dev:dev
