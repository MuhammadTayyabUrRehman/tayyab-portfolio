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