// Curved Timeline Logic for Projects Section
const projectData = [
  {
    id: "01",
    title: "NexusFlow AI",
    category: "SaaS & GenAI",
    release: "2024 Release",
    desc: "Real-time enterprise orchestration platform for multi-agent workflows. Blends Rust WebAssembly edge compute with OpenAI models to synthesize financial datasets with zero human latency.",
    tags: ["Next.js 15", "Rust WASM", "Tailwind CSS", "Zustand"],
    url: "nexusflow-ai.app",
    status: "LIVE // SYNC",
    pipelineText: "<span>[INPUT] Pipeline</span><span class='text-accent'>WASM Node</span><span class='text-emerald-400'>RAG Vector</span>",
    meterSubtext: "Neural Synthesis Pipeline: Active",
    latency: "Latency: 12ms",
    worker: "Worker: Edge-IAD1",
    meterWidth: "75%",
    liveLink: "#",
    breakdownLink: "#"
  },
  {
    id: "02",
    title: "Krypton Terminal",
    category: "FinTech & Real-Time",
    release: "2024 Release",
    desc: "Sub-millisecond institutional crypto and equities execution platform. Processes 45,000+ WebSocket ticks/sec with customized WebGL candlestick charting and automated delta-neutral hedging.",
    tags: ["React 19", "WebSockets", "Go / Microservices", "ClickHouse"],
    url: "krypton-terminal.io",
    status: "STREAMING // TICK",
    pipelineText: "<span>[ORDER] Orderbook</span><span class='text-accent'>FixEngine</span><span class='text-emerald-400'>Match Latency &lt;1ms</span>",
    meterSubtext: "L2 Orderbook Depth Feed: 48,200 evt/s",
    latency: "Latency: 0.8ms",
    worker: "Node: FRA-Equinix-TY3",
    meterWidth: "92%",
    liveLink: "#",
    breakdownLink: "#"
  },
  {
    id: "03",
    title: "DevLens APM",
    category: "DevTools & Observability",
    release: "2023 Release",
    desc: "Distributed tracing and telemetry monitoring designed for serverless architectures. Captures OpenTelemetry metrics and identifies edge cold starts across Kubernetes clusters with zero overhead.",
    tags: ["TypeScript", "eBPF", "Docker & K8s", "Grafana API"],
    url: "devlens-apm.cloud",
    status: "TRACE // OPTIMAL",
    pipelineText: "<span>[TELEMETRY] Daemon</span><span class='text-accent'>eBPF Kernel</span><span class='text-emerald-400'>OTel Exporter</span>",
    meterSubtext: "Distributed Spans Processed: 1.2M/min",
    latency: "Latency: 4.1ms",
    worker: "Cluster: US-East-k8s-04",
    meterWidth: "60%",
    liveLink: "#",
    breakdownLink: "#"
  },
  {
    id: "04",
    title: "Aura Commerce",
    category: "Headless Next-Gen Shop",
    release: "2023 Release",
    desc: "Lightning-fast ultra luxury headless eCommerce storefront engineered with dynamic multi-currency routing, sub-50ms instant cart hydration, and seamless global Stripe checkout integrations.",
    tags: ["Next.js 14", "Shopify Storefront API", "Tailwind CSS", "Stripe Engine"],
    url: "auracommerce.store",
    status: "STOREFRONT // 100",
    pipelineText: "<span>[CACHE] Edge KV</span><span class='text-accent'>GraphQL Hydrate</span><span class='text-emerald-400'>Lighthouse 100</span>",
    meterSubtext: "Edge Page Speed Score: 99.8/100",
    latency: "TTFB: 28ms",
    worker: "CDN: Worldwide Anycast",
    meterWidth: "98%",
    liveLink: "#",
    breakdownLink: "#"
  }
];

// Center X coordinates for the 4 nodes on the 1000px wide SVG viewBox
const nodeCenters = [125, 375, 625, 875];
let currentActiveIndex = 0;

function selectProject(index) {
  if (index < 0 || index >= projectData.length) return;
  currentActiveIndex = index;

  const targetX = nodeCenters[index];
  const curveWidth = 110;
  const peakY = 12;
  const baseY = 52;

  // Calculate dynamic smooth Bezier curve centered at targetX
  const startX = Math.max(0, targetX - curveWidth);
  const endX = Math.min(1000, targetX + curveWidth);
  const c1x = targetX - (curveWidth * 0.45);
  const c2x = targetX - (curveWidth * 0.15);
  const c3x = targetX + (curveWidth * 0.15);
  const c4x = targetX + (curveWidth * 0.45);

  const newPath = `M 0 ${baseY} L ${startX} ${baseY} C ${c1x} ${baseY} ${c2x} ${peakY} ${targetX} ${peakY} C ${c3x} ${peakY} ${c4x} ${baseY} ${endX} ${baseY} L 1000 ${baseY}`;

  // Update SVG Wave Path & Indicator Dot
  const wavePathEl = document.getElementById('wave-path');
  const indicatorDot = document.getElementById('wave-indicator-dot');
  if (wavePathEl) wavePathEl.setAttribute('d', newPath);
  if (indicatorDot) {
    indicatorDot.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
    indicatorDot.setAttribute('transform', `translate(${targetX}, ${peakY})`);
  }

  // Update Gradient Stop Offsets
  const pct = (targetX / 1000) * 100;
  const gradCenter = document.getElementById('wave-grad-center');
  const gradStop1 = document.getElementById('wave-grad-stop1');
  const gradStop2 = document.getElementById('wave-grad-stop2');
  if (gradCenter) gradCenter.setAttribute('offset', `${pct}%`);
  if (gradStop1) gradStop1.setAttribute('offset', `${Math.max(0, pct - 10)}%`);
  if (gradStop2) gradStop2.setAttribute('offset', `${Math.min(100, pct + 10)}%`);

  // Smoothly swap Preview Card Contents
  const cardContainer = document.getElementById('project-card-container');
  if (cardContainer) {
    cardContainer.style.opacity = '0.3';
    cardContainer.style.transform = 'translateY(4px)';
    
    setTimeout(() => {
      const p = projectData[index];
      // Terminal Mockup Fields
      document.getElementById('card-terminal-url').textContent = p.url;
      document.getElementById('card-terminal-status').textContent = p.status;
      document.getElementById('card-terminal-pipeline').innerHTML = p.pipelineText;
      document.getElementById('card-terminal-subtext').textContent = p.meterSubtext;
      document.getElementById('card-terminal-meter').style.width = p.meterWidth;
      document.getElementById('card-terminal-latency').textContent = p.latency;
      document.getElementById('card-terminal-worker').textContent = p.worker;

      // Details Fields
      document.getElementById('card-badge').textContent = p.category;
      document.getElementById('card-release').textContent = `• ${p.release}`;
      document.getElementById('card-title').textContent = p.title;
      document.getElementById('card-desc').textContent = p.desc;
      
      // Tags
      const tagsContainer = document.getElementById('card-tags');
      tagsContainer.innerHTML = p.tags.map(tag => 
        `<span class="text-xs font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-zinc-300">${tag}</span>`
      ).join('');

      // Re-elevate Card
      cardContainer.style.opacity = '1';
      cardContainer.style.transform = 'translateY(0)';
    }, 160);
  }

  // Update Node UI Buttons
  const buttons = document.querySelectorAll('.project-node');
  buttons.forEach((btn, idx) => {
    const bullet = btn.querySelector('.node-bullet');
    const idSpan = btn.querySelector('.node-id');
    const titleSpan = btn.querySelector('.node-title');
    const catSpan = btn.querySelector('.node-category');

    if (idx === index) {
      btn.classList.add('bg-accent/5');
      if (bullet) {
        bullet.className = 'node-bullet mb-2 w-3 h-3 rounded-full border-2 border-accent bg-accent shadow-[0_0_14px_#FFD400] transition-all';
      }
      if (idSpan) {
        idSpan.className = 'node-id font-mono text-[10px] text-accent font-semibold tracking-wider block mb-0.5';
        idSpan.textContent = `${projectData[idx].id} // SELECTED`;
      }
      if (titleSpan) titleSpan.className = 'node-title text-xs sm:text-sm font-bold text-white transition-colors';
      if (catSpan) catSpan.className = 'node-category text-[11px] font-mono text-accent font-medium mt-0.5';
    } else {
      btn.classList.remove('bg-accent/5');
      if (bullet) {
        bullet.className = 'node-bullet mb-2 w-2 h-2 rounded-full border border-white/20 bg-zinc-700 transition-all group-hover:border-accent group-hover:bg-accent/40';
      }
      if (idSpan) {
        idSpan.className = 'node-id font-mono text-[10px] text-zinc-500 font-medium tracking-wider block mb-0.5';
        idSpan.textContent = `${projectData[idx].id} // ARCHIVE`;
      }
      if (titleSpan) titleSpan.className = 'node-title text-xs sm:text-sm font-bold text-zinc-400 group-hover:text-white transition-colors';
      if (catSpan) catSpan.className = 'node-category text-[11px] font-mono text-zinc-500 mt-0.5';
    }
  });
}

// Keyboard navigation support across projects
document.addEventListener('keydown', (e) => {
  const projectsSec = document.getElementById('projects');
  if (!projectsSec) return;
  const rect = projectsSec.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    if (e.key === 'ArrowRight') {
      selectProject((currentActiveIndex + 1) % projectData.length);
    } else if (e.key === 'ArrowLeft') {
      selectProject((currentActiveIndex - 1 + projectData.length) % projectData.length);
    }
  }
});
