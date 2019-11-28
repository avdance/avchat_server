#!/bin/bash

export PATH=$PATH:/usr/local/node12/bin

/usr/local/node12/bin/tsc -c --build tsconfig.json
/usr/local/node12/bin/tslint -c tslint.json 'src/**/*.ts'
