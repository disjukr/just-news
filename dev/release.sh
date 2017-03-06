set -e
if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = false ] && [ "$GITHUB_TOKEN" != "" ]; then
    echo "machine github.com login reactjs-bot password $GITHUB_TOKEN" >~/.netrc
    git config --global user.name "just-news-bot"
    git config --global user.email "jews@chan.moe"
    git config --bool core.bare true

    npm run build

    RELEASE_DIR="$TRAVIS_BUILD_DIR"/../just-news-release
    VERSION="$(date +%Y-%m-%d)-r$TRAVIS_BUILD_NUMBER"
    TAG_MESSAGE="release $VERSION"
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
    cp -R $TRAVIS_BUILD_DIR/dist dist
    echo "git add -f dist"
    git add -f dist
    echo "check git status"
    git status
    if git status | grep 'no changes added to commit'; then
        exit
    fi
    echo "git commit"
    git commit -m "release new version"
    # echo "git tag"
    # git tag -a -m $TAG_MESSAGE $VERSION
    echo "git push origin release"
    git push origin release
    # echo "git push origin --tags"
    # git push origin $TAG
    echo "popd"
    popd
fi
