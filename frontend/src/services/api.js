// import axios from 'axios';
//   // Centralizing API calls ensures consistent error handling and timeout management.
//   // Base URL points to the Node.js backend created in Step 2.3.
// const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
//   timeout: 60000, // Long timeout for deep crawling processes
// });

// export default {
  
//   //REASONING: Wraps the crawl request in a clean async function.
//   async startCrawl(payload) {
//     return apiClient.post('/crawl', payload);
//   }
// };


import axios from 'axios';

/**
 * AXIOS INSTANCE CONFIGURATION
 * Centralizing API calls ensures consistent error handling and timeout management.
 * Requirement 5.1: Clean and maintainable code.
 */
const apiClient = axios.create({
  // Requirement 5.2: Environment-agnostic URL configuration
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  
  // Requirement 2.5: Long timeout for deep crawling processes (up to 60 seconds)
  timeout: 60000, 
  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/**
 * GLOBAL INTERCEPTORS (Optional but Professional)
 * Automatically formats errors so that App.vue doesn't have to parse them.
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Requirement 5.3: Sensible error handling for failed requests
    const message = error.response?.data?.error || error.message || "Network connection failed";
    console.error("[API Service Error]:", message);
    return Promise.reject(message);
  }
);

export default {
  /**
   * START CRAWL
   * Wraps the crawl request in a clean async function.
   * @param {Object} payload - Includes url, maxDepth, and optional credentials.
   */
  async startCrawl(payload) {
    try {
      // Logic: Requirement 1.2 - Passing payload containing credentials to /crawl endpoint
      const response = await apiClient.post('/crawl', payload);
      return response.data;
    } catch (error) {
      // Re-throwing formatted error to be caught by App.vue
      throw error;
    }
  },

  /**
   * Health Check (Optional)
   * To verify if the backend server is reachable.
   */
  async checkStatus() {
    return apiClient.get('/status');
  }
};