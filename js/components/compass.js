/**
 * Celestial Compass Component
 * Purpose: Directs the user toward hidden planets (requirements/content).
 * Logic: Calculates Vector angles from Camera Offset to Planet Coordinates.
 */
export class CelestialCompass {
    constructor(planets) {
        this.planets = planets;
        this.hudElement = document.getElementById('exploration-hud');
        this.pointers = new Map();
        this.initUI();
    }

    initUI() {
        // Create a dedicated container for directional pointers
        const container = document.createElement('div');
        container.id = 'compass-container';
        container.style.marginTop = '20px';
        this.hudElement.appendChild(container);
        this.container = container;
    }

    /**
     * @param {Object} cameraOffset - Current world X/Y
     */
    update(cameraOffset) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        this.planets.forEach(planet => {
            const dx = planet.x - cameraOffset.x - (screenWidth / 2);
            const dy = planet.y - cameraOffset.y - (screenHeight / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);

            // If planet is off-screen, show pointer
            if (!planet.isVisible(cameraOffset, screenWidth, screenHeight)) {
                this.updatePointer(planet, dx, dy, distance);
            } else {
                this.removePointer(planet.id);
            }
        });
    }

    updatePointer(planet, dx, dy, distance) {
        let pointer = this.pointers.get(planet.id);
        
        if (!pointer) {
            pointer = document.createElement('div');
            pointer.className = 'compass-pointer';
            pointer.innerHTML = `<span class="dist">${Math.floor(distance / 10)}ly</span>`;
            this.container.appendChild(pointer);
            this.pointers.set(planet.id, pointer);
        }

        // Calculate rotation toward planet
        const angle = Math.atan2(dy, dx);
        pointer.style.transform = `rotate(${angle}rad)`;
        
        // Intensity of glow based on proximity
        const opacity = Math.max(0.2, 1 - distance / 5000);
        pointer.style.opacity = opacity;
    }

    removePointer(id) {
        const pointer = this.pointers.get(id);
        if (pointer) {
            pointer.remove();
            this.pointers.delete(id);
        }
    }
}