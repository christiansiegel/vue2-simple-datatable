import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify';

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/vue2-simple-datatable.min.js',
        format: 'umd',
        name: 'vue2-simple-datatable',
        sourcemap: true
    },
    plugins: [
        resolve(),
        vue(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            presets: ['es2015-rollup']
        }),
        uglify({
            output: {
                comments: 'all'
            }
        })
    ]
}
