<script setup>
import { X, ExternalLink, Link2 } from 'lucide-vue-next';
defineProps(['node', 'onClose']);
</script>

<template>
  <div v-if="node" class="absolute top-4 right-4 w-80 bg-white shadow-2xl rounded-2xl border border-slate-100 p-6 z-30 transition-all animate-in slide-in-from-right">
    <div class="flex justify-between items-start mb-4">
      <h3 class="font-bold text-slate-800 pr-4 leading-tight">{{ node.title }}</h3>
      <button @click="onClose" class="p-1 hover:bg-slate-100 rounded-md"><X :size="16" /></button>
    </div>
    
    <div class="space-y-4">
      <div class="text-xs">
        <span class="block text-slate-400 uppercase font-bold tracking-widest mb-1">URL</span>
        <a :href="node.id" target="_blank" class="text-indigo-600 break-all flex items-center gap-1 hover:underline">
          {{ node.id }} <ExternalLink :size="10" />
        </a>
      </div>

      <div class="bg-slate-50 p-3 rounded-lg border border-slate-100">
        <span class="block text-slate-400 text-[10px] uppercase font-bold mb-1">Crawl Context</span>
        <p class="text-xs text-slate-600 font-medium">Depth Level: {{ node.depth }}</p>
      </div>
    </div>
  </div>
</template>