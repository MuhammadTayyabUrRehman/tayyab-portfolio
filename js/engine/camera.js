import { PhysicsEngine } from './physics.js';

/**
 * Camera Engine
 * Handles user input and integrates Physics for high-end drift.
 */
export class Camera {
    constructor() {
        this.offset = { x: 0, y: 0 };
        this.targetOffset = { x: 0, y: 0 };
        this.isDragging = false;
        this.lastMousePos = { x: 0, y: 0 };
        this.isFlying = false; // true during a scripted flyTo() tween
        this.keys = new Set();
        this.keyPanSpeed = 14;

        // Composition: Camera "has a" PhysicsEngine
        this.physics = new PhysicsEngine({
            friction: 0.92,
            acceleration: 0.15
        });

        this.init();
    }

    init() {
        // Desktop Controls
        window.addEventListener('mousedown', (e) => this.startDrag(e));
        window.addEventListener('mousemove', (e) => this.onDrag(e));
        window.addEventListener('mouseup', () => this.stopDrag());

        // Touch Controls
        window.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]), { passive: false });
        window.addEventListener('touchmove', (e) => this.onDrag(e.touches[0]), { passive: false });
        window.addEventListener('touchend', () => this.stopDrag());

        // Keyboard Controls: Arrow Keys + WASD
        const panKeys = new Set(['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright']);
        window.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if (panKeys.has(key)) this.keys.add(key);
        });
        window.addEventListener('keyup', (e) => {
            this.keys.delete(e.key.toLowerCase());
        });
    }

    applyKeyboardPan() {
        if (this.isFlying || this.keys.size === 0) return;

        let dx = 0, dy = 0;
        if (this.keys.has('w') || this.keys.has('arrowup')) dy -= this.keyPanSpeed;
        if (this.keys.has('s') || this.keys.has('arrowdown')) dy += this.keyPanSpeed;
        if (this.keys.has('a') || this.keys.has('arrowleft')) dx -= this.keyPanSpeed;
        if (this.keys.has('d') || this.keys.has('arrowright')) dx += this.keyPanSpeed;

        this.targetOffset.x += dx;
        this.targetOffset.y += dy;
        this.offset.x += dx;
        this.offset.y += dy;
    }

    /**
     * Cinematic ease toward a world point (used for planet discovery).
     * @param {number} worldX
     * @param {number} worldY
     * @param {Function} onComplete
     */
    flyTo(worldX, worldY, onComplete) {
        this.isFlying = true;
        const destX = worldX - window.innerWidth / 2;
        const destY = worldY - window.innerHeight / 2;

        gsap.to(this.offset, {
            x: destX,
            y: destY,
            duration: 1.6,
            ease: 'power3.inOut',
            onUpdate: () => {
                this.targetOffset.x = this.offset.x;
                this.targetOffset.y = this.offset.y;
            },
            onComplete: () => {
                this.isFlying = false;
                if (onComplete) onComplete();
            }
        });
    }

    startDrag(e) {
        this.isDragging = true;
        this.lastMousePos = { x: e.clientX, y: e.clientY };
        document.getElementById('universe').style.cursor = 'grabbing';
    }

    onDrag(e) {
        if (!this.isDragging) return;

        // Calculate delta movement
        const dx = e.clientX - this.lastMousePos.x;
        const dy = e.clientY - this.lastMousePos.y;

        // Apply to target
        this.targetOffset.x -= dx;
        this.targetOffset.y -= dy;

        this.lastMousePos = { x: e.clientX, y: e.clientY };

        // Update Coordinate UI
        const coordX = document.getElementById('coord-x');
        const coordY = document.getElementById('coord-y');
        if (coordX && coordY) {
            coordX.innerText = Math.floor(this.targetOffset.x);
            coordY.innerText = Math.floor(this.targetOffset.y);
        }
    }

    stopDrag() {
        this.isDragging = false;
        document.getElementById('universe').style.cursor = 'grab';
    }

    /**
     * Called every frame by the AppEngine runLoop
     */
    update() {
        if (this.isFlying) return this.offset; // GSAP owns the offset during a scripted flight

        this.applyKeyboardPan();

        // Apply physics to bridge the gap between actual offset and target offset
        const result = this.physics.applyInertia(
            this.offset, 
            this.targetOffset, 
            this.isDragging
        );

        this.offset.x = result.x;
        this.offset.y = result.y;

        // Update targetOffset to follow the drift when not dragging
        if (!this.isDragging) {
            this.targetOffset.x = this.offset.x;
            this.targetOffset.y = this.offset.y;
        }

        return this.offset;
    }
}