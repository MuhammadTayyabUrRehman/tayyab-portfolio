/**
 * SurfaceGenerator (v1.2.0)
 * Purpose: Procedural texture generation for planets without 3D models.
 * Conformance: High-performance pixel manipulation via Offscreen Canvas.
 */
export class SurfaceGenerator {
    /**
     * Creates a unique noise-based texture for a planet.
     * @param {number} size - Radius of the planet
     * @param {string} type - 'LAVA_ICE', 'NEON', or 'VERDANT'
     */
    static createTexture(size, type) {
        const canvas = document.createElement('canvas');
        canvas.width = size * 2;
        canvas.height = size * 2;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const x = (i / 4) % canvas.width;
            const y = Math.floor((i / 4) / canvas.width);
            const dx = x - size;
            const dy = y - size;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < size) {
                const noise = Math.random() * 50; // Simple stochastic noise
                
                if (type === 'LAVA_ICE') {
                    if (x < size) { // Lava Side
                        data[i] = 200 + noise;     // R
                        data[i + 1] = 50 + noise;  // G
                        data[i + 2] = 0;           // B
                    } else { // Ice Side
                        data[i] = 100 + noise;     // R
                        data[i + 1] = 200 + noise; // G
                        data[i + 2] = 255;         // B
                    }
                } else if (type === 'NEON') {
                    data[i] = 75;                  // Deep Indigo R
                    data[i + 1] = 0;               // G
                    data[i + 2] = 130 + noise;     // B
                } else if (type === 'VERDANT') {
                    data[i] = 30;                  // Forest R
                    data[i + 1] = 100 + noise;     // G
                    data[i + 2] = 50;              // B
                }
                data[i + 3] = 255; // Alpha
            } else {
                data[i + 3] = 0; // Transparent outside circle
            }
        }

        ctx.putImageData(imageData, 0, 0);
        return canvas;
    }
}