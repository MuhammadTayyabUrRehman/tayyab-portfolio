/**
 * SplashStation
 * Purpose: Drives the observation-deck intro (GSAP fade-in choreography)
 * and the "Begin Mission" portal-burst transition into the universe.
 */
export class SplashStation {
    constructor() {
        this.section = document.getElementById('splash-portal');
        this.video = document.getElementById('splash-video');
        this.button = document.getElementById('begin-mission-btn');
        this.canvas = document.getElementById('portal-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.burstAnimationId = null;
    }

    mount() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.playIntro();
        this.initMagneticButton();

        // Some browsers hold autoplay until the tab is interacted with;
        // this keeps the loop resilient without ever gating "Begin Mission".
        this.video.play().catch(() => {});
    }

    /**
     * Subtle magnetic pull toward the cursor — reinforces the "gateway"
     * feel without being a flashy, constant effect.
     */
    initMagneticButton() {
        const strength = 0.25;
        this.button.addEventListener('mousemove', (e) => {
            const rect = this.button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(this.button, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out' });
        });
        this.button.addEventListener('mouseleave', () => {
            gsap.to(this.button, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        });
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    playIntro() {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to('.hud-tag--right', { opacity: 1, duration: 0.8 }, 0.2)
          .from('.mission-preamble', { y: 12, duration: 0.9 }, 0.4)
          .to('.mission-preamble', { opacity: 1, duration: 0.9 }, 0.4)
          .from('.splash-title', { y: 18, duration: 1, ease: 'power2.out' }, 0.75)
          .to('.splash-title', { opacity: 1, duration: 1 }, 0.75)
          .from('.splash-copy', { y: 14, duration: 0.9 }, 1.05)
          .to('.splash-copy', { opacity: 1, duration: 0.9 }, 1.05)
          .to('.cta-divider', { opacity: 1, duration: 0.6 }, 1.5)
          .to('.mission-btn', { opacity: 1, duration: 0.8 }, 1.65)
          .to('.splash-hint', { opacity: 1, duration: 0.8 }, 1.95)
          .to('.splash-footbar .hud-tag', { opacity: 1, duration: 0.8, stagger: 0.15 }, 1.6);
    }

    /**
     * Portal-burst transition: cyan particles rush outward from the
     * button's origin, the HUD/video dissolve, and the universe fades in.
     */
    launch(onComplete) {
        if (this.section.classList.contains('is-transitioning')) return;

        const rect = this.button.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;

        this.button.classList.add('is-launching');
        this.section.classList.add('is-transitioning');
        gsap.to(this.canvas, { opacity: 1, duration: 0.3 });

        this.spawnBurst(originX, originY);
        this.runBurst();

        gsap.to(this.video, { scale: 1.15, duration: 2.4, ease: 'power2.out' });

        gsap.delayedCall(1.9, () => {
            this.section.classList.add('dissolved');
            cancelAnimationFrame(this.burstAnimationId);
            if (onComplete) onComplete();
        });
    }

    spawnBurst(originX, originY) {
        const count = 140;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 4 + Math.random() * 10;
            this.particles.push({
                x: originX,
                y: originY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.008 + Math.random() * 0.015,
                size: 1 + Math.random() * 2.5
            });
        }
    }

    runBurst() {
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);
        this.ctx.clearRect(0, 0, width, height);

        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.985;
            p.vy *= 0.985;
            p.life -= p.decay;
            if (p.life <= 0) return false;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 200, ${p.life})`;
            this.ctx.shadowBlur = 12;
            this.ctx.shadowColor = 'rgba(0, 255, 200, 0.8)';
            this.ctx.fill();
            return true;
        });

        this.burstAnimationId = requestAnimationFrame(() => this.runBurst());
    }

    destroy() {
        cancelAnimationFrame(this.burstAnimationId);
        this.section.remove();
    }
}
