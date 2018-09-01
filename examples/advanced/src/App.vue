<template>
  <div class="container">
    <h1>
      <a class="text-dark" href="https://github.com/christiansiegel/vue2-simple-datatable">
        vue2-simple-datatable <i class="fab fa-github"></i>
      </a>
    </h1>
    <h2>Advanced Example</h2>

    <vue2-simple-datatable :data="data" :columns="columns" />
  </div>
</template>

<script>
import {persons} from '../../example-data.js'

export default {
  name: 'app',
  data: () => ({
    data: persons, // example-data.js
    columns: [ 'first', 'last', 'age' ]
  })
}
</script>
