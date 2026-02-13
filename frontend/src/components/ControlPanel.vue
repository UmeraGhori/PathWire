<script setup>
import { ref } from 'vue';

const props = defineProps({
  loading: Boolean,
  nodeCount: Number
});

const emit = defineEmits(['start-crawl']);

const startUrl = ref('https://foreai.co/');
const depth = ref(2);
const errorMessage = ref(''); // Validation state
const auth = ref({ username: '', password: '' });

const validateAndStart = () => {
  errorMessage.value = '';

  // Basic Empty Check
  if (!startUrl.value) {
    errorMessage.value = "URL is required to start mapping.";
    return;
  }

  // Format Validation (Regex)
  const urlPattern = new RegExp(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/);
  if (!urlPattern.test(startUrl.value)) {
    errorMessage.value = "Please enter a valid URL (e.g., https://example.com)";
    return;
  }

  // Emit if all good
  emit('start-crawl', {
    url: startUrl.value,
    maxDepth: depth.value,
    credentials: auth.value.username ? { ...auth.value } : null
  });
};
</script>

<template>
  <aside class="w-80 bg-[#0f172a]/40 backdrop-blur-2xl border-r border-white/5 flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.5)] z-20">
    <div class="p-8">
      <div class="flex items-center gap-4 mb-12">
        <div class="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h1 class="text-2xl font-black tracking-tighter italic bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">PathWire</h1>
      </div>

      <div class="space-y-8">
        <div>
          <label class="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400 mb-3 block">Target Domain</label>
          <input v-model="startUrl" 
                 :class="errorMessage ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 bg-slate-900/60'"
                 class="w-full border rounded-2xl px-5 py-4 text-sm focus:border-indigo-500 transition-all outline-none" 
                 placeholder="https://..." />
          <p v-if="errorMessage" class="text-[10px] text-red-400 mt-2 font-medium tracking-wide italic">
            ⚠️ {{ errorMessage }}
          </p>
        </div>

        <div>
          <label class="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400 mb-4 block">Depth Analysis</label>
          <div class="flex bg-slate-900/80 p-1.5 rounded-2xl border border-white/5">
            <button v-for="d in [1,2,3]" :key="d" @click="depth = d" 
              :class="depth === d ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'"
              class="flex-1 py-2.5 rounded-xl text-xs font-black transition-all">{{ d }}</button>
          </div>
        </div>

        <div>
          <label class="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Authentication (Optional)</label>
          <div class="mt-2 space-y-2">
            <input v-model="auth.username" type="text" placeholder="Username" class="w-full p-2 text-xs bg-slate-800/50 border border-slate-700 rounded text-white outline-none focus:border-indigo-400" />
            <input v-model="auth.password" type="password" placeholder="Password" class="w-full p-2 text-xs bg-slate-800/50 border border-slate-700 rounded text-white outline-none focus:border-indigo-400" />
          </div>
        </div>

        <button @click="validateAndStart" :disabled="loading" class="w-full relative group overflow-hidden bg-white text-black font-black py-5 rounded-2xl transition-all active:scale-95 disabled:opacity-30">
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span class="relative z-10 group-hover:text-white transition-colors tracking-widest uppercase text-xs">
            {{ loading ? 'Mapping...' : 'Generate Neural Map' }}
          </span>
        </button>
      </div>
    </div>

    <div class="mt-auto p-8 border-t border-white/5 bg-gradient-to-t from-indigo-500/5 to-transparent">
      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Nodes</span>
          <span class="text-2xl font-black text-indigo-400">{{ nodeCount }}</span>
        </div>
        <div class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" :class="{'animate-pulse': loading}"></div>
      </div>
    </div>
  </aside>
</template>