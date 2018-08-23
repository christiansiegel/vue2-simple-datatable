<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li v-bind:class="['page-item', { 'disabled': currentChunk <= 0 }]">
        <a class="page-link" href="#" v-on:click="first" aria-label="First">
          <span aria-hidden="true"><i class="fa fa-angle-double-left"></i></span>
        </a>
      </li>
      <li v-bind:class="['page-item', { 'disabled': current <= 0 }]">
        <a class="page-link" href="#" v-on:click="decrease" aria-label="Previous">
          <span aria-hidden="true"<i class="fa fa-angle-left"></i></span>
        </a>
      </li>
      <li v-bind:class="['page-item', { 'active': item === current }]" v-for="item in items" :key="item">
        <a class="page-link" href="#" v-on:click="select(item, $event)">{{ item + 1 }}</a>
      </li>
      <li v-bind:class="['page-item', { 'disabled': current >= total - 1 }]">
        <a class="page-link" href="#" v-on:click="increase" aria-label="Next">
          <span aria-hidden="true"><i class="fa fa-angle-right"></i></span>
        </a>
      </li>
      <li v-bind:class="['page-item', { 'disabled': currentChunk >= totalChunks - 1 }]">
        <a class="page-link" href="#" v-on:click="last" aria-label="Last">
          <span aria-hidden="true"><i class="fa fa-angle-double-right"></i></span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
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
      select: function (item, event) {
        event.preventDefault();
        this.$emit('select', item)
      },
      increase: function (event) {
        event.preventDefault();
        this.$emit('select', this.current + 1)
      },
      decrease: function (event) {
        event.preventDefault();
        this.$emit('select', this.current - 1)
      },
      first: function (event) {
        event.preventDefault();
        this.$emit('select', 0)
      },
      last: function (event) {
        event.preventDefault();
        this.$emit('select', this.total - 1)
      }
    }
  }
</script>
