import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {uglify} from 'rollup-plugin-uglify';
import license from 'rollup-plugin-license';

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/vue2-simple-datatable.min.js',
        format: 'umd',
        name: 'vue2-simple-datatable',
        sourcemap: true
    },
    plugins: [
        vue(),
        buble(),
        nodeResolve({
            browser: true,
            jsnext: true,
            main: true
        }),
        commonjs(),
        uglify(),
        license({
            banner: `
                <%= pkg.name %>
                Copyright (c) <%= moment().format('YYYY') %> Christian Siegel
                Licensed under the <%= pkg.license %> license

                Version: <%= pkg.version %>
                Generated: <%= moment().format('YYYY-MM-DD') %>

                Homepage: <%= pkg.homepage %>`
        })
    ]
}
