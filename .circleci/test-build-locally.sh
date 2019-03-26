#!/usr/bin/env bash
curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=3cbb8b94f45c3ad612929817f89150e0aab2b75f\
    --form config=@config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/Josephus-P/yaro-todo/tree/master