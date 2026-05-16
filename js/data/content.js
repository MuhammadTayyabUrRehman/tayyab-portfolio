/**
 * Global Portfolio Data
 * Personalized Portfolio Manifest
 */

const PORTFOLIO_DATA = {
    experience: {
        id: 'exp',
        category: 'EDUCATION & DEVELOPMENT',
        title: 'Software Engineering Student',
        description: 'Software Engineering student at NUtech currently in 6th semester with practical experience in frontend development,  SQL databases, and AI automation systems. Passionate about building modern digital experiences and continuously learning emerging technologies.',
        tags: ['React.js', 'Node.js', 'Java', 'SQL', 'Problem Solving'],
        complexity: 78,
        impact: 82
    },

    skills: {
        id: 'skills',
        category: 'TECHNICAL SKILLS',
        title: 'Development & Design Stack',
        description: 'Focused on modern web development, UI/UX design, and backend integration. Experienced with React frontend development, Node.js backend basics, Java OOP concepts, SQL database handling, and responsive UI design principles.',
        tags: ['React + Vite', 'UI/UX Design', 'Java OOP', 'Data Structures', 'REST APIs'],
        complexity: 80,
        impact: 84
    },

    projects: {
        id: 'projects',
        category: 'FEATURED PROJECTS',
        title: 'Academic & Personal Projects',
        description: 'Developed multiple academic and personal projects including AI automation systems, responsive frontend applications, Java-based management systems, and UI/UX mockups. Projects emphasize clean design, functionality, and practical implementation.',
        tags: ['AI RAG System', 'University Management System', 'Spotify Clone', 'Facebook Mockup'],
        complexity: 83,
        impact: 88
    },

    easterEgg: {
        id: 'void',
        category: 'CORE STRENGTHS',
        title: 'Quick Learner Mindset',
        description: 'Strong research abilities with adaptability to learn new technologies quickly. Focused on improving technical expertise in AI automation, web engineering, and user-centered design through continuous practice and experimentation.',
        tags: ['Research Skills', 'Adaptability', 'Critical Thinking'],
        complexity: 92,
        impact: 90
    }
};

// Export for module usage
if (typeof module !== 'undefined') {
    module.exports = PORTFOLIO_DATA;
} else {
    window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}