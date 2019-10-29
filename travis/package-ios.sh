#!/bin/bash -v

set -e

if [[ "$TRAVIS_BRANCH" == "develop" ]]
then
    echo "Skipping package iOS for develop branch"
    exit
fi

mkdir -p dist/output
tar zcvf dist/output/yoga-booking-release-unsigned.app.tgz platforms/ios/build/emulator/YogaBookingApp.app

