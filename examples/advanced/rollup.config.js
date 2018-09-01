import path from 'path'
import replace from 'rollup-plugin-replace'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import {uglify} from 'rollup-plugin-uglify';

export default {
  input: path.join(__dirname, './src/main.js'),
  output: {
    file: path.join(__dirname, './dist/app.min.js'),
    format: 'umd',
    name: 'app',
    sourcemap: false
  },
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
    commonjs(),
    uglify()
  ]
}
