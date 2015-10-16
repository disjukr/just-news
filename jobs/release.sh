set -e
if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = false ] && [ "$GITHUB_TOKEN" != "" ]; then
    echo "machine github.com login reactjs-bot password $GITHUB_TOKEN" >~/.netrc
    git config --global user.name "jews-bot"
    git config --global user.email "jews@chan.moe"

    npm run production

    git status

    echo "git fetch"
    git fetch
    echo "git checkout release"
    git checkout release
    echo "git branch"
    git branch
    echo "git pull origin release"
    git pull origin release
    echo "git merge master"
    git merge master
    echo "git add dist/jews.user.js"
    git add dist/jews.user.js
    echo "git stage"
    git stage
    echo "git commit"
    git commit -m "release new version"
    echo "git push origin release"
    git push origin release
fi
