FROM node:9
LABEL "version"="0.0.7"
LABEL "com.github.actions.name"="Deploy"
LABEL "com.github.actions.description"="Deploy just-news"
LABEL "com.github.actions.icon"="archive"
LABEL "com.github.actions.color"="orange"

LABEL "repository"="https://github.com/disjukr/just-news/actions/deploy"
LABEL "homepage"="https://github.com/disjukr/just-news/actions/deploy"
LABEL "maintainer"="item4 <item4@localhost.com>"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

