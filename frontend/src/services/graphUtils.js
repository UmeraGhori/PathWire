import dagre from 'dagre';

export const getLayoutedElements = (rawData) => {
  const g = new dagre.graphlib.Graph();
  
  // TB = Top to Bottom flow (as seen in PDF)
  g.setGraph({ rankdir: 'TB', nodesep: 100, ranksep: 150 });
  g.setDefaultEdgeLabel(() => ({}));

  // Create Nodes
  rawData.forEach(page => {
    g.setNode(page.url, { width: 180, height: 60, title: page.title, depth: page.depth });
  });

  // Create Edges (only for non-noise links)
  rawData.forEach(page => {
    page.links.forEach(target => {
      if (g.hasNode(target)) {
        g.setEdge(page.url, target);
      }
    });
  });

  dagre.layout(g);

  const nodes = g.nodes().map(v => {
    const node = g.node(v);
    return { id: v, ...node, x: node.x, y: node.y };
  });

  const links = g.edges().map(e => ({ source: e.v, target: e.w }));

  return { nodes, links };
};