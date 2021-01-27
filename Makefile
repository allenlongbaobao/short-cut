clean:
	rm -rf _bundles lib lib-esm

build:
	make clean && tsc && tsc -m es6 --outDir lib-esm

pub:
	make build
	npx standard-version
	yarn copy-dts
	npm publish --access=public