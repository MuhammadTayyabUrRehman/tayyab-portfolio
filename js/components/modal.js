/**
 * Modal Component
 * Handles the "Discovery" UI when a planet is clicked.
 * Renders a layout tailored to each planet's data shape (experience,
 * skills, projects, contact) rather than one generic template.
 */
export class DiscoveryModal {
    constructor() {
        this.overlay = document.getElementById('discovery-overlay');
        this.body = document.getElementById('modal-body-injector');
        this.closeBtn = this.overlay.querySelector('.close-btn');

        this.init();
    }

    init() {
        this.closeBtn.addEventListener('click', () => this.close());

        // Close on backdrop click (UX Best Practice)
        this.overlay.querySelector('.modal-backdrop').addEventListener('click', () => this.close());

        // Keyboard support for accessibility (Top 1% Engineering)
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }

    /**
     * @param {Object} content - Data passed from the clicked planet (js/data/content.js)
     */
    open(content) {
        document.body.classList.add('modal-open');

        this.body.innerHTML = `
            <div class="discovery-header">
                <span class="category-tag">${content.category || 'DEEP SPACE'}</span>
                <h2>${content.title}</h2>
            </div>
            ${this.renderBody(content)}
        `;

        this.overlay.classList.remove('modal-hidden');
        this.overlay.classList.add('modal-visible');
    }

    renderBody(content) {
        switch (content.id) {
            case 'exp': return this.renderExperience(content);
            case 'skills': return this.renderSkills(content);
            case 'projects': return this.renderProjects(content);
            case 'contact': return this.renderContact(content);
            default: return '';
        }
    }

    renderExperience(content) {
        return `
            <div class="discovery-body">
                <p class="discovery-summary">${content.summary}</p>

                <h3 class="discovery-subhead">Education</h3>
                <div class="education-list">
                    ${content.education.map(e => `
                        <div class="education-item">
                            <span class="education-degree">${e.degree}</span>
                            <span class="education-institution">${e.institution}</span>
                            ${e.duration ? `<span class="education-duration">${e.duration}</span>` : ''}
                        </div>
                    `).join('')}
                </div>

                <h3 class="discovery-subhead">Experience Timeline</h3>
                <div class="timeline-list">
                    ${content.timeline.map(t => `
                        <div class="timeline-item">
                            <div class="timeline-item-head">
                                <span class="timeline-role">${t.role}</span>
                                <span class="timeline-duration">${t.duration}</span>
                            </div>
                            <span class="timeline-org">${t.org} — ${t.type}</span>
                            <ul class="timeline-points">
                                ${t.points.map(p => `<li>${p}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderSkills(content) {
        return `
            <div class="discovery-body">
                <p class="discovery-summary">${content.description}</p>

                <div class="stack-grid">
                    ${Object.entries(content.stack).map(([category, items]) => `
                        <div class="stack-category">
                            <span class="stack-category-label">${category}</span>
                            <div class="tech-stack">
                                ${items.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <h3 class="discovery-subhead">Core Strengths</h3>
                <div class="tech-stack">
                    ${content.coreStrengths.map(s => `<span class="tag tag--strength">${s}</span>`).join('')}
                </div>
            </div>
        `;
    }

    renderProjects(content) {
        return `
            <div class="discovery-body">
                <p class="discovery-summary">${content.description}</p>

                <div class="project-list">
                    ${content.items.map(p => `
                        <div class="project-card">
                            <div class="project-card-head">
                                <span class="project-name">${p.name}</span>
                                <span class="project-category">${p.category}</span>
                            </div>
                            <p class="project-description">${p.description}</p>
                            ${p.tech.length ? `
                                <div class="tech-stack">
                                    ${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}
                                </div>` : ''}
                            <ul class="project-highlights">
                                ${p.highlights.map(h => `<li>${h}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderContact(content) {
        return `
            <div class="discovery-body">
                <p class="discovery-summary">${content.description}</p>
                <div class="discovery-links">
                    ${content.links.map(link => `
                        <a class="transmission-link" href="${link.href || (link.value.startsWith('http') ? link.value : (link.label.toLowerCase().includes('email') ? `mailto:${link.value}` : '#'))}"
                           target="_blank" rel="noopener noreferrer">
                            <span class="transmission-link-label">${link.label}</span>
                            <span class="transmission-link-value">${link.value}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    close() {
        this.overlay.classList.remove('modal-visible');

        // Delay hiding display until animation finishes
        setTimeout(() => {
            if (!this.overlay.classList.contains('modal-visible')) {
                this.overlay.classList.add('modal-hidden');
            }
        }, 500);

        document.body.classList.remove('modal-open');
    }
}
