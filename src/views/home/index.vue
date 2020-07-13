<template>
  <div>
    <list-todos />
    <router-view />
  </div>
</template>

<script>
import ListTodos from './components/listTodos'

export default {
  name: 'Home',
  components: {
    ListTodos
  },
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
