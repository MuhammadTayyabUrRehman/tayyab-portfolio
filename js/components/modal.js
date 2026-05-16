/**
 * Modal Component
 * Handles the "Discovery" UI when a planet is clicked.
 * Uses CSS classes for hardware-accelerated transitions.
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
     * @param {Object} content - Data passed from the clicked planet
     */
    open(content) {
        // Prevent body scroll (even though universe is no-scroll, safety first)
        document.body.classList.add('modal-open');
        
        // Inject content with a staggered fade-in effect
        this.body.innerHTML = `
            <div class="discovery-header">
                <span class="category-tag">${content.category || 'DEEP SPACE'}</span>
                <h2>${content.title}</h2>
            </div>
            <div class="discovery-grid">
                <div class="discovery-description">
                    <p>${content.description}</p>
                    <div class="tech-stack">
                        ${content.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="discovery-stats">
                    <div class="stat-box">
                        <span class="label">Complexity</span>
                        <div class="bar"><div class="fill" style="width: ${content.complexity}%"></div></div>
                    </div>
                    <div class="stat-box">
                        <span class="label">Impact</span>
                        <div class="bar"><div class="fill" style="width: ${content.impact}%"></div></div>
                    </div>
                </div>
            </div>
        `;

        // Show the overlay
        this.overlay.classList.remove('modal-hidden');
        this.overlay.classList.add('modal-visible');
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