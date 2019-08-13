#!/bin/bash
RELEASE_DIR=../just-news-release
BUILD_DIR=$(pwd)

echo "npm run build"
npm run build
ls -al

echo "machine github.com login reactjs-bot password $GITHUB_TOKEN" >~/.netrc
git config --global user.name "just-news-bot"
git config --global user.email "jong+just.news@chan.moe"
git config --bool core.bare true

echo "git clone release"
git clone https://github.com/disjukr/just-news.git $RELEASE_DIR
echo "pushd to RELEASE_DIR"
pushd $RELEASE_DIR

echo "git checkout release"
git checkout release

echo "git merge master"
git merge --no-edit master
echo "rm -rf dist"
[ -d dist ] && rm -rf dist
echo "cp -R dist"
cp -R $BUILD_DIR/dist dist
echo "git add -f ."
git add -f .

echo "check git status"
git status
if git status | grep 'no changes added to commit'; then
    exit
fi

echo "git commit"
git commit -m "release new version"
echo "git push origin release"
git push origin release
echo "popd"
popd

