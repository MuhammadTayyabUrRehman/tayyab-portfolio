import { Planet } from './planet.js';
import { SurfaceGenerator } from '../engine/shading.js';

export class ElementalPlanet extends Planet {
    constructor(id, x, y, size, data) {
        super(id, x, y, size, data);
        // Pre-render texture to save GPU cycles in the runLoop
        this.texture = SurfaceGenerator.createTexture(size, 'LAVA_ICE');
        this.glowPulse = 0;
    }

    update() {
        super.update();
        this.glowPulse = Math.sin(Date.now() / 1000) * 20;
    }

    draw(ctx, cameraOffset) {
        const screenX = this.x - cameraOffset.x;
        const screenY = this.y - cameraOffset.y;

        ctx.save();
        ctx.translate(screenX, screenY);
        
        // 1. Core Procedural Surface
        ctx.drawImage(this.texture, -this.size, -this.size);

        // 2. Atmospheric Conflict (Lava vs Ice Glow) — intensifies on hover
        const hoverBoost = this.isHovered ? 1.6 : 1;
        const outerGlow = ctx.createRadialGradient(0, 0, this.size * 0.8, 0, 0, this.size * 1.5);
        outerGlow.addColorStop(0, `rgba(255, 69, 0, ${0.2 * hoverBoost})`);
        outerGlow.addColorStop(0.5, `rgba(0, 242, 255, ${0.1 * hoverBoost})`);
        outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 1.5 + (this.glowPulse / 2) + (this.isHovered ? 15 : 0), 0, Math.PI * 2);
        ctx.fill();

        // 3. Label with Tech Shadow
        ctx.font = "bold 10px 'Syncopate'";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff4500";
        ctx.fillText("ELEMENTAL SKILLS", 0, this.size + 40);

        ctx.restore();
    }
}