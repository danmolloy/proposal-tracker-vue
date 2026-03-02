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
  <div v-else class="review-container">
    <div class="header-actions">

      <h1>Review Proposal</h1>
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
    </div>

    <hr class="divider" />

  <div class="form-el">
        <div class="input-group">
          <label for="status">Change Status</label>
          <select id="status" v-model.number="proposal.status" class="input select-input">
            <option v-for="s in statuses" :key="s.value" :value="s.value">
              {{ s.text }}
            </option>
          </select>
        </div>

        <div class="input-group">
          <label for="notes">Review Notes</label>
          <textarea 
            id="notes"
            v-model="proposal.reviewNotes" 
            placeholder="Provide feedback or reasons for approval/rejection..."
            class="input textarea-input"
          ></textarea>
        </div>

        <button @click="submit" class="btn">Update Proposal</button>
      </div>
    </div>
  </div>
</template>

<style>
.review-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.back-link {
  text-decoration: none;
  color: #666;
  font-size: 0.9rem;
}

.proposal-preview {
  width: 100%;
  text-align: left;
  margin-bottom: 1rem;
}

.info-group {
  margin-bottom: 1.25rem;
}

.info-group label {
  display: block;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 4px;
}

.static-text {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  border-left: 3px solid oklch(62.3% 0.214 259.815);
  margin: 0;
  color: #333;
}

.divider {
  width: 100%;
  border: 0;
  border-top: 1px solid #eee;
  margin: 1.5rem 0;
}

.input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.input-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.select-input {
  width: 100%;
  height: 2.5rem;
  background-color: white;
}

.textarea-input {
  width: 100%;
  min-height: 120px;
  font-family: inherit;
  resize: vertical;
}
</style>