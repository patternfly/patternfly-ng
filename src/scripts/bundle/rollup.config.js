// See: https://hackernoon.com/how-to-create-library-in-angular-2-and-publish-to-npm-from-scratch-f2b1272d6266
'use strict';

const commonjs = require('rollup-plugin-commonjs');
const fs = require('fs-extra');
const resolve = require('rollup-plugin-node-resolve');
const rollup = require('rollup');

export const LIB_NAME = 'patternfly-ng';
export const PATH_SRC = 'dist/app/';
export const PATH_DIST = 'dist/bundles/';

export const config = {
  input: PATH_SRC + 'index.js',
  output: {
    name: LIB_NAME,
    sourcemap: true
  },
  plugins: [
    resolve({
      main: true,
      module: true
    }),
    commonjs({
      include: 'node_modules/**',
      // See: https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports
      namedExports: {
        'node_modules/c3/c3.js': [
          'generate'
        ],
        'node_modules/d3/d3.js': [
          'select'
        ],
        'node_modules/lodash/lodash.js': [
          'clone',
          'cloneDeep',
          'defaults',
          'defaultsDeep',
          'filter',
          'find',
          'get',
          'isEqual',
          'merge',
          'orderBy',
          'remove',
          'size',
          'uniqueId'
        ],
        '@swimlane/ngx-datatable': [
          'DatatableComponent',
          'NgxDatatableModule'
        ]
      }
    })
  ],
  onwarn: warning => {
    const skip_codes = [
      'THIS_IS_UNDEFINED',
      'MISSING_GLOBAL_NAME'
    ];
    if (skip_codes.indexOf(warning.code) != -1) return;
    console.error(warning);
  }
};
