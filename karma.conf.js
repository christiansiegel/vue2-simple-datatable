const replace = require('rollup-plugin-replace')
const vue = require('rollup-plugin-vue').default
const buble = require('rollup-plugin-buble')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

const name = require('./package.json').name

function camelize(name) {
  return name.replace(/-([a-z])/g, g => g[1].toUpperCase())
}

module.exports = function (config) {
  config.set({
    files: [
      {
        pattern: 'src/**/*.spec.js',
        watched: false
      }
	],
	frameworks: ['jasmine'],
	browsers: ['ChromeHeadless'],
    preprocessors: {
      'src/**/*.spec.js': ['rollup']
    },
    rollupPreprocessor: {
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        vue(),
        buble(),
        nodeResolve({
          browser: true,
          jsnext: true,
          main: true
        }),
        commonjs({
          namedExports: {
            '@vue/test-utils': [
              'shallowMount'
            ]
          }
        })
      ],
      output: {
        format: 'iife',
        name: camelize(name),
        sourcemap: 'inline'
      }
	}
  })
}