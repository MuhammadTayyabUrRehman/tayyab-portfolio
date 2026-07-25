/**
 * Global Portfolio Data
 * Muhammad Tayyab ur Rehman — Portfolio Manifest
 * Source of truth: DATA-README.md — every field below is transcribed
 * from that document. No metrics, achievements, or technologies are
 * invented; nothing here should be added to without updating the source.
 */

const PORTFOLIO_DATA = {
    // Planet 01 — Experience (Green / Verdant)
    experience: {
        id: 'exp',
        category: 'EXPERIENCE',
        title: 'Software Engineering Student & Full-Stack Developer',
        summary: 'Motivated Software Engineering student with practical experience building AI-powered applications, full-stack web platforms, Retrieval-Augmented Generation systems, and Android applications through internships, university projects, and personal development. Comfortable working across frontend, backend, databases, cloud platforms, and modern AI technologies. Passionate about designing scalable software systems that solve real-world problems while creating intuitive user experiences.',
        education: [
            {
                degree: 'Bachelor of Software Engineering',
                institution: 'National University of Technology (NUTECH), Islamabad',
                duration: '2023 – 2027'
            },
            {
                degree: 'Intermediate',
                institution: 'Punjab Group of Colleges, Jand, Attock',
                duration: ''
            }
        ],
        timeline: [
            {
                role: 'Full Stack Developer Intern',
                org: 'Techora',
                type: 'Remote Internship',
                duration: '1 Month',
                points: [
                    'Worked as a Full Stack Developer.',
                    'Contributed to frontend and backend development tasks.',
                    'Collaborated remotely with the development team.',
                    'Gained practical experience working on production-oriented software.'
                ]
            },
            {
                role: 'IT & Investment Intern',
                org: 'Government of Pakistan — Finance Division',
                type: 'Onsite Internship',
                duration: '1 Month',
                points: [
                    'Assisted with IT-related tasks.',
                    'Worked on investment-oriented assignments.',
                    'Learned software workflows used in government environments.',
                    'Received exposure to SAP-based government financial management systems.',
                    'Learned how employee payroll and allowance records are managed through enterprise software.'
                ]
            }
        ]
    },

    // Planet 02 — Skills (Orange / Lava)
    skills: {
        id: 'skills',
        category: 'TECHNICAL STACK',
        title: 'Technical Skills & Tools',
        description: 'Technologies and tools used across frontend, backend, mobile, databases, and applied AI development.',
        stack: {
            Languages: ['JavaScript', 'TypeScript', 'Java', 'C++', 'SQL', 'HTML5', 'CSS3'],
            Frontend: ['React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap'],
            Backend: ['Node.js', 'Express.js', 'REST APIs', 'LangChain'],
            Mobile: ['Android Studio', 'Java', 'Firebase Authentication'],
            Databases: ['PostgreSQL', 'Supabase (pgvector)', 'MongoDB', 'MySQL'],
            'Artificial Intelligence': ['OpenAI API', 'OpenAI Embeddings', 'Retrieval-Augmented Generation (RAG)'],
            Tools: ['Git', 'GitHub', 'Postman', 'VS Code', 'Figma']
        },
        coreStrengths: [
            'Full Stack Development',
            'Artificial Intelligence',
            'Retrieval-Augmented Generation',
            'Mobile Application Development',
            'REST API Development',
            'Database Design',
            'Responsive UI Development',
            'Problem Solving',
            'Team Collaboration',
            'Continuous Learning'
        ]
    },

    // Planet 03 — Projects (Purple / Neon)
    projects: {
        id: 'projects',
        category: 'FEATURED PROJECTS',
        title: 'Featured Projects',
        description: 'AI systems, full-stack platforms, and mobile applications built through university work and independent development.',
        items: [
            {
                name: 'Indus-RAG',
                category: 'Artificial Intelligence · Full Stack',
                description: 'Production-grade Retrieval-Augmented Generation (RAG) knowledge engine built for scalable semantic search and intelligent document retrieval.',
                tech: ['Next.js 16', 'TypeScript', 'LangChain', 'OpenAI Embeddings', 'PostgreSQL', 'Supabase', 'pgvector', 'Tailwind CSS'],
                highlights: [
                    'Document ingestion pipeline',
                    'Vector embedding generation',
                    'Hybrid semantic search',
                    'Full-text search',
                    'Context-aware AI responses',
                    'Production-ready architecture',
                    'Low latency retrieval',
                    'Modular design'
                ]
            },
            {
                name: 'Cyberahat',
                category: 'AI · Cybersecurity · Education',
                description: "An AI-powered cybersecurity learning platform built around Google's Gemma model.",
                tech: ['Gemma', 'AI Agents', 'Linux', 'Security Tools'],
                highlights: [
                    'AI-assisted cybersecurity learning',
                    'Interactive cybersecurity courses',
                    'Built-in Linux command laboratory',
                    'AI knowledge coach',
                    'Student progress tracking',
                    'Automatic quiz generation',
                    'Personalized course generation',
                    'Security scanner using Nmap and SQL-based scanning',
                    'AI-generated vulnerability reports, mitigation recommendations, and prevention strategies'
                ]
            },
            {
                name: 'Spotify One-Page Music Streaming App',
                category: 'Frontend',
                description: 'A modern React single-page music streaming application.',
                tech: ['React.js', 'React Router', 'Context API'],
                highlights: [
                    'React Router navigation',
                    'Music synchronization',
                    'Context API',
                    'Browser history integration',
                    'Responsive UI',
                    'Reusable components'
                ]
            },
            {
                name: 'Nexus AI',
                category: 'Artificial Intelligence',
                description: 'AI-powered learning assistant created to help beginner developers understand debugging and AI-assisted software development workflows.',
                tech: [],
                highlights: [
                    'AI-assisted debugging',
                    'Learning companion',
                    'Practical AI coding assistance',
                    'Beginner-friendly workflows'
                ]
            },
            {
                name: 'Coffee Shop Mobile Application',
                category: 'Android',
                description: 'Android application developed using Android Studio with Firebase Authentication.',
                tech: ['Android Studio', 'Java', 'Firebase Authentication'],
                highlights: [
                    'User registration',
                    'Login system',
                    'Secure authentication',
                    'Mobile-first interface'
                ]
            }
        ]
    },

    // Planet 04 — Transmission (Contact)
    contact: {
        id: 'contact',
        category: 'TRANSMISSION',
        title: 'Open a Channel',
        description: 'Rawalpindi, Pakistan. Open to internships, collaboration, and interesting engineering problems — reach out through any of the channels below.',
        links: [
            { label: 'GitHub', value: 'https://github.com/MuhammadTayyabUrRehman/' },
            { label: 'Primary Email', value: 'muhammadtayyabf23@nutech.edu.pk' },
            { label: 'Secondary Email', value: 'mtur2004rehman@gmail.com' },
            { label: 'WhatsApp', value: '+92 348 5245317', href: 'https://wa.me/923485245317' },
            { label: 'Phone', value: '0317 5657292', href: 'tel:03175657292' }
        ]
    }
};

// Export for module usage
if (typeof module !== 'undefined') {
    module.exports = PORTFOLIO_DATA;
} else {
    window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
