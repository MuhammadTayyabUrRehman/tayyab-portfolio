import { Planet } from './planet.js';

/**
 * TransmissionPlanet
 * Artificial Dyson-inspired megastructure: a metallic core wrapped in
 * rotating tech rings and floating panels, used for the contact/transmission chapter.
 */
export class TransmissionPlanet extends Planet {
    constructor(id, x, y, size, data) {
        super(id, x, y, size, data);
        this.ringRotation = 0;
        this.panelRotation = Math.PI / 3;
        this.pulse = 0;
    }

    update() {
        super.update();
        this.ringRotation += 0.006;
        this.panelRotation -= 0.003;
        this.pulse = Math.sin(Date.now() / 600) * 0.5 + 0.5;
    }

    draw(ctx, cameraOffset) {
        const screenX = this.x - cameraOffset.x;
        const screenY = this.y - cameraOffset.y;

        ctx.save();
        ctx.translate(screenX, screenY);

        // 1. Ambient tech glow — surges when hovered
        const hoverBoost = this.isHovered ? 1.7 : 1;
        const glow = ctx.createRadialGradient(0, 0, this.size * 0.6, 0, 0, this.size * 1.7);
        glow.addColorStop(0, `rgba(80, 170, 255, ${(0.25 + this.pulse * 0.15) * hoverBoost})`);
        glow.addColorStop(1, 'rgba(80, 170, 255, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 1.7, 0, Math.PI * 2);
        ctx.fill();

        // 2. Metallic core
        const core = ctx.createRadialGradient(-this.size * 0.3, -this.size * 0.3, this.size * 0.1, 0, 0, this.size);
        core.addColorStop(0, '#dfe7f0');
        core.addColorStop(0.5, '#5c6b7a');
        core.addColorStop(1, '#12161c');
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();

        // 3. Outer megastructure ring
        ctx.save();
        ctx.rotate(this.ringRotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 1.5, this.size * 0.28, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(120, 200, 255, 0.7)';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#50aaff';
        ctx.stroke();
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const px = Math.cos(angle) * this.size * 1.5;
            const py = Math.sin(angle) * this.size * 0.28;
            ctx.fillStyle = '#a9d6ff';
            ctx.fillRect(px - 3, py - 3, 6, 6);
        }
        ctx.restore();

        // 4. Inner floating panel ring (counter-rotating)
        ctx.save();
        ctx.rotate(this.panelRotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 1.1, this.size * 0.9, Math.PI / 5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(200, 230, 255, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        // 5. Label
        ctx.font = "bold 12px 'Syncopate'";
        ctx.fillStyle = '#a9d6ff';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#50aaff';
        ctx.fillText(this.data.title.toUpperCase(), 0, this.size + 55);

        ctx.restore();
    }
}
