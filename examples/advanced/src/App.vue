<template>
  <div class="container">
    <h1>Advanced Example</h1>
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
