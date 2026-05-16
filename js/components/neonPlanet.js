import { Planet } from './planet.js';

/**
 * NeonPlanet Component
 * High-end gas giant with simulated atmospheric rays.
 */
export class NeonPlanet extends Planet {
    constructor(id, x, y, size, data) {
        super(id, x, y, size, data);
        this.rayRotation = 0;
    }

    update() {
        super.update();
        // The rays rotate at a different speed than the core for a parallax effect
        this.rayRotation += 0.002;
    }

    draw(ctx, cameraOffset) {
        const screenX = this.x - cameraOffset.x;
        const screenY = this.y - cameraOffset.y;

        ctx.save();
        ctx.translate(screenX, screenY);

        // 1. Neon Atmosphere Rays (The "Off-guard" Visual)
        ctx.save();
        ctx.rotate(this.rayRotation);
        for (let i = 0; i < 8; i++) {
            ctx.rotate(Math.PI / 4);
            const rayGradient = ctx.createLinearGradient(0, 0, 0, this.size * 2);
            rayGradient.addColorStop(0, 'rgba(180, 0, 255, 0.4)');
            rayGradient.addColorStop(1, 'rgba(180, 0, 255, 0)');
            
            ctx.fillStyle = rayGradient;
            // Draw a thin triangle/ray
            ctx.beginPath();
            ctx.moveTo(-2, 0);
            ctx.lineTo(2, 0);
            ctx.lineTo(0, this.size * 2.5);
            ctx.fill();
        }
        ctx.restore();

        // 2. The Core Gas Giant
        const coreGradient = ctx.createRadialGradient(
            -this.size * 0.3, -this.size * 0.3, this.size * 0.1,
            0, 0, this.size
        );
        coreGradient.addColorStop(0, '#ff00ff'); // Neon Magenta
        coreGradient.addColorStop(0.5, '#4b0082'); // Indigo
        coreGradient.addColorStop(1, '#000000'); // Void wrap

        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();

        // 3. Neon Ring (The Saturn Effect)
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 1.8, this.size * 0.4, Math.PI / 6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // 4. Planet Label
        ctx.font = "bold 12px 'Syncopate'";
        ctx.fillStyle = "#ff00ff";
        ctx.textAlign = "center";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ff00ff";
        ctx.fillText(this.data.title.toUpperCase(), 0, this.size + 60);

        ctx.restore();
    }
}