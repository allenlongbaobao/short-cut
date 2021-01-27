clean:
	rm -rf _bundles lib lib-esm

build:
	make clean && tsc && tsc -m es6 --outDir lib-esm

copy:
	npx copyfiles -u 1 \"src/**/*.d.ts\" .
	cp -r ./src/style lib
	cp -r ./src/style lib-esm

pub:
	npx standard-version
	npm publish --access=public