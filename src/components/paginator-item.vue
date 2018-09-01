<template>
  <li v-bind:class="['page-item', { 'disabled': disabled === true }, { 'active': active === true }]">
    <a class="page-link" href="#" v-on:click="click">
      <slot></slot>
    </a>
  </li>
</template>

<script>
  export default {
    props: {
      active: Boolean,
      disabled: Boolean,
    },
    methods: {
      click(event) {
        event.preventDefault();
        this.$emit('click')
      }
    }
  }
</script>
