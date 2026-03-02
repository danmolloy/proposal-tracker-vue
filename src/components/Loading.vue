
<template>
  <div class="loader-container">
    <div class="spinner"></div>
    <p class="loader-text">Loading...</p>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  width: 100%;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 5px solid #f3f3f3; /* Light grey background */
  border-top: 5px solid oklch(62.3% 0.214 259.815); /* Your brand blue */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loader-text {
  margin-top: 1rem;
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>