# vue2-simple-datatable
[![Build Status](https://travis-ci.org/christiansiegel/vue2-simple-datatable.svg?branch=master)](https://travis-ci.org/christiansiegel/vue2-simple-datatable)

A simple, basic, fast DataTable Component for Vue.js 2.0.

## Examples

### Basic

[Demo](https://christiansiegel.github.io/vue2-simple-datatable/examples/basic/)\
[Source](examples/basic)

### Advanced

[Demo](https://christiansiegel.github.io/vue2-simple-datatable/examples/advanced/dist)\
[Source](examples/advanced)

## Required Dependencies 

- [Vue 2](https://vuejs.org/)
- [Bootstrap 4](https://getbootstrap.com/)
- [Font Awesome 5](https://fontawesome.com/)

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
<vue2-simple-datatable :data="data" :columns="columns" initial-search="initialSearch" />
```

``` js
export default {
  data: () => ({
    data: [
      { 'a': 1, 'b': 'z' },
      { 'a': 2, 'b': 'y' },
      { 'a': 3, 'b': 'x' }
    ],
    columns: [ 'a', 'b' ],

    // optional:
    initialSearch: {
      b: 'y'
    }
  })
}
```

### Custom columns

Columns can be customized via named scoped slots. The following example renders column `a` with italic and column `b` with bold font.

``` html
<vue2-simple-datatable :data="data" :columns="columns">
  <template slot="a" slot-scope="{value}">
    <em>{{ value }}</em>
  </template>
  <template slot="b" slot-scope="{value}">
    <b>{{ value }}</b>
  </template>
</vue2-simple-datatable>
```

### Config & i18n

``` js
const config = {
    limit: 25,             // initial rows per page limit (default: 10)

    limits: [25, 50, 100], // rows per page limit options, or 'undefined' to
                           // hide dropdown (default: [10, 25, 50, 100])

    regexSearch: true      // enable regex in search (default: false)
}
const i18n = {
    countPagedN: '{from} bis {to} von {count} Einträgen',
    countN: '{count} Einträge',
    count1: '1 Eintrag',
    count0: 'Keine Einträge',
    filterBy: 'Suche nach \'{column}\''
}
Vue.use(Vue2SimpleDatatable, {config, i18n})
```

## License

[MIT](http://opensource.org/licenses/MIT)
