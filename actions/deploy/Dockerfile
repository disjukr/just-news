FROM node:12
LABEL "version"="0.0.8"
LABEL "com.github.actions.name"="Deploy"
LABEL "com.github.actions.description"="Deploy just-news"
LABEL "com.github.actions.icon"="archive"
LABEL "com.github.actions.color"="orange"

LABEL "repository"="https://github.com/disjukr/just-news/actions/deploy"
LABEL "homepage"="https://github.com/disjukr/just-news/actions/deploy"
LABEL "maintainer"="JongChan Choi <jong+just.news@chan.moe>"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
