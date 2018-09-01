<template>
  <nav>
    <ul class="pagination justify-content-center">
      <paginator-item :disabled="currentChunk <= 0" v-on:click="first">
        <i class="fas fa-angle-double-left"></i>
      </paginator-item>
      <paginator-item :disabled="current <= 0" v-on:click="decrease">
        <i class="fas fa-angle-left"></i>
      </paginator-item>
      <paginator-item v-for="item in items" :key="item" :active="item === current" v-on:click="select(item)">
        {{ item + 1 }}
      </paginator-item>
      <paginator-item :disabled="current >= total - 1" v-on:click="increase">
        <i class="fas fa-angle-right"></i>
      </paginator-item>
      <paginator-item :disabled="currentChunk >= totalChunks - 1" v-on:click="last">
        <i class="fas fa-angle-double-right"></i>
      </paginator-item>
    </ul>
  </nav>
</template>

<script>
  import PaginatorItem from './paginator-item.vue'

  export default {
    components: {
      'paginator-item': PaginatorItem
    },
    props: {
      total: Number,
      current: Number
    },
    data: () => ({
      chunkSize: 10,
    }),
    computed: {
      totalChunks: function () {
        return Math.ceil(this.total / this.chunkSize)
      },
      currentChunk: function () {
        return Math.floor(this.current / this.chunkSize)
      },
      items: function () {
        const first = this.currentChunk * this.chunkSize
        const len = (first + this.chunkSize) > this.total ? this.total - first : this.chunkSize
        return Array(len).fill(0).map((e,i)=>first + i)
      }
    },
    methods: {
      select: function (item) {
        this.$emit('select', item)
      },
      increase: function (event) {
        this.$emit('select', this.current + 1)
      },
      decrease: function (event) {
        this.$emit('select', this.current - 1)
      },
      first: function (event) {
        this.$emit('select', 0)
      },
      last: function (event) {
        this.$emit('select', this.total - 1)
      }
    }
  }
</script>
