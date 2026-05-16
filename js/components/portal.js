/**
 * Sling-Ring Portal Engine (v2.0.0)
 * Purpose: High-fidelity "Doctor Strange" style entrance.
 * Logic: Polar coordinate particle emission with life-cycle decay.
 */
export class Portal {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.radius = 0;
        this.targetRadius = 250; // Final size
        this.isOpening = true;
        this.openingSpeed = 3.5;
        this.rotation = 0;
    }

    mount(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.animate();
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth * window.devicePixelRatio;
        this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    createSpark() {
        // Emit sparks specifically from the circumference of the current radius
        const angle = Math.random() * Math.PI * 2;
        return {
            x: (this.canvas.offsetWidth / 2) + Math.cos(angle) * this.radius,
            y: (this.canvas.offsetHeight / 2) + Math.sin(angle) * this.radius,
            vx: (Math.random() - 0.5) * 8 + (Math.cos(angle) * 2), // Radial outward push
            vy: (Math.random() - 0.5) * 8 + (Math.sin(angle) * 2),
            life: 1.0,
            decay: 0.02 + Math.random() * 0.03,
            size: 1 + Math.random() * 3,
            color: `rgb(255, ${100 + Math.random() * 155}, 0)` // Fiery orange/yellow
        };
    }

    animate() {
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;
        
        // Expansion Logic (The "Marvel" Growth)
        if (this.isOpening && this.radius < this.targetRadius) {
            this.radius += this.openingSpeed;
        }

        this.ctx.clearRect(0, 0, width, height);

        // Generate Sparks
        if (this.radius > 5) {
            for (let i = 0; i < 8; i++) {
                this.particles.push(this.createSpark());
            }
        }

        // Update and Draw Particles
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;

            if (p.life > 0) {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = p.life;
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = p.color;
                this.ctx.fill();
                return true;
            }
            return false;
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        cancelAnimationFrame(this.animationId);
    }
}