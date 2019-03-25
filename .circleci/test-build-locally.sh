#!/usr/bin/env bash
curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=9fda9cd7a7932058d797d516fdce15799cda5c91\
    --form config=@config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/Josephus-P/yaro-todo/tree/master