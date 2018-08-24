const vue = require('rollup-plugin-vue').default
const buble = require('rollup-plugin-buble')

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
        vue(),
        buble()
      ],
      output: {
        format: 'iife',
        name: camelize(name),
        sourcemap: 'inline'
      }
	}
  })
}