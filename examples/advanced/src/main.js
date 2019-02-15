import Vue from 'vue';
import App from './App.vue';
import Vue2SimpleDatatable from '../../../dist/vue2-simple-datatable.min.js'

Vue.config.productionTip = false;

const config = {
  limit: 5,
  limits: [5, 42],
  regexSearch: true,
  exportButton: true
}
const i18n = {
  countPagedN: '{from} bis {to} von {count} Einträgen',
  countN: '{count} Einträge',
  count1: '1 Eintrag',
  count0: 'Keine Einträge',
  filterBy: 'Suche nach \'{column}\''
}
Vue.use(Vue2SimpleDatatable, {config, i18n})

new Vue({
  el: '#app',
  render: h => h(App)
})