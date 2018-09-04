<template>
  <div class="container">
    <h1>
      <a class="text-dark" href="https://github.com/christiansiegel/vue2-simple-datatable">
        vue2-simple-datatable <i class="fab fa-github"></i>
      </a>
    </h1>
    <h2>Advanced Example</h2>
    <pre>initialSearch: {{ JSON.stringify(initialSearch) }}</pre>
    <vue2-simple-datatable :data="data" :columns="columns" :initial-search="initialSearch"/>
  </div>
</template>

<script>
import {manyPersons} from '../../example-data.js'

export default {
  name: 'app',
  data: () => ({
    data: manyPersons(10000), // example-data.js
    columns: [ 'first', 'last', 'age' ],
    initialSearch: {
      first: 'bert',
      last: '^A'
    }
  })
}
</script>
