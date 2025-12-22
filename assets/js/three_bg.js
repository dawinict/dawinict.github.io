// Three.js Particle Network Animation

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("canvas-container");
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Dark blue gradient-ish background color (matches the theme roughly)
    // or transparent if we want to use CSS gradient behind it.
    // Let's use a nice dark tech blue.
    scene.background = new THREE.Color(0x0a192f);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Particles
    const particleCount = 100;
    const group = new THREE.Group();
    scene.add(group);

    const particlesData = [];
    const geometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    const r = 800;
    const rHalf = r / 2;

    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * r - rHalf;
        const y = Math.random() * r - rHalf;
        const z = Math.random() * r - rHalf;

        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;

        // Velocity
        particlesData.push({
            velocity: new THREE.Vector3(
                -0.5 + Math.random(),
                -0.5 + Math.random(),
                -0.5 + Math.random()
            ),
            numConnections: 0
        });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Points material
    const pMaterial = new THREE.PointsMaterial({
        color: 0x00c6ff, // Bright cyan/blue
        size: 3,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: false
    });

    const particles = new THREE.Points(geometry, pMaterial);
    group.add(particles);

    // Lines setup
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00c6ff,
        transparent: true,
        opacity: 0.2,
        linewidth: 1 // Note: linewidth > 1 not supported in most WebGL implementations
    });

    // We will update line positions every frame, so we need a buffer
    // Max connections is roughly count * count / 2 (worst case)
    // But we limit distance, so let's allocate enough.
    const maxConnections = particleCount * particleCount;
    const linePositions = new Float32Array(maxConnections * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lines);

    // Interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.5;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.5;
    });

    // Animation loop
    const animate = function () {
        requestAnimationFrame(animate);

        // Gentle rotation based on mouse
        group.rotation.x += 0.001;
        group.rotation.y += 0.002;

        // Influence by mouse
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        let vertexIndex = 0;
        let lineVertexIndex = 0;

        // Update particles
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Update position
            particlesData[i].velocity.y -= 0.002; // Very slight gravity? No, let's just float
            // Let's stick to simple floating
            particlePositions[i3] += particlesData[i].velocity.x * 0.5;
            particlePositions[i3 + 1] += particlesData[i].velocity.y * 0.5;
            particlePositions[i3 + 2] += particlesData[i].velocity.z * 0.5;

            // Boundary check - bounce back
            if (particlePositions[i3] < -rHalf || particlePositions[i3] > rHalf) particlesData[i].velocity.x *= -1;
            if (particlePositions[i3 + 1] < -rHalf || particlePositions[i3 + 1] > rHalf) particlesData[i].velocity.y *= -1;
            if (particlePositions[i3 + 2] < -rHalf || particlePositions[i3 + 2] > rHalf) particlesData[i].velocity.z *= -1;

            if (particlesData[i].numConnections >= 0) {
                particlesData[i].numConnections = 0;
            }
        }

        // Update lines
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dx = particlePositions[i * 3] - particlePositions[j * 3];
                const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
                const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < 150) {
                    // Add line
                    linePositions[lineVertexIndex++] = particlePositions[i * 3];
                    linePositions[lineVertexIndex++] = particlePositions[i * 3 + 1];
                    linePositions[lineVertexIndex++] = particlePositions[i * 3 + 2];

                    linePositions[lineVertexIndex++] = particlePositions[j * 3];
                    linePositions[lineVertexIndex++] = particlePositions[j * 3 + 1];
                    linePositions[lineVertexIndex++] = particlePositions[j * 3 + 2];
                }
            }
        }

        lines.geometry.attributes.position.needsUpdate = true;
        lines.geometry.setDrawRange(0, lineVertexIndex / 3);
        particles.geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    };

    animate();

    // Resize handle
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});
