#!/bin/sh

if [ ! -f /etc/letsencrypt/live/yourdomain.com/fullchain.pem ]; then
  certbot certonly --webroot --webroot-path=/var/www/certbot \
  --email youremail@domain.com --agree-tos --no-eff-email \
  -d yourdomain.com
fi

exec "$@"
