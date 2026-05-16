/**
 * Global Portfolio Data
 * This manifest drives the content within the discovery modals.
 * Structure is designed for high-end business and technical analysis.
 */

const PORTFOLIO_DATA = {
    experience: {
        id: 'exp',
        category: 'BIOGRAPHY & TENURE',
        title: '20+ Years of Engineering',
        description: 'Architecting high-scale systems and award-winning digital experiences. Expertise in bridging the gap between complex business requirements and high-performance software execution. Specializing in UI/UX systems that have generated over $10M in value across 100+ shipped products.',
        tags: ['System Architecture', 'Requirement Elicitation', 'Team Leadership', 'Context Analysis'],
        complexity: 95,
        impact: 98
    },
    skills: {
        id: 'skills',
        category: 'TECHNICAL ARSENAL',
        title: 'Binary Expertise',
        description: 'A dual-hemisphere approach to development. The "Lava" represents the heat of backend logic, high-concurrency systems, and robust architecture. The "Ice" represents the precision of UI/UX design, user psychology, and pixel-perfect front-end conformance.',
        tags: ['Vanilla JS', 'Canvas API', 'Optimization', 'Requirement Conformance', 'UX Psychology'],
        complexity: 90,
        impact: 85
    },
    projects: {
        id: 'projects',
        category: 'GALLERY OF EXCELLENCE',
        title: 'Award-Winning Artifacts',
        description: 'A collection of $10,000+ tier websites. Each project is a case study in performance, accessibility, and business goal alignment. These are not just websites; they are high-conversion engines built with architectural integrity.',
        tags: ['E-Commerce', 'FinTech', 'SaaS', 'Interactive Media'],
        complexity: 88,
        impact: 99
    },
    easterEgg: {
        id: 'void',
        category: 'HIDDEN NEXUS',
        title: 'The Unseen Variable',
        description: 'You have discovered the void logic. This represents the ability to find solutions in the most ambiguous requirement environments.',
        tags: ['Problem Solving', 'Adaptability', 'Critical Thinking'],
        complexity: 100,
        impact: 100
    }
};

// Export for module usage
if (typeof module !== 'undefined') {
    module.exports = PORTFOLIO_DATA;
} else {
    window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}