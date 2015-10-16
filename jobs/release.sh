set -e
if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = false ] && [ "$GITHUB_TOKEN" != "" ]; then
    echo "machine github.com login reactjs-bot password $GITHUB_TOKEN" >~/.netrc
    git config --global user.name "jews-bot"
    git config --global user.email "jews@chan.moe"
    git config --bool core.bare true

    npm run production

    RELEASE_DIR="$TRAVIS_BUILD_DIR"/../jews-release
    VERSION="v$(date +%Y-%m-%d)-r$TRAVIS_BUILD_NUMBER"
    TAG_MESSAGE="release $VERSION"
    echo "git clone release"
    git clone https://github.com/disjukr/jews.git $RELEASE_DIR
    echo "pushd to RELEASE_DIR"
    pushd $RELEASE_DIR
    echo "git checkout release"
    git checkout release
    echo "git merge master"
    git merge --no-edit master
    echo "mkdir dist if not exists"
    [ -d dist ] || mkdir dist
    echo "cp jews.user.js"
    cp $TRAVIS_BUILD_DIR/dist/jews.user.js dist/jews.user.js
    echo "git add -f dist/jews.user.js"
    git add -f dist/jews.user.js
    echo "check git status"
    git status
    if git status | grep 'no changes added to commit'; then
        exit
    fi
    echo "git commit"
    git commit -m "release new version"
    echo "git tag"
    git tag -a -m $TAG_MESSAGE $VERSION
    echo "git push origin release"
    git push origin release
    echo "git push origin TAG"
    git push origin $TAG
    echo "popd"
    popd
fi
