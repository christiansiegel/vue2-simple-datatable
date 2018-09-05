import vue2SimpleDatatable from './components/vue2-simple-datatable.vue';

var Vue2SimpleDatatable = {
    install(Vue, options) {
        Vue.component('vue2-simple-datatable', Vue.extend({
            extends: vue2SimpleDatatable,
            mixins: [{
                created () {
                    if(options) {
                        this.config = Object.assign(this.config, options.config)
                        this.i18n = Object.assign(this.i18n, options.i18n)
                    }
                }
            }]
        }))
    }
};

export default Vue2SimpleDatatable;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Vue2SimpleDatatable)
}
