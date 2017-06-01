#!/usr/bin/env bash

mkdir -p ./scripts ./styles

# Transpiles code to es5
./node_modules/browserify/bin/cmd.js ./source/scripts/* -t [ babelify --presets [ es2015 ] --compact='false' ] -o ./scripts/bundle.js

# Minifies transpiled code
./node_modules/uglifyjs/bin/uglifyjs --compress --mangle --output ./scripts/bundle.min.js -- ./scripts/bundle.js

# Compiles and compresses sass to css
for file in ./source/styles/*
do
  ./node_modules/node-sass/bin/node-sass --output-style=compressed "$file" -o ./styles
done

# Compresses HTML files
for file in ./source/views/*
do
  ./node_modules/html-minifier/cli.js --remove-comments --collapse-whitespace "$file" -o ./$(basename "$file")
done
