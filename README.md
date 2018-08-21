# vue2-simple-datatable

A simple, basic, fast DataTable Component Vue.js 2.0.

## Installation

- #### With Modules

  ``` js
  import Vue from 'vue'
  import Vue2SimpleDatatable from 'vue2-simple-datatable'
  Vue.use(Vue2SimpleDatatable)
  ```

- #### `<script>` Include

  Just include `./dist/vue2-simple-datatable.min.js` after Vue itself.

## Usage

``` html
<vue2-simple-datatable :data="data" :columns="columns" />
```

``` js
export default {
  data: () => ({
    data: [
      { 'a': 1, 'b': 'z' },
      { 'a': 2, 'b': 'y' },
      { 'a': 3, 'b': 'x' }
    ],
    columns: [ 'a', 'b' ]
  })
}
```

### i18n

``` js
const i18n = {
    countPagedN: '{from} bis {to} von {count} Einträgen',
    countN: '{count} Einträge',
    count1: '1 Eintrag',
    count0: 'Keine Einträge',
    filterBy: 'Suche nach \'{column}\''
}
Vue.use(Vue2SimpleDatatable, {i18n})
```

## License

[MIT](http://opensource.org/licenses/MIT)
