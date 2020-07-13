<template>
  <section id="app-wrapper">
    <app-header />
    <router-view />
    <app-footer />
  </section>
</template>

<script>
import { AppHeader, AppFooter } from './components'

export default {
  name: 'Layout',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
