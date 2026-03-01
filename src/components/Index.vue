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
    const response = await axios.get(`${baseURL}proposals`);
    proposals.value = response.data.proposals; // Note the .value for refs
    role.value = response.data.user.role;
  } catch (error) {
    console.error("API Error:", error);

  }
})

const handleDelete = async (id) => {
  const conf =  confirm("Are you sure you want to delete this proposal?")
  if (conf) {
try {
    await axios.delete(`${baseURL}proposals/delete/${id}`);
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
  <h1 v-if="role">Welcome, {{ role.toLowerCase() }}</h1>
   <RouterLink v-if="role == 'Researcher'" to="/create">Create</RouterLink>
   
  <div v-if="!proposals">
    <Loading />
  </div>
  <div v-else-if="proposals.length === 0">
    <p>No data</p>
  </div>
  <div  v-else>
    {{ JSON.stringify(user) }}
    <table>
      <thead>
        <tr>
          <th>{{ model.Title }}</th>
          <th>{{ model.Description }}</th>
          <th>{{ model.Budget }}</th>
          <th>{{ model.Status }}</th>
          <th>{{ model.CreatedAt }}</th>
          <th>{{ model.LastUpdatedAt }}</th>
          <th>{{ model.ReviewNotes }}</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proposal in proposals" :key="proposal.id">
          <td>{{ proposal.title }}</td>
                    <td>{{ proposal.description }}</td>
          <td>{{ proposal.budget }}</td>
                    <td>{{ statuses.find(i => i.value == proposal.status).text }}</td>
          <td>{{ proposal.createdAt }}</td>
          <td>{{ proposal.lastUpdatedAt }}</td>
          <td>{{ proposal.reviewNotes }}</td>
          <td v-if="role == 'Admin'">
            <RouterLink  :to="`/review/${proposal.id}`">Review</RouterLink>
          </td>
          <td v-else>

            <RouterLink :to="`/detail/${proposal.id}`">View</RouterLink>
            <RouterLink :to="`/edit/${proposal.id}`">Edit</RouterLink>
            <button @click="handleDelete(proposal.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
</template>