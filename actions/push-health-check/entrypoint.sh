#!/bin/bash
RELEASE_DIR=../just-news-push-health-check
BUILD_DIR=$(pwd)

echo "machine github.com login reactjs-bot password $GITHUB_TOKEN" >~/.netrc
git config --global user.name "just-news-bot"
git config --global user.email "jong+just.news@chan.moe"
git config --bool core.bare true

echo "git clone release"
git clone https://github.com/disjukr/just-news.git $RELEASE_DIR
echo "pushd to RELEASE_DIR"
pushd $RELEASE_DIR

echo "git checkout release"
git checkout health-check

echo "copy files"
cp $BUILD_DIR/tmp/health-check.md health-check.md
cp $BUILD_DIR/tmp/health-check.png health-check.png
echo "git add -f ."
git add -f .

echo "check git status"
git status
if git status | grep 'no changes added to commit'; then
    exit
fi

echo "git commit"
git commit -m "$(date)"
echo "git push origin health-check"
git push origin health-check
echo "popd"
popd
