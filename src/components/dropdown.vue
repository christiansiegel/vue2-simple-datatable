<template>
  <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" :id="buttonId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{ current }}
    </button>
    <div class="dropdown-menu" :aria-labelledby="buttonId">
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
    data() {
      return {
        buttonId: 'dropdownMenuButton-' + this._uid
      }
    },
    methods: {
      select(item, event) {
        event.preventDefault();
        this.$emit('select', item)
      }
    }
  }
</script>
