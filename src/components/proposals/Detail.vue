<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
const baseURL = import.meta.env.VITE_BACKEND_URL;


const route = useRoute();
const proposal = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get(`${baseURL}/proposals/detail/${route.params.id}`);
    console.log(JSON.stringify(response))
        proposal.value = response.data;

  } catch (error) {
    console.error("API Error:", error);

  }
}) 
</script>

<template>
  
  <div v-if="proposal" class="review-container">
    <div class="header-actions">

      <h1>Proposal <!-- {{ $route.params.id }} --> </h1>
          <RouterLink to="/" class="back-link">Back to list</RouterLink>

    </div>
    <div class="form">

    <div class="proposal-preview">
      <div class="info-group">
          <label>Title</label>
          <p class="static-text">{{ proposal.title }}</p>
        </div>
      <div class="info-group">
          <label>Description</label>
          <p class="static-text">{{ proposal.description }}</p>
        </div>

        <div class="info-group">
          <label>Submitted Budget</label>
          <p class="static-text">${{ proposal.budget.toLocaleString() }}</p>
        </div>
        </div></div>

  </div>
  <div v-else>
    <p>Loading proposal details...</p>
  </div>
</template>