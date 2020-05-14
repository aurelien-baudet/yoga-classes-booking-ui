#!/bin/sh

if [ "${TRAVIS_BRANCH}" == "master" ]; then
  PROFILE=prod
else
  PROFILE=preprod
fi

export PROFILE