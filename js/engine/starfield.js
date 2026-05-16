/**
 * Starfield Engine
 * High-performance background rendering using Layered Parallax.
 */
export class Starfield {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.layers = [
            { count: 1000, speed: 0.05, size: 0.5, color: '#ffffff' }, // Distant stars
            { count: 300, speed: 0.12, size: 1.2, color: '#00ffc8' },  // Mid-field (Nexus Tint)
            { count: 50, speed: 0.3, size: 2.5, color: '#ffffff' }    // Close "dust"
        ];
        this.stars = [];
        this.init();
    }

    init() {
        this.resize();
        this.generateStars();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.generateStars(); // Re-seed on resize to fill screen
    }

    generateStars() {
        this.stars = [];
        this.layers.forEach((layer, index) => {
            for (let i = 0; i < layer.count; i++) {
                this.stars.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    layerIndex: index,
                    brightness: Math.random()
                });
            }
        });
    }

    /**
     * @param {Object} offset - The current X/Y camera offset
     */
    render(offset) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#050505'; // Deep void
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.stars.forEach(star => {
            const layer = this.layers[star.layerIndex];
            
            // Calculate parallax movement
            let x = (star.x - offset.x * layer.speed) % this.canvas.width;
            let y = (star.y - offset.y * layer.speed) % this.canvas.height;

            // Wrap around screen edges
            if (x < 0) x += this.canvas.width;
            if (y < 0) y += this.canvas.height;

            this.ctx.beginPath();
            this.ctx.arc(x, y, layer.size, 0, Math.PI * 2);
            this.ctx.fillStyle = layer.color;
            this.ctx.globalAlpha = star.brightness;
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1.0;
    }
}