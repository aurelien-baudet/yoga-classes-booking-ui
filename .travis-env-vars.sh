#!/bin/sh

if [ "${TRAVIS_BRANCH}" == "master" ]; then
  PROFILE=production
else
  PROFILE=preprod
fi

export PROFILE