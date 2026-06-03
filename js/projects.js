const projectsData = [
  {
    id: "nova-workspace",
    title: "Nova Workspace",
    subtitle: "Collaborative IDE & Developer Hub",
    shortDescription: "A real-time collaborative workspace featuring rich editor extensions, containerized terminals, and live team audio channels.",
    description: "Nova Workspace is a cloud-based development environment that enables teams to collaborate in real-time. Built with a focus on seamless developer workflows, it features automated environment provisioning, shared terminals, high-fidelity audio streams for pair programming, and integrated version control visualizers. Designed using Material Design 3 guidelines for an immersive, distraction-free environment.",
    tags: ["Frontend", "Collaboration", "Productivity"],
    tech: ["TypeScript", "WebRTC", "React", "Node.js", "Docker"],
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&auto=format&fit=crop&q=60",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: "aether-dashboard",
    title: "Aether Dashboard",
    subtitle: "Enterprise Multi-Cloud Analytics",
    shortDescription: "An unified dashboard displaying multi-cloud cost optimization metrics, carbon offsets, and microservice health telemetry.",
    description: "Aether Dashboard aggregates telemetry and billing data from AWS, GCP, and Azure. It processes over 10 million events daily, using statistical anomaly detection to alert platform teams about cost spikes and server health deprecations. The interface offers fluid dark-mode transitions, interactive multi-axis charts, and custom reporting mechanisms utilizing modern Canvas rendering.",
    tags: ["Backend", "Cloud", "Analytics"],
    tech: ["Go", "Kubernetes", "Vue 3", "TimescaleDB", "GraphQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: "helios-telemetry",
    title: "Helios API Gateway",
    subtitle: "Ultra-Low Latency Proxy",
    shortDescription: "A high-performance reverse proxy and API gateway designed for low-memory environments, achieving < 2ms latency.",
    description: "Helios API Gateway is a lightweight edge solution built in Rust to handle rate-limiting, JWT validation, and dynamic routing for enterprise microservices. It features a custom eBPF kernel integration for lightning-fast packet redirection and publishes detailed metrics directly to Prometheus, maintaining a footprint of less than 15MB RAM under heavy load.",
    tags: ["Backend", "Systems", "Security"],
    tech: ["Rust", "eBPF", "Prometheus", "Redis", "gRPC"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: "prism-design",
    title: "Prism Design Engine",
    subtitle: "Generative UI Design System",
    shortDescription: "A design tool plugin that automatically translates high-fidelity design layouts into production-ready semantic HTML/CSS components.",
    description: "Prism Design Engine uses computer vision and token mapping rules to analyze design canvas frames. It constructs modular, fully-responsive CSS Grid systems, standardizes typographic hierarchies using local scales, and outputs clean component modules compatible with modern CSS and framework-agnostic markup.",
    tags: ["Frontend", "Design", "AI Tooling"],
    tech: ["JavaScript", "WASM", "CSS Grid", "Figma API", "WebAssembly"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60",
    demoUrl: "#",
    githubUrl: "#"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
