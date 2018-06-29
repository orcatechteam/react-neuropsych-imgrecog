mkdir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

all: build
publish: build
	npm publish
watch: test
	$(mkdir)node_modules/.bin/webpack --config $(mkdir)webpack.config.js --progress --colors -w
build: test
	$(mkdir)node_modules/.bin/webpack --config $(mkdir)webpack.config.js --progress --colors
serve:
	$(mkdir)node_modules/.bin/live-server --port=8081 --host=0.0.0.0 --no-browser $(mkdir)dist
serve_test:
	$(mkdir)node_modules/.bin/live-server --port=8081 --host=0.0.0.0 --no-browser $(mkdir)dist/test
test: lint
	#	TODO testing with jest
lint: clean
	$(mkdir)node_modules/.bin/eslint $(mkdir)src --fix
clean:
	mkdir -p $(mkdir)dist
	rm -f $(mkdir)dist/test/*.js
	rm -f $(mkdir)dist/*.js
