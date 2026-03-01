<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import axios from 'axios';
const baseURL = import.meta.env.VITE_BACKEND_URL;

const router = useRouter();

const title = ref("");
const description = ref("");
const budget = ref(0);

const submit = async () => {
  const vals = {
    title: title.value,
    description: description.value,
    budget: budget.value,
  };

  try {
    const response = await axios.post(`${baseURL}/proposals/create`, vals);
    console.log("Saved:", response.data);
    router.push("/");
  } catch (error) {
    console.error("API Error:", error);
    alert("Failed to submit proposal.");
  }
};
</script>

<template>
  <div class="form">
    <h1>Create</h1>
    <RouterLink to="/">Back to list</RouterLink>

    <input
      v-model="title"
      placeholder="Title"
      type="text"
      maxlength="200"
      class="input"
    />

    <textarea
      v-model="description"
      placeholder="Description"
      maxlength="2000"
      class="input"
    ></textarea>

    <input
      v-model.number="budget"
      placeholder="Budget"
      type="number"
      min="0"
      max="10000000"
      class="input"
    />

    <button @click="submit" class="btn">Submit</button>
  </div>
</template>