<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { RouterLink,  useRouter, useRoute } from 'vue-router';
import Loading from '../Loading.vue';
const baseURL = import.meta.env.VITE_BACKEND_URL;


const route = useRoute();
const router = useRouter();
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

const submit = async () => {
  try {
    const response = await axios.patch(`${baseURL}/proposals/edit`, proposal.value);
    console.log("Saved:", response.data);
    router.push("/");
  } catch (error) {
    console.error("API Error:", error);
    alert("Failed to update proposal.");
  }
}

</script>

<template>
  <div v-if="!proposal">
    <Loading />
  </div>
  <div v-else>

  <h1>Edit Proposal</h1>
  <RouterLink to="/">Back to list</RouterLink>
  <div>
    <label >
      Title
      <input 
        v-model="proposal.title"
        type="text" 
        max="50" />
    </label>
  </div>
  <div>
    <label >
      Description
      <input 
        v-model="proposal.description"
        type="text" 
        max="50" />
    </label>
  </div>
  <div>
    <label >
      Budget
      <input 
        v-model.number="proposal.budget"
        min="0"
        max="10000000" />
    </label>
  </div>
  <div>
    <button @click="submit">Submit</button>
  </div>
     </div>

</template>