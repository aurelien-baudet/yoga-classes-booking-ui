#!/bin/bash

SECRETS_IV="$2"
SECRETS_KEY="$1"

#travis setup releases --pro --force

rm -f secrets.tar.enc secrets.tar
tar cvf secrets.tar -C ~/Documents/yoga-saint-pierre/travis-secrets debug.keystore production.jks
#travis login --pro --auto
#travis encrypt-file secrets.tar --pro --add
openssl enc -aes-256-cbc -e -in "secrets.tar" -out "secrets.tar.enc" -K $SECRETS_KEY -iv $SECRETS_IV
openssl aes-256-cbc -in "secrets.tar.enc" -out "secrets.tar" -K $SECRETS_KEY -iv $SECRETS_IV -d
rm -f secrets.tar
