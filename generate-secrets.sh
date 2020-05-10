#!/bin/bash


#travis setup releases --pro --force

rm -f secrets.tar.enc secrets.tar
tar cvf secrets.tar -C ~/Documents/yoga-saint-pierre/travis-secrets debug.keystore
travis encrypt-file --pro secrets.tar --add
