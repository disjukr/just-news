set -e
if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = false ] && [ "$GITHUB_TOKEN" != "" ]; then
    echo "machine github.com login reactjs-bot password $GITHUB_TOKEN" >~/.netrc
    git config --global user.name "jews-bot"
    git config --global user.email "jews@chan.moe"

    npm run production

    git status

    git fetch
    git checkout release
    git branch
    git pull origin release
    git merge master
    git add dist/jews.user.js
    git stage
    git commit -m "release new version"
    git push origin release
fi
