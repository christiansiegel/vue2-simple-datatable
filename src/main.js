import vue2SimpleDatatable from './components/vue2-simple-datatable.vue';

var Vue2SimpleDatatable = {
    install(Vue, options) {
        if(options) {
            let data = vue2SimpleDatatable.data()
            Object.assign(data.i18n, options.i18n);
            Object.assign(data.config, options.config);
            vue2SimpleDatatable.data = () => (data)
        }
        Vue.component('vue2-simple-datatable', vue2SimpleDatatable)
    }
};

export default Vue2SimpleDatatable;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Vue2SimpleDatatable)
}
