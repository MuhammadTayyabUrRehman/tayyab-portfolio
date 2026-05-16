/**
 * Planet Base Class
 * Handles the logic for placement in the coordinate system.
 */
export class Planet {
    constructor(id, x, y, size, data) {
        this.id = id;
        this.x = x; // World coordinates (not screen)
        this.y = y;
        this.size = size;
        this.data = data; // Portfolio content (title, description, etc.)
        this.rotation = 0;
    }

    /**
     * Checks if the planet is currently on the user's screen.
     * High-performance culling to save CPU.
     */
    isVisible(cameraOffset, width, height) {
        const screenX = this.x - cameraOffset.x;
        const screenY = this.y - cameraOffset.y;
        
        return (
            screenX + this.size > 0 &&
            screenX - this.size < width &&
            screenY + this.size > 0 &&
            screenY - this.size < height
        );
    }

    update() {
        this.rotation += 0.005; // Slow orbital rotation
    }
}