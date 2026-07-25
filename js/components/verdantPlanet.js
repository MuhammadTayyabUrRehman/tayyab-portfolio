import { Planet } from './planet.js';

export class VerdantPlanet extends Planet {
    constructor(id, x, y, size, data) {
        super(id, x, y, size, data);
        this.atmosphereColor = 'rgba(0, 255, 150, 0.2)';
    }

    draw(ctx, cameraOffset) {
        const screenX = this.x - cameraOffset.x;
        const screenY = this.y - cameraOffset.y;

        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.rotate(this.rotation);

        // 1. Atmosphere Glow (brightens on hover for the "discovering a world" feel)
        const glowSize = this.isHovered ? this.size * 1.45 : this.size * 1.2;
        const glowAlpha = this.isHovered ? 0.7 : 0.4;
        const gradient = ctx.createRadialGradient(0, 0, this.size * 0.8, 0, 0, glowSize);
        gradient.addColorStop(0, `rgba(46, 204, 113, ${glowAlpha})`);
        gradient.addColorStop(1, 'rgba(46, 204, 113, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // 2. Planet Core (The "Green" Landmasses)
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#1e3d2b'; // Dark deep forest
        ctx.fill();

        // 3. Procedural "Continents" using simple noise-like circles
        ctx.fillStyle = '#2ecc71';
        for(let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5;
            const cx = Math.cos(angle) * (this.size * 0.4);
            const cy = Math.sin(angle) * (this.size * 0.4);
            ctx.beginPath();
            ctx.arc(cx, cy, this.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // 4. Label (UI/UX touch)
        ctx.rotate(-this.rotation); // Counter-rotate text so it stays upright
        ctx.font = "bold 12px 'Space Grotesk'";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(this.data.title.toUpperCase(), 0, this.size + 30);
        
        ctx.restore();
    }
}