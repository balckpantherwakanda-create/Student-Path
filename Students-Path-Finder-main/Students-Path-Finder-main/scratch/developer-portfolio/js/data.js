// Portfolio Data Configuration
const PORTFOLIO_DATA = {
  personal: {
    name: "Teja Sri",
    role: "Full Stack Web Developer & Problem Solver",
    tagline: "Building scalable web applications, sleek UI/UX interfaces, and solving real-world challenges through clean code.",
    location: "Hyderabad, India",
    email: "tejasri.dev@gmail.com",
    phone: "+91 98765 43210",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    resumeUrl: "#",
    bio: "I am a passionate software developer dedicated to crafting modern, performant, and user-centric digital experiences. With a strong foundation in modern web technologies, responsive design, and backend development, I transform ideas into production-ready software."
  },

  stats: [
    { label: "Projects Completed", value: "15+", icon: "fa-project-diagram" },
    { label: "Technologies Mastered", value: "12+", icon: "fa-code" },
    { label: "GitHub Contributions", value: "650+", icon: "fa-code-branch" },
    { label: "Client Satisfaction", value: "100%", icon: "fa-smile-beam" }
  ],

  skills: {
    frontend: [
      { name: "HTML5 & Semantic Web", level: 95, icon: "fa-html5", color: "#e34f26" },
      { name: "CSS3 & Modern Layouts", level: 90, icon: "fa-css3-alt", color: "#1572b6" },
      { name: "JavaScript (ES6+)", level: 90, icon: "fa-js-square", color: "#f7df1e" },
      { name: "React.js", level: 85, icon: "fa-react", color: "#61dafb" },
      { name: "Tailwind CSS", level: 88, icon: "fa-wind", color: "#38bdf8" }
    ],
    backend: [
      { name: "Node.js & Express", level: 82, icon: "fa-node-js", color: "#339933" },
      { name: "Python", level: 80, icon: "fa-python", color: "#3776ab" },
      { name: "RESTful API Design", level: 88, icon: "fa-network-wired", color: "#4f46e5" },
      { name: "Authentication & JWT", level: 85, icon: "fa-user-shield", color: "#059669" }
    ],
    databases: [
      { name: "PostgreSQL", level: 80, icon: "fa-database", color: "#336791" },
      { name: "MySQL", level: 85, icon: "fa-database", color: "#00758f" },
      { name: "MongoDB", level: 78, icon: "fa-leaf", color: "#47a248" }
    ],
    tools: [
      { name: "Git & GitHub", level: 92, icon: "fa-github", color: "#f05032" },
      { name: "VS Code", level: 95, icon: "fa-code", color: "#007acc" },
      { name: "Postman API Testing", level: 88, icon: "fa-paper-plane", color: "#ff6c37" },
      { name: "Vite & Webpack", level: 82, icon: "fa-bolt", color: "#646cff" }
    ]
  },

  projects: [
    {
      id: "inter-fee-finder",
      title: "InterFeeFinder - Intermediate College & Fee Portal",
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
      description: "A specialized college discovery portal enabling 10th passed students to explore intermediate colleges, line-by-line fee sheets, hostel/bus costs, and calculate instant 10th GPA scholarships without physical travel.",
      tags: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "Responsive UI"],
      liveDemo: "../inter-college-fee-finder/index.html",
      githubRepo: "https://github.com/tejasri/inter-fee-finder",
      featured: true,
      highlights: [
        "10th GPA / SSC Marks scholarship waiver calculator",
        "Physical travel & fuel savings estimator widget",
        "Side-by-side comparison matrix for up to 3 colleges",
        "Multi-filter catalog across MPC, BiPC, MEC, and CEC streams"
      ]
    },
    {
      id: "task-flow-kanban",
      title: "TaskFlow - Agile Productivity Kanban Board",
      category: "Frontend",
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
      description: "A drag-and-drop productivity dashboard with column customization, task prioritization, due date tracking, and dark mode.",
      tags: ["JavaScript", "HTML5 Drag & Drop", "CSS Grid", "LocalStorage"],
      liveDemo: "#",
      githubRepo: "https://github.com/tejasri/taskflow-kanban",
      featured: true,
      highlights: [
        "Native HTML5 Drag and Drop API implementation",
        "Color-coded priority tags and due date countdowns",
        "Full local storage persistence"
      ]
    },
    {
      id: "ai-code-snippet-manager",
      title: "DevVault - Developer Code Snippet Organizer",
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      description: "Cloud-synchronized code snippet manager with syntax highlighting, search by language/tags, and one-click copy to clipboard.",
      tags: ["Node.js", "Express", "REST API", "PrismJS", "CSS3"],
      liveDemo: "#",
      githubRepo: "https://github.com/tejasri/devvault-snippets",
      featured: true,
      highlights: [
        "Syntax highlighting for 20+ programming languages",
        "Fast fuzzy search filtering",
        "Export snippets as Markdown or JSON"
      ]
    },
    {
      id: "weather-radar-dashboard",
      title: "SkyPulse - Interactive Weather & Air Quality Hub",
      category: "Frontend",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80",
      description: "Real-time weather forecast application with geolocation detection, hourly temperature graphs, and AQI pollution indexes.",
      tags: ["JavaScript", "OpenWeather API", "Chart.js", "CSS Glassmorphism"],
      liveDemo: "#",
      githubRepo: "https://github.com/tejasri/skypulse-weather",
      featured: false,
      highlights: [
        "Interactive temperature & humidity charts using Chart.js",
        "Location auto-detect with reverse geocoding",
        "Dynamic background changes based on weather conditions"
      ]
    }
  ],

  experience: [
    {
      period: "2024 - Present",
      role: "Frontend & Full Stack Web Developer",
      company: "Independent / Freelance Projects",
      description: "Designing and engineering responsive, high-performance web applications, interactive dashboards, and client portals with clean code and modern UX best practices."
    },
    {
      period: "2023 - 2024",
      role: "Web Development Intern",
      company: "Tech Solutions Hub",
      description: "Collaborated on building reusable UI components, optimizing page loading performance, integrating REST APIs, and writing automated unit tests."
    },
    {
      period: "2021 - 2025",
      role: "B.Tech in Computer Science & Engineering",
      company: "JNTU Hyderabad",
      description: "Core coursework in Data Structures, Algorithms, Database Management Systems, Computer Networks, and Web Technologies."
    }
  ]
};
