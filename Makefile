clean:
	rm -rf _bundles lib lib-esm

# 依次执行一下命令
build:
	make clean && tsc && tsc -m es6 --outDir lib-esm

webpack:
	yarn webpack

copy:
	cp -r ./src/style lib
	cp -r ./src/style lib-esm
	cp _bundles/index.css lib
	cp _bundles/index.css lib-esm

pub:
	npx standard-version
	npm publish --access=public

runner:
	make build
	make webpack
	make copy