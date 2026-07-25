/**
 * Event Bus (v1.0.1)
 * Purpose: Decouples interaction logic from the Render Loop.
 * Conformance: Ensures all UI actions follow a standardized lifecycle.
 */
export class EventBus {
    constructor() {
        this.events = {};
    }

    /**
     * Subscribe to a specific event (e.g., 'PLANET_DISCOVERED')
     */
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    /**
     * Trigger an event across the entire system
     */
    emit(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => callback(data));
        }
    }
}

/**
 * Interaction Manager
 * Handles complex input detection (Long press, Hover depth, etc.)
 */
export class InteractionManager {
    constructor(engine) {
        this.engine = engine;
        this.hoveredPlanet = null;
        this.setupGlobalListeners();
    }

    setupGlobalListeners() {
        // Handle "Escape" to collapse all UI overlays (Requirement Conformance)
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.engine.modal.close();
                this.engine.eventBus.emit('UI_COLLAPSE', { timestamp: Date.now() });
            }
        });

        // Handle Window Blur (Pause engine for performance when user switches tabs)
        window.addEventListener('blur', () => {
            this.engine.state.isPaused = true;
            console.log("NEXUS: Engine suspended to save resources.");
        });

        window.addEventListener('focus', () => {
            this.engine.state.isPaused = false;
        });
    }

    checkPlanetHover(mouseX, mouseY, cameraOffset) {
        let found = null;
        this.engine.planets.forEach(planet => {
            const dx = mouseX - (planet.x - cameraOffset.x);
            const dy = mouseY - (planet.y - cameraOffset.y);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < planet.size) {
                found = planet;
            }
        });

        if (this.hoveredPlanet !== found) {
            if (this.hoveredPlanet) this.hoveredPlanet.isHovered = false;
            if (found) found.isHovered = true;

            this.hoveredPlanet = found;
            this.engine.eventBus.emit('HOVER_CHANGE', { planet: found });

            // Cursor Feedback for "Award-Winning" UX
            document.body.style.cursor = found ? 'pointer' : 'default';
        }
    }
}