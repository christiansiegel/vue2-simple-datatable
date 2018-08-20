/**
 * vue2-simple-datatable (https://github.com/christiansiegel/vue2-simple-datatable)
 * 
 * Copyright (c) 2018 Christian Siegel
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import vue2SimpleDatatable from './components/vue2-simple-datatable.vue';

var Vue2SimpleDatatable = {
    install(Vue, options) {
        if(options) {
            let data = vue2SimpleDatatable.data()
            Object.assign(data, options);
            vue2SimpleDatatable.data = () => (data)
        }
        Vue.component('vue2-simple-datatable', vue2SimpleDatatable)
    }
};

export default Vue2SimpleDatatable;

if (typeof window !== 'undefined') {
    if (window.Vue) {
        window.Vue.use(Vue2SimpleDatatable)
    } else {
        window.Vue2SimpleDatatable = Vue2SimpleDatatable
    }
}
