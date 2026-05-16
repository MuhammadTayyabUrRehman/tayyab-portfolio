/**
 * AppEngine: The Central Nervous System
 * Version 1.1.0 - Optimized for high-performance discovery logic.
 */
import { EventBus, InteractionManager } from './engine/events.js';
import { CelestialCompass } from './components/compass.js';
import { Portal } from './components/portal.js';
import { Starfield } from './engine/starfield.js';
import { Camera } from './engine/camera.js';
import { DiscoveryModal } from './components/modal.js';
import { VerdantPlanet } from './components/verdantPlanet.js';
import { ElementalPlanet } from './components/lavaPlanet.js';
import { NeonPlanet } from './components/neonPlanet.js';

export class AppEngine {
    constructor() {
        this.state = {
            isInitialized: false,
            isPaused: false,
            currentView: 'portal',
            explorationStarted: false
        };  

        this.portal = null;
        this.starfield = null;
        this.camera = null;
        this.modal = null;
        this.planets = [];
        this.eventBus = new EventBus();
        this.interactionManager = new InteractionManager(this);
    }

    init() {
        console.log("NEXUS ENGINE v1.1: Initializing High-End Environment...");
        
        // Initialize Components
        this.portal = new Portal();
        this.portal.mount('portal-canvas');
        
        this.modal = new DiscoveryModal();
        
        this.setupEventListeners();
        this.state.isInitialized = true;
    }

    initWorld() {
        // Data sourced from window.PORTFOLIO_DATA (content.js)
        const data = window.PORTFOLIO_DATA;

        this.planets = [
            new VerdantPlanet('exp', 600, -300, 90, data.experience),
            new ElementalPlanet('skills', -900, 500, 110, data.skills),
            new NeonPlanet('projects', 1200, 800, 130, data.projects)
        ];
    }

    setupEventListeners() {
        const portalRing = document.querySelector('.portal-ring');
        portalRing.addEventListener('click', () => this.transitionToUniverse());

        window.addEventListener('resize', () => {
            if (this.portal) this.portal.resize();
            if (this.starfield) this.starfield.resize();
        });

        const canvas = document.getElementById('starfield-canvas');
        canvas.addEventListener('click', (e) => {
            if (!this.state.explorationStarted) return;

            const rect = canvas.getBoundingClientRect();
            // Convert click to World Coordinates
            const mouseX = e.clientX - rect.left + this.camera.offset.x;
            const mouseY = e.clientY - rect.top + this.camera.offset.y;

            this.planets.forEach(planet => {
                const dist = Math.sqrt((mouseX - planet.x) ** 2 + (mouseY - planet.y) ** 2);
                if (dist < planet.size * 1.5) { // Expanded hit-box for better UX
                    this.modal.open(planet.data);
                }
            });
        });
    }

    transitionToUniverse() {
        const splash = document.getElementById('splash-portal');
        splash.classList.add('active'); // Triggers the CSS dissolve

        setTimeout(() => {
            splash.style.display = 'none';
            this.portal.destroy(); // Clean up memory
            
            const universe = document.getElementById('universe');
            universe.classList.remove('hidden');
            universe.classList.add('fade-in');
            
            this.startUniverseEngine();
        }, 2000); // Increased time for a "very smooth" load
    }

    startUniverseEngine() {
        this.starfield = new Starfield('starfield-canvas');
        this.camera = new Camera();
        this.initWorld();
        
        // Initialize Compass with the planets we just created
        this.compass = new CelestialCompass(this.planets);
        
        this.state.explorationStarted = true;
        this.runLoop();
    }

    runLoop() {
        if (!this.state.explorationStarted || this.state.isPaused) return;

        const offset = this.camera.update();
        this.starfield.render(offset);
        this.compass.update(offset); // Update Navigation UI

        const canvas = document.getElementById('starfield-canvas');
        const ctx = canvas.getContext('2d');

        this.planets.forEach(planet => {
            if (planet.isVisible(offset, canvas.width, canvas.height)) {
                planet.update();
                planet.draw(ctx, offset);
            }
        });

        requestAnimationFrame(() => this.runLoop());
    }
}