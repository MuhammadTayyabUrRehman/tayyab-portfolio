/**
 * AppEngine: The Central Nervous System
 * Version 2.0.0 - Cinematic discovery flow across a 4-planet journey.
 */
import { EventBus, InteractionManager } from './engine/events.js';
import { CelestialCompass } from './components/compass.js';
import { SplashStation } from './components/splash.js';
import { MissionHUD } from './components/missionHud.js';
import { Starfield } from './engine/starfield.js';
import { Camera } from './engine/camera.js';
import { DiscoveryModal } from './components/modal.js';
import { VerdantPlanet } from './components/verdantPlanet.js';
import { ElementalPlanet } from './components/lavaPlanet.js';
import { NeonPlanet } from './components/neonPlanet.js';
import { TransmissionPlanet } from './components/transmissionPlanet.js';

export class AppEngine {
    constructor() {
        this.state = {
            isInitialized: false,
            isPaused: false,
            currentView: 'portal',
            explorationStarted: false,
            isDiscovering: false // true while the camera flies toward a clicked planet
        };

        this.splash = null;
        this.starfield = null;
        this.camera = null;
        this.modal = null;
        this.mission = null;
        this.planets = [];
        this.eventBus = new EventBus();
        this.interactionManager = new InteractionManager(this);
    }

    init() {
        console.log("NEXUS ENGINE v2.0: Initializing High-End Environment...");

        // Initialize Components
        this.splash = new SplashStation();
        this.splash.mount();

        this.modal = new DiscoveryModal();

        this.setupEventListeners();
        this.state.isInitialized = true;
    }

    initWorld() {
        // Data sourced from window.PORTFOLIO_DATA (content.js)
        // Planets are laid out left-to-right as a single cinematic journey.
        const data = window.PORTFOLIO_DATA;

        this.planets = [
            new VerdantPlanet('exp', 700, -200, 95, data.experience),
            new ElementalPlanet('skills', 2100, 250, 115, data.skills),
            new NeonPlanet('projects', 3500, -150, 130, data.projects),
            new TransmissionPlanet('contact', 4900, 200, 100, data.contact)
        ];
    }

    setupEventListeners() {
        const beginMissionBtn = document.getElementById('begin-mission-btn');
        beginMissionBtn.addEventListener('click', () => {
            window.AudioHooks?.play('buttonClick');
            this.transitionToUniverse();
        });

        window.addEventListener('resize', () => {
            if (this.splash) this.splash.resize();
            if (this.starfield) this.starfield.resize();
        });

        const canvas = document.getElementById('starfield-canvas');
        canvas.addEventListener('click', (e) => {
            if (!this.state.explorationStarted || this.state.isDiscovering) return;

            const rect = canvas.getBoundingClientRect();
            // Convert click to World Coordinates
            const mouseX = e.clientX - rect.left + this.camera.offset.x;
            const mouseY = e.clientY - rect.top + this.camera.offset.y;

            const hit = this.planets.find(planet => {
                const dist = Math.sqrt((mouseX - planet.x) ** 2 + (mouseY - planet.y) ** 2);
                return dist < planet.size * 1.5; // Expanded hit-box for better UX
            });

            if (hit) this.discoverPlanet(hit);
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!this.state.explorationStarted) return;
            const rect = canvas.getBoundingClientRect();
            this.interactionManager.checkPlanetHover(
                e.clientX - rect.left,
                e.clientY - rect.top,
                this.camera.offset
            );
        });
    }

    /**
     * The "discovery sequence": camera eases toward the planet, then the
     * detail panel slides in — this replaces opening the modal instantly.
     */
    discoverPlanet(planet) {
        this.state.isDiscovering = true;
        window.AudioHooks?.play('planetDiscovery');

        this.camera.flyTo(planet.x, planet.y, () => {
            this.mission.markDiscovered(planet.id);
            this.modal.open(planet.data);
            this.state.isDiscovering = false;
        });
    }

    transitionToUniverse() {
        window.AudioHooks?.play('portalHum');

        this.splash.launch(() => {
            this.splash.destroy(); // Clean up memory

            const universe = document.getElementById('universe');
            universe.classList.remove('hidden');
            universe.classList.add('fade-in');

            this.startUniverseEngine();
        });
    }

    startUniverseEngine() {
        this.starfield = new Starfield('starfield-canvas');
        this.camera = new Camera();
        this.initWorld();

        // Frame Planet One in view immediately instead of dropping the
        // visitor at the empty origin.
        const first = this.planets[0];
        this.camera.offset.x = first.x - window.innerWidth / 2;
        this.camera.offset.y = first.y - window.innerHeight / 2 + 140;
        this.camera.targetOffset.x = this.camera.offset.x;
        this.camera.targetOffset.y = this.camera.offset.y;

        // Initialize Compass + Mission HUD with the planets we just created
        this.compass = new CelestialCompass(this.planets);
        this.mission = new MissionHUD(this.planets);

        this.state.explorationStarted = true;
        this.runLoop();
    }

    runLoop() {
        if (!this.state.explorationStarted || this.state.isPaused) return;

        const offset = this.camera.update();
        this.starfield.render(offset);
        this.compass.update(offset); // Update Navigation UI
        this.mission.update(offset); // Update Mission Objective UI

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
