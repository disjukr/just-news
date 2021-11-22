FROM node:17
LABEL "version"="0.0.0"
LABEL "com.github.actions.name"="Push health check"
LABEL "com.github.actions.description"="Push health check"
LABEL "com.github.actions.icon"="archive"
LABEL "com.github.actions.color"="orange"

LABEL "repository"="https://github.com/disjukr/just-news/actions/deploy"
LABEL "homepage"="https://github.com/disjukr/just-news/actions/deploy"
LABEL "maintainer"="JongChan Choi <jong+just.news@chan.moe>"

RUN  apt-get update \
     && apt-get install -y wget gnupg ca-certificates procps libxss1 \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y google-chrome-stable \
     && rm -rf /var/lib/apt/lists/* \
     && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     && chmod +x /usr/sbin/wait-for-it.sh

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
