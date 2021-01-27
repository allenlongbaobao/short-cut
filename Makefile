clean:
	rm -rf _bundles lib lib-esm

build:
	make clean && tsc && tsc -m es6 --outDir lib-esm

copy:
	cp src/type.d.ts lib
	cp src/type.d.ts lib-esm
	cp -r ./src/style lib
	cp -r ./src/style lib-esm
	cp _bundles/index.css lib
	cp _bundles/index.css lib-esm

pub:
	npx standard-version
	npm publish --access=public