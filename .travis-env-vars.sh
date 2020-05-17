#!/bin/sh

if [ "${TRAVIS_BRANCH}" == "master" ]; then
  PROFILE=production
else
  PROFILE=preprod
fi

DATE_TIME=`date +"%d-%m-%y %H:%M"`


export PROFILE
export DATE_TIME