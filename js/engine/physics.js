/**
 * Physics Engine (v1.1.0)
 * Specialized in "Drift" dynamics and high-precision coordinate smoothing.
 */
export class PhysicsEngine {
    constructor(config = {}) {
        this.friction = config.friction || 0.95;
        this.acceleration = config.acceleration || 0.1;
        this.maxVelocity = config.maxVelocity || 50;
        
        this.velocity = { x: 0, y: 0 };
        this.lastPosition = { x: 0, y: 0 };
    }

    /**
     * Calculates the new position based on momentum.
     * @param {Object} current - Current X/Y coordinates
     * @param {Object} target - Target X/Y coordinates (where the mouse is dragging)
     * @param {Boolean} isInteracting - Whether the user is currently dragging
     */
    applyInertia(current, target, isInteracting) {
        if (isInteracting) {
            // While dragging, calculate instantaneous velocity
            this.velocity.x = target.x - current.x;
            this.velocity.y = target.y - current.y;
            
            return {
                x: target.x,
                y: target.y
            };
        } else {
            // When released, apply friction and drift
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;

            // Stop minute oscillations for performance
            if (Math.abs(this.velocity.x) < 0.01) this.velocity.x = 0;
            if (Math.abs(this.velocity.y) < 0.01) this.velocity.y = 0;

            return {
                x: current.x + this.velocity.x,
                y: current.y + this.velocity.y
            };
        }
    }

    /**
     * Specialized function to handle "Screen Bounce" or boundaries
     * Used if the universe has a designated 'end' (v1.2 feature)
     */
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}