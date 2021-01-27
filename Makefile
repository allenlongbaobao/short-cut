clean:
	rm -rf _bundles lib lib-esm

build:
	make clean && tsc && tsc -m es6 --outDir lib-esm

copy:
	npx copyfiles -u 1 \"src/**/*.d.ts\" .
	cp -r ./src/style lib
	cp -r ./src/style lib-esm
	cp _bundles/index.css lib
	cp _bundles/index.css lib-esm

pub:
	npx standard-version
	npm publish --access=public