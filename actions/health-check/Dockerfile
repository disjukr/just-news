FROM node:12
LABEL "version"="0.0.0"
LABEL "com.github.actions.name"="Health check"
LABEL "com.github.actions.description"="Test Health check"
LABEL "com.github.actions.icon"="archive"
LABEL "com.github.actions.color"="orange"

LABEL "repository"="https://github.com/disjukr/just-news/actions/health-check"
LABEL "homepage"="https://github.com/disjukr/just-news/actions/health-check"
LABEL "maintainer"="JongChan Choi <jong+just.news@chan.moe>"

#### from https://github.com/ianwalter/puppeteer/blob/master/Dockerfile
RUN  apt-get update \
     # See https://crbug.com/795759
     && apt-get install -yq libgconf-2-4 \
     # Install latest chrome dev package, which installs the necessary libs to
     # make the bundled version of Chromium that Puppeteer installs work.
     && apt-get install -y wget --no-install-recommends \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y google-chrome-unstable --no-install-recommends \
     && rm -rf /var/lib/apt/lists/*

# When installing Puppeteer through npm, instruct it to not download Chromium.
# Puppeteer will need to be launched with:
#   browser.launch({ executablePath: 'google-chrome-unstable' })
# This is done by default in @ianwalter/bff.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
