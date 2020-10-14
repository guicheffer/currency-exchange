# This is authority from @guicheffer | guicheffer.me

PKG:=yarn

help:
	@echo
	@echo "✍🏽  Please use 'make <target>' where <target> is one of the commands below:"
	@echo
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e "s/\\$$//" | sed -e "s/##//"
	@echo

# ------------------------------------------------------------------------------------ #

install: ## install stuff
	$(PKG) install

start: ## start development
	make install
	$(PKG) start

serve: ## build environment based
	make install
	$(PKG) build
	$(PKG) serve

i: install
dev: start

deploy: serve
build: serve
prod: serve
production: prod

test: test-stuff
test-stuff: ## test stuff
	$(PKG) test
