<!-- <script setup>
import { onMounted, ref, watch, nextTick } from 'vue';
import * as d3 from 'd3';
import dagre from 'dagre';

const props = defineProps({ 
  data: Array,
  depth: { type: Number, default: 3 } 
});

const canvas = ref(null);
const zoomBehavior = ref(null);

const BLACKLIST = ['terms', 'policy', 'privacy', 'cookie', 'legal', 'license', 'disclaimer'];

const renderFlow = async () => {
  if (!props.data || props.data.length === 0) return;
  await nextTick();
  
  const canvasElement = canvas.value;
  if (!canvasElement) return;
  d3.select(canvasElement).selectAll("*").remove();

  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: 'LR', nodesep: 60, ranksep: 220, marginx: 50, marginy: 50 });
  g.setDefaultEdgeLabel(() => ({}));

  const origin = new URL(props.data[0].url).origin;
  const homeId = origin.replace(/\/$/, "");

  // 1. FILTERING
  const filteredData = props.data.filter(page => {
    const u = new URL(page.url);
    const parts = u.pathname.split('/').filter(Boolean);
    const isBlacklisted = BLACKLIST.some(word => page.url.toLowerCase().includes(word));
    return !isBlacklisted && parts.length <= props.depth;
  });

  // 2. IDENTIFY AGGREGATION (Kise DETAILS mein dalna hai)
  const childrenMap = {};
  filteredData.forEach(p => {
    const u = new URL(p.url);
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.length > 1) {
      const parentId = (u.origin + '/' + parts.slice(0, -1).join('/')).replace(/\/$/, "");
      if (!childrenMap[parentId]) childrenMap[parentId] = [];
      childrenMap[parentId].push(p.url.replace(/\/$/, ""));
    }
  });

  const hiddenNodes = new Set();
  const aggregatedParents = new Set();

  Object.keys(childrenMap).forEach(pId => {
    // Agar kisi Level 1 parent ke 8 se zyada children hain
    if (childrenMap[pId].length > 8) {
      aggregatedParents.add(pId);
      childrenMap[pId].forEach(childId => hiddenNodes.add(childId));
    }
  });

  // 3. REGISTER ONLY VISIBLE NODES
  const register = (id, label, isHome = false, isDetails = false) => {
    if (!g.hasNode(id)) g.setNode(id, { label, width: 180, height: 40, isHome, isDetails });
  };

  register(homeId, "HOME", true);

  filteredData.forEach(page => {
    const nodeId = page.url.replace(/\/$/, "");
    if (hiddenNodes.has(nodeId)) return; // DO NOT REGISTER GHOST NODES

    try {
      const u = new URL(page.url);
      const parts = u.pathname.split('/').filter(Boolean);
      let currentPath = u.origin;

      parts.forEach((part, index) => {
        const parentId = currentPath.replace(/\/$/, "");
        currentPath += "/" + part;
        const thisNodeId = currentPath.replace(/\/$/, "");

        if (!hiddenNodes.has(thisNodeId)) {
          register(thisNodeId, part.split('-').join(' ').toUpperCase());
          if (g.hasNode(parentId)) g.setEdge(parentId, thisNodeId);
          else if (thisNodeId !== homeId) g.setEdge(homeId, thisNodeId);
        }
      });
    } catch(e) {}
  });

  // 4. ADD VIRTUAL DETAILS NODES
  aggregatedParents.forEach(pId => {
    if (g.hasNode(pId)) {
      const aggId = `${pId}/details-box`;
      const pNode = g.node(pId);
      register(aggId, `${pNode.label} DETAILS`, false, true);
      g.setEdge(pId, aggId);
    }
  });

  dagre.layout(g);

  // 5. RENDERING
  const svg = d3.select(canvasElement).append("svg").attr("width", "100%").attr("height", "100%");
  const container = svg.append("g");

  zoomBehavior.value = d3.zoom().on("zoom", (e) => container.attr("transform", e.transform));
  svg.call(zoomBehavior.value);

  const linkGen = d3.linkHorizontal().x(d => d.x).y(d => d.y);
  const edges = g.edges().map(e => ({ v: g.node(e.v), w: g.node(e.w) })).filter(d => d.v && d.w);

  container.selectAll(".link").data(edges).enter().append("path")
    .attr("d", d => linkGen({ source: { x: d.v.x + 90, y: d.v.y }, target: { x: d.w.x - 90, y: d.w.y } }))
    .attr("fill", "none").attr("stroke", "#6366f1").attr("stroke-width", 2).attr("stroke-opacity", 0.3);

  const nodeGroups = container.selectAll(".node").data(g.nodes().map(v => ({ id: v, ...g.node(v) })))
    .enter().append("g").attr("transform", d => `translate(${d.x - 90}, ${d.y - 20})`);

  nodeGroups.append("rect").attr("width", 180).attr("height", 40).attr("rx", 10)
    .attr("fill", d => d.isHome ? "#6366f1" : (d.isDetails ? "#312e81" : "#1e293b"))
    .attr("stroke", d => d.isHome ? "#818cf8" : (d.isDetails ? "#6366f1" : "#334155"))
    .style("stroke-dasharray", d => d.isDetails ? "5,5" : "none");

  nodeGroups.append("text").attr("x", 90).attr("y", 25).attr("text-anchor", "middle")
    .attr("class", "text-[10px] font-bold fill-white uppercase").text(d => d.label);

  const fitView = () => {
    const parent = canvasElement.getBoundingClientRect();
    const gDraw = g.graph();
    const scale = Math.min(0.8, (parent.width * 0.9) / gDraw.width, (parent.height * 0.9) / gDraw.height);
    const x = (parent.width / 2) - (scale * (gDraw.width / 2));
    const y = (parent.height / 2) - (scale * (gDraw.height / 2));
    svg.transition().duration(500).call(zoomBehavior.value.transform, d3.zoomIdentity.translate(x, y).scale(scale));
  };
  setTimeout(fitView, 150);
};

watch([() => props.data, () => props.depth], renderFlow, { deep: true });
onMounted(renderFlow);
</script>

<template>
  <div ref="canvas" class="w-full h-full bg-[#020617] overflow-hidden"></div>
</template> -->


<script setup>
import { onMounted, ref, watch, nextTick } from 'vue';
import * as d3 from 'd3';
import dagre from 'dagre';

const props = defineProps({ 
  data: Array,
  depth: { type: Number, default: 3 } 
});

const canvas = ref(null);
const zoomBehavior = ref(null);

const BLACKLIST = ['terms', 'policy', 'privacy', 'cookie', 'legal', 'license', 'disclaimer'];

// --- DOWNLOAD PNG LOGIC ---
const downloadPng = () => {
  const svgElement = canvas.value.querySelector('svg');
  if (!svgElement) return;

  // Clone the SVG to manipulate styles for export
  const clonedSvg = svgElement.cloneNode(true);
  const bbox = svgElement.getBBox();
  
  // Set explicit dimensions for the export
  clonedSvg.setAttribute("width", bbox.width + 100);
  clonedSvg.setAttribute("height", bbox.height + 100);
  clonedSvg.setAttribute("viewBox", `${bbox.x - 50} ${bbox.y - 50} ${bbox.width + 100} ${bbox.height + 100}`);

  const svgData = new XMLSerializer().serializeToString(clonedSvg);
  const canvas_tmp = document.createElement("canvas");
  
  // High Resolution (2x)
  const multiplier = 2;
  canvas_tmp.width = (bbox.width + 100) * multiplier;
  canvas_tmp.height = (bbox.height + 100) * multiplier;

  const ctx = canvas_tmp.getContext("2d");
  const img = new Image();
  
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    // Fill background (match your app theme)
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, canvas_tmp.width, canvas_tmp.height);
    
    ctx.drawImage(img, 0, 0, canvas_tmp.width, canvas_tmp.height);
    
    const pngUrl = canvas_tmp.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `user-flow-export.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  img.src = url;
};

const renderFlow = async () => {
  if (!props.data || props.data.length === 0) return;
  await nextTick();
  
  const canvasElement = canvas.value;
  if (!canvasElement) return;
  d3.select(canvasElement).selectAll("*").remove();

  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: 'LR', nodesep: 60, ranksep: 220, marginx: 50, marginy: 50 });
  g.setDefaultEdgeLabel(() => ({}));

  const origin = new URL(props.data[0].url).origin;
  const homeId = origin.replace(/\/$/, "");

  // 1. FILTERING
  const filteredData = props.data.filter(page => {
    const u = new URL(page.url);
    const parts = u.pathname.split('/').filter(Boolean);
    const isBlacklisted = BLACKLIST.some(word => page.url.toLowerCase().includes(word));
    return !isBlacklisted && parts.length <= props.depth;
  });

  // 2. IDENTIFY AGGREGATION
  const childrenMap = {};
  filteredData.forEach(p => {
    const u = new URL(p.url);
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.length > 1) {
      const parentId = (u.origin + '/' + parts.slice(0, -1).join('/')).replace(/\/$/, "");
      if (!childrenMap[parentId]) childrenMap[parentId] = [];
      childrenMap[parentId].push(p.url.replace(/\/$/, ""));
    }
  });

  const hiddenNodes = new Set();
  const aggregatedParents = new Set();

  Object.keys(childrenMap).forEach(pId => {
    if (childrenMap[pId].length > 8) {
      aggregatedParents.add(pId);
      childrenMap[pId].forEach(childId => hiddenNodes.add(childId));
    }
  });

  // 3. REGISTER ONLY VISIBLE NODES
  const register = (id, label, isHome = false, isDetails = false) => {
    if (!g.hasNode(id)) g.setNode(id, { label, width: 180, height: 40, isHome, isDetails });
  };

  register(homeId, "HOME", true);

  filteredData.forEach(page => {
    const nodeId = page.url.replace(/\/$/, "");
    if (hiddenNodes.has(nodeId)) return;

    try {
      const u = new URL(page.url);
      const parts = u.pathname.split('/').filter(Boolean);
      let currentPath = u.origin;

      parts.forEach((part, index) => {
        const parentId = currentPath.replace(/\/$/, "");
        currentPath += "/" + part;
        const thisNodeId = currentPath.replace(/\/$/, "");

        if (!hiddenNodes.has(thisNodeId)) {
          register(thisNodeId, part.split('-').join(' ').toUpperCase());
          if (g.hasNode(parentId)) g.setEdge(parentId, thisNodeId);
          else if (thisNodeId !== homeId) g.setEdge(homeId, thisNodeId);
        }
      });
    } catch(e) {}
  });

  // 4. ADD VIRTUAL DETAILS NODES
  aggregatedParents.forEach(pId => {
    if (g.hasNode(pId)) {
      const aggId = `${pId}/details-box`;
      const pNode = g.node(pId);
      register(aggId, `${pNode.label} DETAILS`, false, true);
      g.setEdge(pId, aggId);
    }
  });

  dagre.layout(g);

  // 5. RENDERING
  const svg = d3.select(canvasElement).append("svg").attr("width", "100%").attr("height", "100%");
  const container = svg.append("g");

  zoomBehavior.value = d3.zoom().on("zoom", (e) => container.attr("transform", e.transform));
  svg.call(zoomBehavior.value);

  const linkGen = d3.linkHorizontal().x(d => d.x).y(d => d.y);
  const edges = g.edges().map(e => ({ v: g.node(e.v), w: g.node(e.w) })).filter(d => d.v && d.w);

  container.selectAll(".link").data(edges).enter().append("path")
    .attr("d", d => linkGen({ source: { x: d.v.x + 90, y: d.v.y }, target: { x: d.w.x - 90, y: d.w.y } }))
    .attr("fill", "none").attr("stroke", "#6366f1").attr("stroke-width", 2).attr("stroke-opacity", 0.3);

  const nodeGroups = container.selectAll(".node").data(g.nodes().map(v => ({ id: v, ...g.node(v) })))
    .enter().append("g").attr("transform", d => `translate(${d.x - 90}, ${d.y - 20})`);

  nodeGroups.append("rect").attr("width", 180).attr("height", 40).attr("rx", 10)
    .attr("fill", d => d.isHome ? "#6366f1" : (d.isDetails ? "#312e81" : "#1e293b"))
    .attr("stroke", d => d.isHome ? "#818cf8" : (d.isDetails ? "#6366f1" : "#334155"))
    .style("stroke-dasharray", d => d.isDetails ? "5,5" : "none");

  nodeGroups.append("text").attr("x", 90).attr("y", 25).attr("text-anchor", "middle")
    .attr("style", "fill: white; font-family: sans-serif; font-weight: bold; font-size: 10px; text-transform: uppercase;")
    .text(d => d.label);

  const fitView = () => {
    const parent = canvasElement.getBoundingClientRect();
    const gDraw = g.graph();
    const scale = Math.min(0.8, (parent.width * 0.9) / gDraw.width, (parent.height * 0.9) / gDraw.height);
    const x = (parent.width / 2) - (scale * (gDraw.width / 2));
    const y = (parent.height / 2) - (scale * (gDraw.height / 2));
    svg.transition().duration(500).call(zoomBehavior.value.transform, d3.zoomIdentity.translate(x, y).scale(scale));
  };
  setTimeout(fitView, 150);
};

watch([() => props.data, () => props.depth], renderFlow, { deep: true });
onMounted(renderFlow);
</script>

<template>
  <div class="relative w-full h-full bg-[#020617] overflow-hidden group">
    <div class="absolute top-6 right-6 z-50">
      <button 
        @click="downloadPng"
        class="p-3 bg-slate-800/80 hover:bg-indigo-600 border border-slate-600 rounded-xl text-white shadow-2xl backdrop-blur-md transition-all active:scale-95 group/btn"
        title="Download Flow Mapping"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span class="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover/btn:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">EXPORT PNG</span>
      </button>
    </div>

    <div ref="canvas" class="w-full h-full"></div>
  </div>
</template>