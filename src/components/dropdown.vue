<template>
  <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{ current }}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" v-for="item in items" :key="item" href="#" v-on:click="select(item, $event)">
        {{ item }}
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      items: Array,
      current: Number,
    },
    methods: {
      select(item, event) {
        event.preventDefault();
        this.$emit('select', item)
      }
    }
  }
</script>
