clean:
	rm -rf _bundles lib lib-esm

# 依次执行一下命令
build:
	make clean && tsc && tsc -m es6 --outDir lib-esm --noEmit

webpack:
	yarn webpack

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