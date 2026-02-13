<!-- <script setup>
import { ref } from 'vue';
import api from './services/api';
import ControlPanel from './components/ControlPanel.vue';
import FlowCanvas from './components/FlowCanvas.vue';
import LoadingOverlay from './components/LoadingOverlay.vue';
import NodeDetails from './components/NodeDetails.vue';

const flowData = ref(null);
const isLoading = ref(false);
const error = ref(null);
const selectedNode = ref(null);

/**
 * WHY: High-level orchestration of the crawl process.
 * Meets Requirement 5.3 (Sensible error handling).
 */
const handleStartCrawl = async (config) => {
  isLoading.value = true;
  error.value = null;
  selectedNode.value = null;

  try {
    const response = await api.startCrawl(config);
    flowData.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.error || "Connection to crawler service failed.";
  } finally {
    isLoading.value = false;
  }
};

const handleNodeClick = (node) => {
  selectedNode.value = node;
};
</script>

<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden">
    <ControlPanel :loading="isLoading" @start="handleStartCrawl" />

    <main class="flex-1 relative flex flex-col">
      <LoadingOverlay v-if="isLoading" />
      
      <div v-if="error" class="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-red-100 text-red-700 px-6 py-3 rounded-full shadow-lg border border-red-200 animate-bounce">
        {{ error }}
      </div>

      <FlowCanvas 
        v-if="flowData" 
        :data="flowData.data" 
        @node-click="handleNodeClick" 
      />

      <NodeDetails 
        v-if="selectedNode" 
        :node="selectedNode" 
        @close="selectedNode = null" 
      />

      <div v-if="!flowData && !isLoading" class="flex-1 flex items-center justify-center text-slate-400">
        <p class="text-lg">Ready to map. Enter a starting URL to begin.</p>
      </div>
    </main>
  </div>
</template> -->

<script setup>
import { ref } from 'vue';
import api from './services/api'; // Centralized API Service

// Components
import ControlPanel from './components/ControlPanel.vue';
import FlowCanvas from './components/FlowCanvas.vue';
import LoadingOverlay from './components/LoadingOverlay.vue';

// Reactive State
const loading = ref(false);
const crawlData = ref([]);

/**
 * Handle Start Crawl
 * This function is triggered by an event from ControlPanel.vue
 * @param {Object} payload - Data containing url, depth, and optional auth
 */
const handleStartCrawl = async (payload) => {
  // Reset state and show loader
  loading.value = true;
  crawlData.value = []; 

  try {
    // REQUIREMENT 5.2: Using the Service Layer for networking
    // This payload already contains 'credentials' if the user entered them
    const response = await api.startCrawl(payload);

    // REQUIREMENT 4: Passing data to visualization
    if (response && response.data) {
      crawlData.value = response.data;
    }
  } catch (error) {
    // REQUIREMENT 5.3: Sensible error handling (Formatted by api.js interceptor)
    console.error("Mapping Failed:", error);
    alert(error); 
  } finally {
    // Hide loader regardless of success or failure
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex h-screen bg-[#020617] font-sans antialiased text-slate-200 overflow-hidden">
    
    <ControlPanel 
      :loading="loading" 
      :nodeCount="crawlData.length" 
      @start-crawl="handleStartCrawl" 
    />

    <main class="flex-1 relative bg-[#020617]">
      <div class="absolute inset-0 opacity-10 pointer-events-none" 
           style="background-image: linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px); background-size: 50px 50px;">
      </div>

      <FlowCanvas 
        v-if="crawlData.length > 0" 
        :data="crawlData" 
      />
      
      <div v-else-if="!loading" class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="text-center space-y-4">
          <div class="text-indigo-500/20 animate-pulse">
            <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 20l-5.447-2.724A2 2 0 013 15.487V6a2 2 0 011.132-1.803l6-3a2 2 0 011.736 0l6 3A2 2 0 0119 6v9.487a2 2 0 01-1.553 1.948L12 20m0 0V10"></path>
            </svg>
          </div>
          <p class="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-600">
            Awaiting Target Domain Input
          </p>
        </div>
      </div>

      <LoadingOverlay v-if="loading" />
    </main>
    
  </div>
</template>

<style>
/* Global styles to ensure the app takes full viewport without scrolling */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  background-color: #020617;
  overflow: hidden;
}

/* Custom scrollbar for sidebar if needed */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 10px;
}
</style>