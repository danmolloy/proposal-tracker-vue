<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import Loading from '../Loading.vue';

const baseURL = import.meta.env.VITE_BACKEND_URL;
const route = useRoute();
const router = useRouter();

const proposal = reactive({
  id: null,
  title: '',
  description: '',
  budget: 0
});

const loading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get(`${baseURL}/proposals/detail/${route.params.id}`);
    Object.assign(proposal, response.data); // reactive assignment
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    loading.value = false;
  }
});

const submit = async () => {
  try {
    const response = await axios.patch(`${baseURL}/proposals/edit`, proposal);
    console.log("Saved:", response.data);
    router.push("/");
  } catch (error) {
    console.error("API Error:", error);
    alert("Failed to update proposal.");
  }
};
</script>

<template>
  <div v-if="loading">
    <Loading />
  </div>

  <div v-else class="form">
    <h1>Edit Proposal</h1>
    <RouterLink to="/">Back to list</RouterLink>

    <input
      v-model="proposal.title"
      placeholder="Title"
      type="text"
      maxlength="200"
      class="input"
    />

    <textarea
      v-model="proposal.description"
      placeholder="Description"
      maxlength="2000"
      class="input"
    ></textarea>

    <input
      v-model.number="proposal.budget"
      placeholder="Budget"
      type="number"
      min="0"
      max="10000000"
      class="input"
    />

    <button @click="submit" class="btn">Submit</button>
  </div>
</template>