/**
 * MissionHUD
 * Purpose: Keeps the visitor oriented by surfacing the next undiscovered
 * planet, its name, and its distance from the current camera position.
 */
export class MissionHUD {
    constructor(planets) {
        this.planets = planets; // ordered journey: planet 1 -> N
        this.discovered = new Set();
        this.el = document.getElementById('mission-objective');
        this.labelEl = document.getElementById('mission-target');
        this.distEl = document.getElementById('mission-distance');
    }

    markDiscovered(id) {
        this.discovered.add(id);
    }

    update(cameraOffset) {
        const next = this.planets.find(p => !this.discovered.has(p.id));

        if (!next) {
            this.labelEl.textContent = 'All chapters discovered';
            this.distEl.textContent = 'Journey complete';
            this.el.classList.add('mission-complete');
            return;
        }

        const centerX = cameraOffset.x + window.innerWidth / 2;
        const centerY = cameraOffset.y + window.innerHeight / 2;
        const dist = Math.sqrt((next.x - centerX) ** 2 + (next.y - centerY) ** 2);

        this.labelEl.textContent = next.data.title;
        this.distEl.textContent = `${Math.floor(dist / 10)} ly`;
    }
}
