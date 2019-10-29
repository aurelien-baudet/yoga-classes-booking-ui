#!/bin/bash -v

set -e

if [[ "$TRAVIS_BRANCH" == "develop" ]]
then
    echo "Skipping package Android for develop branch"
    exit
fi

mkdir -p dist/output
cp platforms/android/build/outputs/apk/android-release-unsigned.apk dist/output/yoga-booking-release-unsigned.apk

