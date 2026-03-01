<script setup>
import Layout from './components/Layout.vue';

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const search = computed({
  get() {
    return route.query.search ?? ''
  },
  set(search) {
    router.replace({ query: { search } })
  },
})


</script>

<template>
  <Layout>
   <router-view />
  </Layout>
</template>

<style scoped>

</style>
