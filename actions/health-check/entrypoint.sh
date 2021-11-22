#!/bin/bash

npm install -g pnpm
pnpm install

echo "pnpm test:health-check"
pnpm test:health-check

RELEASE_DIR=../just-news-push-health-check
BUILD_DIR=$(pwd)

echo "machine github.com login reactjs-bot password $GITHUB_TOKEN" >~/.netrc
git config --global user.name "just-news-bot"
git config --global user.email "jong+just.news@chan.moe"

echo "pushd to RELEASE_DIR"
pushd $RELEASE_DIR

echo "git init"
git init
git remote add origin https://github.com/disjukr/just-news.git

echo "git checkout health-check"
git checkout -B health-check

echo "copy files"
cp $BUILD_DIR/tmp/health-check.md health-check.md
cp $BUILD_DIR/tmp/health-check.png health-check.png
echo "git add health-check.md health-check.png"
git add health-check.md health-check.png

echo "git commit"
git commit -m "$(date)"
echo "git push origin health-check"
git push origin -f health-check
echo "popd"
popd
