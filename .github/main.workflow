workflow "Test and deploy" {
  on = "push"
  resolves = ["Build and deploy"]
}

action "Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Run testcases" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install"]
  args = "test"
}

action "Only master" {
  uses = "actions/bin/filter@25b7b846d5027eac3315b50a8055ea675e2abd89"
  needs = ["Run testcases"]
  args = "branch master"
}

action "Build and deploy" {
  uses = "./actions/deploy"
  needs = ["Only master"]
  secrets = ["GITHUB_TOKEN"]
}
