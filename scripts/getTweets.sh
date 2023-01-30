#!/bin/bash
while true
do
    curl --location --request GET 'localhost:3000/twitter/allUsersTweet'
    sleep 7200
done