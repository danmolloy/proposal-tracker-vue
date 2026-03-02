<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import Loading from './Loading.vue';
const baseURL = import.meta.env.VITE_BACKEND_URL;


const proposals = ref(null);
const role = ref(null);


const model = {
  Title: "Title",
  Description: "Description",
  Budget: "Budget",
  Status: "Status",
  CreatedAt: "Created At",
  LastUpdatedAt: "Last Updated",
  ReviewNotes: "Review Notes"
}

const statuses = [
  { text: 'Draft', value: 0 },
  { text: 'Submitted', value: 1 },
  { text: 'Approved', value: 2 },
  { text: 'Rejected', value: 3 }
];

onMounted(async () => {
  try {
    const response = await axios.get(`${baseURL}/proposals`);
    proposals.value = response.data.proposals; // Note the .value for refs
    console.log(JSON.stringify(response.data))
    role.value = response.data.role;
  } catch (error) {
    console.error("API Error:", error);

  }
})

const handleDelete = async (id) => {
  const conf =  confirm("Are you sure you want to delete this proposal?")
  if (conf) {
try {
    await axios.delete(`${baseURL}/proposals/delete/${id}`);
    proposals.value = proposals.value.filter(p => p.id !== id);

    console.log(`Proposal ${id} deleted successfully.`);
  } catch (error) {
    console.error("Delete Error:", error);
    alert("Could not delete the proposal.");
  }
  }

}

</script>

<template>
  <h1 v-if="role">{{ role == "Researcher" ? "Your Proposals" : "All Proposals" }}</h1>
   <RouterLink v-if="role == 'Researcher'" to="/create" class="btn">Create</RouterLink>
   
  <div v-if="!proposals">
    <Loading />
  </div>
  <div v-else-if="proposals.length === 0">
    <p>No data</p>
  </div>
  <div v-else class="card-grid">
  <div v-for="proposal in proposals" :key="proposal.id" class="card">
    <div class="card-header">
      <h3>{{ proposal.title }}</h3>
      <span :class="['status-badge', `status-${proposal.status}`]">
        {{ statuses.find(i => i.value == proposal.status).text }}
      </span>
    </div>

    <div class="card-body">
      <p class="description">{{ proposal.description }}</p>
      <div class="meta">
        <p><strong>Budget:</strong> ${{ proposal.budget.toLocaleString() }}</p>
        <p><strong>Created:</strong> {{ new Date(proposal.createdAt).toLocaleDateString() }}</p>
      </div>
      
      <div v-if="proposal.reviewNotes" class="review-notes">
        <strong>Notes:</strong> {{ proposal.reviewNotes }}
      </div>
    </div>

    <div class="card-footer">
      <div v-if="role == 'Admin'">
        <RouterLink :to="`/review/${proposal.id}`" class="btn-link">Review</RouterLink>
      </div>
      
      <div v-else class="actions">
        <RouterLink :to="`/detail/${proposal.id}`" class="btn-secondary">View</RouterLink>
        <RouterLink :to="`/edit/${proposal.id}`" class="btn-secondary">Edit</RouterLink>
        <button @click="handleDelete(proposal.id)" class="btn-danger">Delete</button>
      </div>
    </div>
  </div>
</div>
</template>

<style>
.card-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem 0;
  align-items: center;
  justify-content: center;
}

.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s;
  min-width: 20rem;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.status-badge {
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

/* Status Colors */
.status-0 { background: #e0e0e0; color: #666; } /* Draft */
.status-1 { background: #fff3cd; color: #856404; } /* Submitted */
.status-2 { background: #d4edda; color: #155724; } /* Approved */
.status-3 { background: #f8d7da; color: #721c24; } /* Rejected */

.card-body {
  flex-grow: 1;
}

.description {
  font-size: 0.9rem;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limits text to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1rem;
}

.meta {
  font-size: 0.85rem;
  border-top: 1px solid #eee;
  padding-top: 0.5rem;
}

.card-footer {
  margin-top: 1.5rem;
  display: flex;
  gap: 0.5rem;
}

.btn-danger {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}
</style>