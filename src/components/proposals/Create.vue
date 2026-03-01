<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import axios from 'axios';
const baseURL = import.meta.env.VITE_BACKEND_URL;


const router = useRouter();

const title = ref("")
const description = ref("")
const budget = ref(0)

const submit = async () => {
  const vals = {
    title: title.value,
    description: description.value,
    budget: budget.value,
  }

  try {
    const response = await axios.post(`${baseURL}/proposals/create`, vals);
    console.log("Saved:", response.data);
    router.push("/");
  } catch (error) {
    console.error("API Error:", error);
    alert("Failed to submit proposal.");
  }

}

</script>

<template>
  <h1>Create</h1>
  <RouterLink to="/">Back to list</RouterLink>
  <div>
    <label >
      Title
      <input v-model="title" type="text" maxlength="200" />
    </label>
  </div>
  <div>
    <label for="description">
      Description
      <input 
        v-model="description"
        type="textarea" 
        max="2000" />
    </label>
  </div>
  <div>
    <label for="budget">
      Budget
      <input 
        v-model.number="budget"
        type="number" 
        min="0"
        max="10000000" />
    </label>
  </div>
  <div>
    <button @click="submit">Submit</button>
  </div>
   
</template>