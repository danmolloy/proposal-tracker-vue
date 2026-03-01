<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
const baseURL = import.meta.env.VITE_BACKEND_URL;


const route = useRoute();
const proposal = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get(`${baseURL}proposals/detail/${route.params.id}`);
    console.log(JSON.stringify(response))
        proposal.value = response.data;

  } catch (error) {
    console.error("API Error:", error);

  }
}) 
</script>

<template>
  
  <div v-if="proposal">
    
    <h1>Proposal <!-- {{ $route.params.id }} --> </h1>
    
    <div>
      <p>Title:</p>
      <p>{{ proposal.title }}</p>
    </div>
    <div>
      <p>Description:</p>
      <p>{{ proposal.description }}</p>
    </div>
    <div>
      <p>Budget:</p>
      <p>{{ proposal.budget }}</p>
    </div>
    <RouterLink to="/">Back to list</RouterLink>
  </div>
  <div v-else>
    <p>Loading proposal details...</p>
  </div>
</template>