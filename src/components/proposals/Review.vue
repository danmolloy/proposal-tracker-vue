<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { RouterLink,  useRouter, useRoute } from 'vue-router';
import Loading from '../Loading.vue';
const baseURL = import.meta.env.VITE_BACKEND_URL;


const route = useRoute();
const router = useRouter();
const proposal = ref(null);

const statuses = [
  { text: 'Draft', value: 0 },
  { text: 'Submitted', value: 1 },
  { text: 'Approved', value: 2 },
  { text: 'Rejected', value: 3 }
];

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
    const response = await axios.patch(`${baseURL}/proposals/review`, proposal.value);
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

  <h1>Review Proposal</h1>
  <RouterLink to="/">Back to list</RouterLink>
  <div class="proposal-info">
      <p><strong>Title:</strong> {{ proposal.title }}</p>
      <p><strong>Description:</strong> {{ proposal.description }}</p>
    </div>

  <div>
      <label>
        Change Status
        <select v-model.number="proposal.status">
          <option v-for="s in statuses" :key="s.value" :value="s.value">
            {{ s.text }}
          </option>
        </select>
      </label>
    </div>
    <div>
      <label>
        Review Notes
        <textarea v-model="proposal.reviewNotes" rows="4" cols="50"></textarea>
      </label>
    </div>
  <div>
    <button @click="submit">Submit</button>
  </div>
</div>
</template>