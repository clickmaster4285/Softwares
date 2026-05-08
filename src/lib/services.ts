// app/services/[slug]/data.ts
export type LifecycleStep = {
  step: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
};

export type ServiceData = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  heroBadge: string;
  stats: Array<{ value: string; label: string }>;
  features: Array<{ title: string; description: string; icon: string }>;
  benefits: string[];
  ctaText: string;
  lifecycle: LifecycleStep[];
};

export const servicesData: Record<string, ServiceData> = {
  // Software Development
  "software-development": {
    slug: "software-development",
    title: "Software Development",
    tagline: "Build Scalable, Robust Enterprise Solutions",
    description: "We craft custom software solutions that streamline operations, enhance productivity, and drive business growth. From concept to deployment, our expert engineers deliver high-performance applications tailored to your unique needs.",
    heroBadge: "10+ Enterprise Solutions Delivered",
    stats: [
      { value: "200+", label: "Projects Delivered" },
      { value: "99.9%", label: "Uptime Guarantee" },
      { value: "50+", label: "Expert Engineers" },
      { value: "24/7", label: "Support" }
    ],
    features: [
      { title: "Custom Architecture", description: "Tailored solutions built for your specific business requirements", icon: "🏗️" },
      { title: "Agile Development", description: "Rapid iterations with continuous feedback and improvements", icon: "🔄" },
      { title: "Quality Assurance", description: "Comprehensive testing ensuring bug-free deployments", icon: "✅" }
    ],
    benefits: ["Reduced operational costs", "Increased efficiency", "Scalable infrastructure", "Future-proof technology"],
    ctaText: "Start Your Software Project",
    lifecycle: [
      { step: 1, title: "Discovery & Planning", description: "We analyze your requirements, define project scope, and create a detailed roadmap.", duration: "1-2 weeks", icon: "🔍" },
      { step: 2, title: "Design & Prototyping", description: "Create wireframes, UI/UX designs, and interactive prototypes for validation.", duration: "2-3 weeks", icon: "🎨" },
      { step: 3, title: "Development", description: "Agile development with regular sprints, code reviews, and continuous integration.", duration: "8-12 weeks", icon: "💻" },
      { step: 4, title: "Testing & QA", description: "Comprehensive testing including unit, integration, performance, and security tests.", duration: "2-3 weeks", icon: "🧪" },
      { step: 5, title: "Deployment & Launch", description: "Smooth deployment, data migration, and go-live support.", duration: "1 week", icon: "🚀" }
    ]
  },

  // Web Development
  "web-development": {
    slug: "web-development",
    title: "Web Development",
    tagline: "Create Stunning, High-Performance Websites",
    description: "We build modern, responsive websites and web applications that captivate audiences and drive conversions. Using the latest frameworks and technologies, we deliver lightning-fast, SEO-optimized web experiences.",
    heroBadge: "500+ Websites Launched",
    stats: [
      { value: "500+", label: "Websites Built" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "40ms", label: "Avg Load Time" },
      { value: "100+", label: "Team Members" }
    ],
    features: [
      { title: "Responsive Design", description: "Perfect viewing experience on all devices", icon: "📱" },
      { title: "SEO Optimized", description: "Built-in best practices for search rankings", icon: "🔍" },
      { title: "E-commerce Ready", description: "Powerful online store solutions", icon: "🛒" }
    ],
    benefits: ["Increased online visibility", "Higher conversion rates", "Better user engagement", "Mobile-first approach"],
    ctaText: "Launch Your Website",
    lifecycle: [
      { step: 1, title: "Requirements Gathering", description: "Understand your business goals, target audience, and technical needs.", duration: "1 week", icon: "📋" },
      { step: 2, title: "Wireframing & Design", description: "Create site structure, wireframes, and visual designs.", duration: "2 weeks", icon: "✏️" },
      { step: 3, title: "Frontend Development", description: "Build responsive, interactive user interfaces.", duration: "4-6 weeks", icon: "🎨" },
      { step: 4, title: "Backend Integration", description: "Connect with databases, APIs, and CMS.", duration: "3-4 weeks", icon: "⚙️" },
      { step: 5, title: "Launch & Optimization", description: "Deploy, test, and optimize for performance and SEO.", duration: "1-2 weeks", icon: "🚀" }
    ]
  },

  // Mobile Development
  "mobile-development": {
    slug: "mobile-development",
    title: "Mobile Development",
    tagline: "Native & Cross-Platform Mobile Apps",
    description: "Transform your ideas into powerful mobile applications for iOS and Android. We specialize in both native and cross-platform development, delivering seamless user experiences that keep users coming back.",
    heroBadge: "100+ Apps on App Stores",
    stats: [
      { value: "100+", label: "Apps Published" },
      { value: "4.8★", label: "Avg Rating" },
      { value: "10M+", label: "Total Downloads" },
      { value: "50+", label: "Mobile Experts" }
    ],
    features: [
      { title: "Native Development", description: "Swift, Kotlin, and Java expertise", icon: "📱" },
      { title: "Cross-Platform", description: "React Native & Flutter solutions", icon: "🔄" },
      { title: "App Store Optimization", description: "Maximize your app's visibility", icon: "📈" }
    ],
    benefits: ["Reach mobile users", "Offline functionality", "Push notifications", "App store presence"],
    ctaText: "Build Your App",
    lifecycle: [
      { step: 1, title: "Ideation & Strategy", description: "Define app concept, features, and target platforms.", duration: "1-2 weeks", icon: "💡" },
      { step: 2, title: "UI/UX Design", description: "Create intuitive mobile interfaces and user flows.", duration: "2-3 weeks", icon: "🎨" },
      { step: 3, title: "App Development", description: "Code native or cross-platform app with best practices.", duration: "8-10 weeks", icon: "📱" },
      { step: 4, title: "Testing & Refinement", description: "Test on multiple devices and refine based on feedback.", duration: "2 weeks", icon: "🧪" },
      { step: 5, title: "App Store Submission", description: "Prepare assets, submit to stores, and manage release.", duration: "1-2 weeks", icon: "📲" }
    ]
  },

  // Design
  "design": {
    slug: "design",
    title: "Design",
    tagline: "Beautiful, User-Centered Design Solutions",
    description: "Our design team creates intuitive, engaging experiences that users love. From UI/UX design to branding and visual identity, we craft designs that communicate your brand story effectively.",
    heroBadge: "Award-Winning Design Team",
    stats: [
      { value: "300+", label: "Design Projects" },
      { value: "15+", label: "Design Awards" },
      { value: "95%", label: "User Satisfaction" },
      { value: "40+", label: "Designers" }
    ],
    features: [
      { title: "UX Research", description: "Data-driven design decisions", icon: "🔬" },
      { title: "UI Design", description: "Beautiful, modern interfaces", icon: "🎨" },
      { title: "Brand Identity", description: "Coherent brand experiences", icon: "🏷️" }
    ],
    benefits: ["Improved user engagement", "Higher conversion rates", "Brand consistency", "Reduced bounce rates"],
    ctaText: "Start Designing",
    lifecycle: [
      { step: 1, title: "Research & Discovery", description: "User research, competitor analysis, and requirements gathering.", duration: "1-2 weeks", icon: "🔍" },
      { step: 2, title: "Information Architecture", description: "Structure content and create user flow diagrams.", duration: "1 week", icon: "🏗️" },
      { step: 3, title: "Wireframing", description: "Create low-fidelity wireframes for layout and functionality.", duration: "1-2 weeks", icon: "📐" },
      { step: 4, title: "Visual Design", description: "Design high-fidelity mockups with brand elements.", duration: "2-3 weeks", icon: "🎨" },
      { step: 5, title: "Prototyping & Testing", description: "Create interactive prototypes and user testing.", duration: "1-2 weeks", icon: "🧪" }
    ]
  },

  "artificial-intelligence-ai": {
    slug: "artificial-intelligence-ai",
    title: "Artificial Intelligence",
    tagline: "Intelligent Solutions for Modern Businesses",
    description: "Leverage the power of AI to automate processes, gain insights, and create innovative solutions that drive growth and efficiency.",
    heroBadge: "Leading AI Innovators",

    stats: [
      { value: "300+", label: "Design Projects" },
      { value: "15+", label: "Design Awards" },
      { value: "95%", label: "User Satisfaction" },
      { value: "40+", label: "Designers" }
    ],
    features: [
      { title: "UX Research", description: "Data-driven design decisions", icon: "🔬" },
      { title: "UI Design", description: "Beautiful, modern interfaces", icon: "🎨" },
      { title: "Brand Identity", description: "Coherent brand experiences", icon: "🏷️" }
    ],
    benefits: ["Improved user engagement", "Higher conversion rates", "Brand consistency", "Reduced bounce rates"],
    ctaText: "Start Designing",
    lifecycle: [
      { step: 1, title: "Research & Discovery", description: "User research, competitor analysis, and requirements gathering.", duration: "1-2 weeks", icon: "🔍" },
      { step: 2, title: "Information Architecture", description: "Structure content and create user flow diagrams.", duration: "1 week", icon: "🏗️" },
      { step: 3, title: "Wireframing", description: "Create low-fidelity wireframes for layout and functionality.", duration: "1-2 weeks", icon: "📐" },
      { step: 4, title: "Visual Design", description: "Design high-fidelity mockups with brand elements.", duration: "2-3 weeks", icon: "🎨" },
      { step: 5, title: "Prototyping & Testing", description: "Create interactive prototypes and user testing.", duration: "1-2 weeks", icon: "🧪" }
    ]
  },

  // Machine Learning (ML)
  "machine-learning-ml": {
    slug: "machine-learning-ml",
    title: "Machine Learning",
    tagline: "Intelligent Data-Driven Solutions",
    description: "Harness the power of machine learning to transform your data into actionable insights. We build custom ML models that automate decisions, predict outcomes, and drive business intelligence.",
    heroBadge: "50+ ML Models Deployed",
    stats: [
      { value: "50+", label: "ML Models" },
      { value: "95%", label: "Accuracy Rate" },
      { value: "1TB+", label: "Data Processed" },
      { value: "25+", label: "ML Engineers" }
    ],
    features: [
      { title: "Predictive Analytics", description: "Forecast trends and outcomes", icon: "📊" },
      { title: "Custom Models", description: "Tailored ML solutions", icon: "🤖" },
      { title: "Real-time Processing", description: "Live data analysis", icon: "⚡" }
    ],
    benefits: ["Data-driven decisions", "Automated insights", "Competitive advantage", "Scalable intelligence"],
    ctaText: "Build Your ML Solution",
    lifecycle: [
      { step: 1, title: "Data Analysis", description: "Analyze data sources and requirements.", duration: "1-2 weeks", icon: "🔍" },
      { step: 2, title: "Model Design", description: "Design ML architecture and algorithms.", duration: "2-4 weeks", icon: "🏗️" },
      { step: 3, title: "Training", description: "Train models with historical data.", duration: "4-8 weeks", icon: "🧠" },
      { step: 4, title: "Validation", description: "Test and validate model accuracy.", duration: "2-3 weeks", icon: "🧪" },
      { step: 5, title: "Deployment", description: "Deploy models to production environment.", duration: "1-2 weeks", icon: "🚀" }
    ]
  },

  // NLP & Computer Vision
  "nlp-and-computer-vision": {
    slug: "nlp-and-computer-vision",
    title: "NLP & Computer Vision",
    tagline: "Advanced AI Perception Solutions",
    description: "Transform how your business understands and interacts with the world. We develop cutting-edge natural language processing and computer vision systems that automate workflows and enhance user experiences.",
    heroBadge: "30+ AI Perception Projects",
    stats: [
      { value: "30+", label: "AI Projects" },
      { value: "97%", label: "Recognition Accuracy" },
      { value: "100M+", label: "Images Processed" },
      { value: "20+", label: "AI Specialists" }
    ],
    features: [
      { title: "Text Analysis", description: "Extract insights from unstructured text", icon: "📝" },
      { title: "Image Recognition", description: "Identify objects and patterns in images", icon: "👁️" },
      { title: "Voice Processing", description: "Convert speech to text and commands", icon: "🎤" }
    ],
    benefits: ["Automated workflows", "Enhanced user experience", "Data extraction", "Cost reduction"],
    ctaText: "Implement AI Solutions",
    lifecycle: [
      { step: 1, title: "Requirements", description: "Define NLP/CV use cases and data.", duration: "1 week", icon: "📋" },
      { step: 2, title: "Data Preparation", description: "Clean and prepare training datasets.", duration: "2-3 weeks", icon: "🧹" },
      { step: 3, title: "Model Development", description: "Train NLP/CV models.", duration: "6-10 weeks", icon: "🤖" },
      { step: 4, title: "Integration", description: "Integrate with existing systems.", duration: "2-4 weeks", icon: "🔗" },
      { step: 5, title: "Testing", description: "Test accuracy and performance.", duration: "2 weeks", icon: "🧪" }
    ]
  },

  // Data Services
  "data-services": {
    slug: "data-services",
    title: "Data Services",
    tagline: "Comprehensive Data Management Solutions",
    description: "Transform your raw data into valuable business assets. We provide end-to-end data services including collection, processing, analysis, and visualization to drive informed decision-making.",
    heroBadge: "100+ Data Projects Completed",
    stats: [
      { value: "100+", label: "Data Projects" },
      { value: "99.9%", label: "Data Quality" },
      { value: "1PB+", label: "Data Processed" },
      { value: "35+", label: "Data Experts" }
    ],
    features: [
      { title: "Data Engineering", description: "Build robust data pipelines", icon: "⚙️" },
      { title: "Data Analytics", description: "Extract insights from data", icon: "📊" },
      { title: "Data Visualization", description: "Create interactive dashboards", icon: "📈" }
    ],
    benefits: ["Better decisions", "Data-driven insights", "Operational efficiency", "Competitive advantage"],
    ctaText: "Transform Your Data",
    lifecycle: [
      { step: 1, title: "Assessment", description: "Analyze data sources and requirements.", duration: "1-2 weeks", icon: "🔍" },
      { step: 2, title: "Pipeline Design", description: "Design data processing workflows.", duration: "2-3 weeks", icon: "🏗️" },
      { step: 3, title: "Implementation", description: "Build data infrastructure.", duration: "4-8 weeks", icon: "⚙️" },
      { step: 4, title: "Analysis", description: "Process and analyze data.", duration: "2-4 weeks", icon: "📊" },
      { step: 5, title: "Visualization", description: "Create dashboards and reports.", duration: "1-2 weeks", icon: "📈" }
    ]
  },

  // Data & Intelligence
  "data-and-intelligence": {
    slug: "data-and-intelligence",
    title: "Data & Intelligence",
    tagline: "Smart Business Intelligence Solutions",
    description: "Transform your data into strategic business intelligence. We build comprehensive BI solutions that combine data analytics, reporting, and predictive modeling to drive growth and competitive advantage.",
    heroBadge: "75+ BI Implementations",
    stats: [
      { value: "75+", label: "BI Projects" },
      { value: "98%", label: "Data Accuracy" },
      { value: "500+", label: "Reports Generated" },
      { value: "40+", label: "BI Specialists" }
    ],
    features: [
      { title: "Real-time Analytics", description: "Live data monitoring", icon: "⚡" },
      { title: "Predictive Modeling", description: "Forecast business trends", icon: "🔮" },
      { title: "Executive Dashboards", description: "C-level insights", icon: "📊" }
    ],
    benefits: ["Strategic insights", "Better decisions", "Competitive edge", "Operational efficiency"],
    ctaText: "Build Your BI Solution",
    lifecycle: [
      { step: 1, title: "Discovery", description: "Identify business questions and data.", duration: "1-2 weeks", icon: "🔍" },
      { step: 2, title: "Architecture", description: "Design BI system architecture.", duration: "2-3 weeks", icon: "🏗️" },
      { step: 3, title: "Development", description: "Build analytics and reporting.", duration: "6-10 weeks", icon: "💻" },
      { step: 4, title: "Integration", description: "Connect data sources.", duration: "2-4 weeks", icon: "🔗" },
      { step: 5, title: "Deployment", description: "Launch BI platform.", duration: "1-2 weeks", icon: "🚀" }
    ]
  },

  // Automation & Chatbot
  "automation-and-chatbot": {
    slug: "automation-and-chatbot",
    title: "Automation & Chatbot",
    tagline: "Intelligent Automation Solutions",
    description: "Revolutionize your customer service and operations with intelligent automation and chatbot solutions. We build conversational AI that handles inquiries 24/7 and automates repetitive tasks.",
    heroBadge: "200+ Bots Deployed",
    stats: [
      { value: "200+", label: "Chatbots Built" },
      { value: "95%", label: "Query Resolution" },
      { value: "1M+", label: "Conversations Monthly" },
      { value: "45+", label: "Automation Experts" }
    ],
    features: [
      { title: "NLP Chatbots", description: "Natural conversation handling", icon: "💬" },
      { title: "Process Automation", description: "Automate repetitive tasks", icon: "🤖" },
      { title: "Multi-channel Support", description: "Web, mobile, and social integration", icon: "📱" }
    ],
    benefits: ["24/7 support", "Cost reduction", "Better customer experience", "Increased efficiency"],
    ctaText: "Automate Your Business",
    lifecycle: [
      { step: 1, title: "Analysis", description: "Map automation opportunities.", duration: "1-2 weeks", icon: "🔍" },
      { step: 2, title: "Design", description: "Design conversation flows.", duration: "2-3 weeks", icon: "🎨" },
      { step: 3, title: "Development", description: "Build automation solutions.", duration: "4-8 weeks", icon: "🤖" },
      { step: 4, title: "Testing", description: "Test automation workflows.", duration: "2-3 weeks", icon: "🧪" },
      { step: 5, title: "Deployment", description: "Launch automation platform.", duration: "1-2 weeks", icon: "🚀" }
    ]
  },

  // Automation & Integration
  "automation-and-integration": {
    slug: "automation-and-integration",
    title: "Automation & Integration",
    tagline: "Seamless System Integration Solutions",
    description: "Connect and automate your entire business ecosystem. We integrate disparate systems, automate workflows, and create seamless data flow across your organization.",
    heroBadge: "150+ Integration Projects",
    stats: [
      { value: "150+", label: "Integrations" },
      { value: "99.5%", label: "Success Rate" },
      { value: "500+", label: "Workflows Automated" },
      { value: "35+", label: "Integration Experts" }
    ],
    features: [
      { title: "API Integration", description: "Connect systems via APIs", icon: "🔌" },
      { title: "Workflow Automation", description: "Automate business processes", icon: "⚙️" },
      { title: "Data Synchronization", description: "Real-time data sync", icon: "🔄" }
    ],
    benefits: ["Eliminated silos", "Improved efficiency", "Data consistency", "Cost savings"],
    ctaText: "Integrate Your Systems",
    lifecycle: [
      { step: 1, title: "Assessment", description: "Analyze existing systems.", duration: "1-2 weeks", icon: "🔍" },
      { step: 2, title: "Planning", description: "Design integration strategy.", duration: "2-3 weeks", icon: "📋" },
      { step: 3, title: "Implementation", description: "Build integrations.", duration: "4-8 weeks", icon: "🔗" },
      { step: 4, title: "Testing", description: "Test data flows.", duration: "2-3 weeks", icon: "🧪" },
      { step: 5, title: "Deployment", description: "Go live with integrations.", duration: "1 week", icon: "🚀" }
    ]
  },

  // Cloud & DevOps
  "cloud-and-devops": {
    slug: "cloud-and-devops",
    title: "Cloud & DevOps",
    tagline: "Modern Cloud Infrastructure Solutions",
    description: "Transform your infrastructure with cloud-native solutions and DevOps best practices. We build scalable, secure, and automated cloud environments that accelerate development cycles.",
    heroBadge: "200+ Cloud Migrations",
    stats: [
      { value: "200+", label: "Cloud Projects" },
      { value: "99.9%", label: "Uptime" },
      { value: "60%", label: "Cost Reduction" },
      { value: "40+", label: "Cloud Engineers" }
    ],
    features: [
      { title: "Cloud Migration", description: "Seamless cloud transition", icon: "☁️" },
      { title: "DevOps Automation", description: "CI/CD pipelines", icon: "🔄" },
      { title: "Infrastructure as Code", description: "Automated infrastructure", icon: "🏗️" }
    ],
    benefits: ["Scalability", "Reliability", "Cost efficiency", "Faster deployment"],
    ctaText: "Modernize Your Infrastructure",
    lifecycle: [
      { step: 1, title: "Assessment", description: "Evaluate current infrastructure.", duration: "1-2 weeks", icon: "🔍" },
      { step: 2, title: "Planning", description: "Design cloud strategy.", duration: "2-3 weeks", icon: "📋" },
      { step: 3, title: "Migration", description: "Migrate to cloud.", duration: "4-8 weeks", icon: "☁️" },
      { step: 4, title: "Optimization", description: "Fine-tune performance.", duration: "2-3 weeks", icon: "⚡" },
      { step: 5, title: "Monitoring", description: "Set up monitoring.", duration: "1 week", icon: "📊" }
    ]
  },

  // Database Services
  "database-services": {
    slug: "database-services",
    title: "Database Services",
    tagline: "Robust Database Management Solutions",
    description: "Design, optimize, and manage high-performance database systems that power your applications. We provide comprehensive database services ensuring data integrity, security, and scalability.",
    heroBadge: "300+ Database Implementations",
    stats: [
      { value: "300+", label: "Database Projects" },
      { value: "99.9%", label: "Data Integrity" },
      { value: "10TB+", label: "Data Managed" },
      { value: "50+", label: "DB Experts" }
    ],
    features: [
      { title: "Database Design", description: "Optimized schema design", icon: "🗄️" },
      { title: "Performance Optimization", description: "Query and index optimization", icon: "⚡" },
      { title: "Data Security", description: "Advanced security measures", icon: "🔒" }
    ],
    benefits: ["Data reliability", "Better performance", "Enhanced security", "Scalable storage"],
    ctaText: "Optimize Your Database",
    lifecycle: [
      { step: 1, title: "Analysis", description: "Analyze data requirements.", duration: "1-2 weeks", icon: "🔍" },
      { step: 2, title: "Design", description: "Design database schema.", duration: "2-3 weeks", icon: "🏗️" },
      { step: 3, title: "Implementation", description: "Build and deploy database.", duration: "4-6 weeks", icon: "⚙️" },
      { step: 4, title: "Optimization", description: "Tune performance.", duration: "2-3 weeks", icon: "⚡" },
      { step: 5, title: "Monitoring", description: "Set up monitoring.", duration: "1 week", icon: "📊" }
    ]
  },

  // Cybersecurity
  "cybersecurity": {
    slug: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Comprehensive Security Solutions",
    description: "Protect your digital assets with advanced cybersecurity solutions. We implement multi-layered security strategies to safeguard your data, systems, and reputation from evolving threats.",
    heroBadge: "100+ Security Audits Completed",
    stats: [
      { value: "100+", label: "Security Projects" },
      { value: "99.9%", label: "Threat Prevention" },
      { value: "24/7", label: "Security Monitoring" },
      { value: "30+", label: "Security Experts" }
    ],
    features: [
      { title: "Security Assessment", description: "Comprehensive security audits", icon: "🔍" },
      { title: "Threat Detection", description: "Real-time threat monitoring", icon: "🚨" },
      { title: "Incident Response", description: "Rapid response to security events", icon: "🚨" }
    ],
    benefits: ["Enhanced protection", "Compliance assurance", "Risk mitigation", "Business continuity"],
    ctaText: "Secure Your Business",
    lifecycle: [
      { step: 1, title: "Assessment", description: "Security audit and risk analysis.", duration: "1-2 weeks", icon: "🔍" },
      { step: 2, title: "Planning", description: "Security strategy design.", duration: "2-3 weeks", icon: "📋" },
      { step: 3, title: "Implementation", description: "Deploy security measures.", duration: "4-6 weeks", icon: "🛡️" },
      { step: 4, title: "Testing", description: "Security testing.", duration: "2-3 weeks", icon: "🧪" },
      { step: 5, title: "Monitoring", description: "Set up security monitoring.", duration: "1 week", icon: "📊" }
    ]
  },

  // Testing & QA
  "testing-and-qa": {
    slug: "testing-and-qa",
    title: "Testing & QA",
    tagline: "Quality Assurance Solutions",
    description: "Ensure software excellence through comprehensive testing and quality assurance. We implement robust testing strategies to deliver bug-free, high-performance applications that exceed user expectations.",
    heroBadge: "500+ Testing Projects",
    stats: [
      { value: "500+", label: "Test Projects" },
      { value: "99.5%", label: "Bug Detection" },
      { value: "10K+", label: "Tests Run" },
      { value: "40+", label: "QA Engineers" }
    ],
    features: [
      { title: "Automated Testing", description: "Comprehensive test automation", icon: "🤖" },
      { title: "Performance Testing", description: "Load and stress testing", icon: "⚡" },
      { title: "Security Testing", description: "Vulnerability assessment", icon: "🔒" }
    ],
    benefits: ["Quality assurance", "Reduced bugs", "Better performance", "User satisfaction"],
    ctaText: "Ensure Your Quality",
    lifecycle: [
      { step: 1, title: "Planning", description: "Test strategy design.", duration: "1-2 weeks", icon: "📋" },
      { step: 2, title: "Setup", description: "Test environment setup.", duration: "1 week", icon: "⚙️" },
      { step: 3, title: "Execution", description: "Run comprehensive tests.", duration: "4-8 weeks", icon: "🧪" },
      { step: 4, title: "Analysis", description: "Analyze test results.", duration: "1-2 weeks", icon: "📊" },
      { step: 5, title: "Reporting", description: "Generate test reports.", duration: "1 week", icon: "📋" }
    ]
  },

  // Support & Outsourcing
  "support-and-outsourcing": {
    slug: "support-and-outsourcing",
    title: "Support & Outsourcing",
    tagline: "Dedicated Support Solutions",
    description: "Access expert technical support and development resources on-demand. We provide comprehensive support services and dedicated development teams to extend your capabilities and ensure smooth operations.",
    heroBadge: "200+ Support Contracts",
    stats: [
      { value: "200+", label: "Support Clients" },
      { value: "98%", label: "Satisfaction Rate" },
      { value: "24/7", label: "Support Availability" },
      { value: "60+", label: "Support Engineers" }
    ],
    features: [
      { title: "24/7 Support", description: "Round-the-clock assistance", icon: "🕐" },
      { title: "Dedicated Teams", description: "Expert development resources", icon: "👥" },
      { title: "SLA Management", description: "Service level agreements", icon: "📊" }
    ],
    benefits: ["Expert access", "Cost efficiency", "Focus on core business", "Scalable support"],
    ctaText: "Get Expert Support",
    lifecycle: [
      { step: 1, title: "Assessment", description: "Support needs analysis.", duration: "1 week", icon: "🔍" },
      { step: 2, title: "Planning", description: "Support strategy design.", duration: "1-2 weeks", icon: "📋" },
      { step: 3, title: "Setup", description: "Establish support processes.", duration: "2-3 weeks", icon: "⚙️" },
      { step: 4, title: "Execution", description: "Provide ongoing support.", duration: "Ongoing", icon: "👥" },
      { step: 5, title: "Review", description: "Regular performance reviews.", duration: "Monthly", icon: "📊" }
    ]
  },

  // Blockchain & Web3
  "blockchain-and-web3": {
    slug: "blockchain-and-web3",
    title: "Blockchain & Web3",
    tagline: "Decentralized Future Solutions",
    description: "Build the future of decentralized applications and Web3 solutions. We develop smart contracts, DApps, and blockchain infrastructure that leverage the power of distributed ledger technology.",
    heroBadge: "50+ Blockchain Projects",
    stats: [
      { value: "50+", label: "Blockchain Projects" },
      { value: "99.9%", label: "Contract Security" },
      { value: "1M+", label: "Transactions Processed" },
      { value: "25+", label: "Blockchain Experts" }
    ],
    features: [
      { title: "Smart Contracts", description: "Secure automated agreements", icon: "📜" },
      { title: "DApp Development", description: "Decentralized applications", icon: "🌐" },
      { title: "Token Integration", description: "Digital asset solutions", icon: "🪙" }
    ],
    benefits: ["Decentralization", "Transparency", "Security", "New revenue models"],
    ctaText: "Build Web3 Solution",
    lifecycle: [
      { step: 1, title: "Concept", description: "Define blockchain use case.", duration: "1-2 weeks", icon: "💡" },
      { step: 2, title: "Architecture", description: "Design blockchain solution.", duration: "2-4 weeks", icon: "🏗️" },
      { step: 3, title: "Development", description: "Build smart contracts/DApps.", duration: "8-12 weeks", icon: "⚙️" },
      { step: 4, title: "Testing", description: "Test on testnet.", duration: "2-3 weeks", icon: "🧪" },
      { step: 5, title: "Deployment", description: "Deploy to mainnet.", duration: "1-2 weeks", icon: "🚀" }
    ]
  },

  // IoT & Emerging Tech
  "iot-and-emerging-tech": {
    slug: "iot-and-emerging-tech",
    title: "IoT & Emerging Tech",
    tagline: "Connected Future Solutions",
    description: "Transform your business with Internet of Things and emerging technologies. We build connected ecosystems that integrate sensors, devices, and advanced technologies for real-time monitoring and automation.",
    heroBadge: "75+ IoT Implementations",
    stats: [
      { value: "75+", label: "IoT Projects" },
      { value: "99.5%", label: "Device Uptime" },
      { value: "10K+", label: "Connected Devices" },
      { value: "30+", label: "IoT Experts" }
    ],
    features: [
      { title: "IoT Integration", description: "Connect smart devices", icon: "🌐" },
      { title: "Edge Computing", description: "Process data locally", icon: "🔲" },
      { title: "Real-time Monitoring", description: "Live device tracking", icon: "📊" }
    ],
    benefits: ["Real-time insights", "Automation", "Efficiency gains", "New revenue streams"],
    ctaText: "Connect Your Future",
    lifecycle: [
      { step: 1, title: "Assessment", description: "IoT opportunity analysis.", duration: "1-2 weeks", icon: "🔍" },
      { step: 2, title: "Planning", description: "IoT architecture design.", duration: "2-3 weeks", icon: "📋" },
      { step: 3, title: "Development", description: "Build IoT solutions.", duration: "4-8 weeks", icon: "🔧" },
      { step: 4, title: "Integration", description: "Connect devices.", duration: "2-4 weeks", icon: "🔗" },
      { step: 5, title: "Deployment", description: "Deploy IoT ecosystem.", duration: "1-2 weeks", icon: "🚀" }
    ]
  },

  // Immersive Tech
  "immersive-tech": {
    slug: "immersive-tech",
    title: "Immersive Tech",
    tagline: "Next-Generation Experience Solutions",
    description: "Create immersive digital experiences with AR, VR, and mixed reality technologies. We build cutting-edge solutions that transform how users interact with digital content and environments.",
    heroBadge: "25+ Immersive Projects",
    stats: [
      { value: "25+", label: "Immersive Projects" },
      { value: "95%", label: "User Engagement" },
      { value: "500K+", label: "Experiences Created" },
      { value: "20+", label: "XR Developers" }
    ],
    features: [
      { title: "AR Development", description: "Augmented reality experiences", icon: "📱" },
      { title: "VR Solutions", description: "Virtual reality applications", icon: "🥽" },
      { title: "Mixed Reality", description: "Blend physical and digital", icon: "🌐" }
    ],
    benefits: ["Enhanced engagement", "Innovative experiences", "Competitive edge", "Future-proof technology"],
    ctaText: "Build Immersive Experience",
    lifecycle: [
      { step: 1, title: "Concept", description: "Define immersive experience.", duration: "1-2 weeks", icon: "💡" },
      { step: 2, title: "Design", description: "Create 3D/AR/VR content.", duration: "2-4 weeks", icon: "🎨" },
      { step: 3, title: "Development", description: "Build immersive applications.", duration: "6-10 weeks", icon: "🥽" },
      { step: 4, title: "Testing", description: "Test immersive experiences.", duration: "2-3 weeks", icon: "🧪" },
      { step: 5, title: "Deployment", description: "Launch immersive platform.", duration: "1-2 weeks", icon: "🚀" }
    ]
  }
};

// Helper function to get service data by slug
export function getServiceData(slug: string): ServiceData | null {
  return servicesData[slug] || null;
}

// Get all service slugs for static generation
export function getAllServiceSlugs(): string[] {
  return Object.keys(servicesData);
}