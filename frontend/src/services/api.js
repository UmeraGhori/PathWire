import axios from 'axios';

  // Centralizing API calls ensures consistent error handling and timeout management.
  // Requirement 5.1: Clean and maintainable code.

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
   
  async startCrawl(payload) {
    try {
      // Logic: Requirement 1.2 - Passing payload containing credentials to /crawl endpoint
      const response = await apiClient.post('/crawl', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //  To verify if the backend server is reachable.
  async checkStatus() {
    return apiClient.get('/status');
  }
};