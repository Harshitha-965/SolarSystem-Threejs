// === Scene Setup ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 30);
camera.lookAt(0,0,0);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("solarCanvas"),
  antialias: true
});
renderer.physicallyCorrectLights = true;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // for smooth movement
controls.dampingFactor = 0.05;
controls.enablePan = true;     // allow panning
controls.enableZoom = true;    // allow zooming
controls.rotateSpeed = 0.8;
controls.zoomSpeed = 1;
controls.panSpeed = 0.5;
// === Lights ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xfff2a1, 800, 100);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

const lightHelper = new THREE.PointLightHelper(sunLight, 2);
scene.add(lightHelper);

// === Texture Loader ===
const loader = new THREE.TextureLoader();
const sunTexture = loader.load("textures/sun.jpg");

// === Realistic Sun Sphere ===
const sunGeometry = new THREE.SphereGeometry(4, 64, 64);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture, emissive: 0xffff00,
  emissiveIntensity: 10 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, 0);
scene.add(sun);

// Load Mercury texture
const mercuryTexture = loader.load('textures/mercury.jpg');

// Mercury geometry and material
const mercuryGeometry = new THREE.SphereGeometry(1, 64, 64);  // smaller radius ~1
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});

// Mercury mesh
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.set(9, 0, 0);  // closer to sun than Earth (Earth is at 12)
scene.add(mercury);

//Venus
const venusTexture = loader.load('textures/venus.jpg');
const venusGeometry = new THREE.SphereGeometry(1.5, 64, 64);
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.set(12.5, 0, 0);
scene.add(venus);

// Load Earth texture (day map)
const earthTexture = loader.load('textures/earth.jpg');

// Earth geometry and material
const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});

// Earth mesh
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(16.5, 0, 0);
scene.add(earth);

//Mars
const marsTexture = loader.load('textures/mars.jpg');
const marsGeometry = new THREE.SphereGeometry(1.2, 64, 64);
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.set(21, 0, 0);
scene.add(mars);

//Jupiter
const jupiterTexture = loader.load('textures/jupiter.jpg');
const jupiterGeometry = new THREE.SphereGeometry(3.5, 64, 64);
const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiter.position.set(30, 0, 0);
scene.add(jupiter);

//Saturn
const saturnTexture = loader.load('textures/saturn.jpg');
const saturnGeometry = new THREE.SphereGeometry(3, 64, 64);
const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture });
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturn.position.set(39, 0, 0);
scene.add(saturn);

// Saturn rings texture (put in your textures folder)
const saturnRingTexture = loader.load('textures/saturn_ring.jpg');

// Ring geometry parameters
const ringGeometry = new THREE.RingGeometry(3.3, 4.5, 64);

// Ring material with transparency
const ringMaterial = new THREE.MeshBasicMaterial({
  map: saturnRingTexture,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.8,
});

// Create ring mesh
const saturnRing = new THREE.Mesh(ringGeometry, ringMaterial);

// Position rings around Saturn
saturnRing.position.copy(saturn.position);
saturnRing.rotation.x = Math.PI / 2.1; // tilt the rings a bit
scene.add(saturnRing);

//Uranus
const uranusTexture = loader.load('textures/uranus.jpg');
const uranusGeometry = new THREE.SphereGeometry(2.5, 64, 64);
const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture });
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranus.position.set(48, 0, 0);
scene.add(uranus);

// Uranus rings texture (put in your textures folder)
const uranusRingTexture = loader.load('textures/uranus_ring.jpg');

const uranusRingGeometry = new THREE.RingGeometry(2.6, 3.2, 64);

const uranusRingMaterial = new THREE.MeshBasicMaterial({
  map: uranusRingTexture,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.5,
});

const uranusRing = new THREE.Mesh(uranusRingGeometry, uranusRingMaterial);
uranusRing.position.copy(uranus.position);
uranusRing.rotation.x = Math.PI / 2.1;

scene.add(uranusRing);


//Neptune
const neptuneTexture = loader.load('textures/neptune.jpg');
const neptuneGeometry = new THREE.SphereGeometry(2.4, 64, 64);
const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture });
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
neptune.position.set(57, 0, 0);
scene.add(neptune);

// Pivots for revolution
const mercuryOrbit = new THREE.Object3D();
const venusOrbit = new THREE.Object3D();
const earthOrbit = new THREE.Object3D();
const marsOrbit = new THREE.Object3D();
const jupiterOrbit = new THREE.Object3D();
const saturnOrbit = new THREE.Object3D();
const uranusOrbit = new THREE.Object3D();
const neptuneOrbit = new THREE.Object3D();

// Add planets to their orbits
mercuryOrbit.add(mercury);
venusOrbit.add(venus);
earthOrbit.add(earth);
marsOrbit.add(mars);
jupiterOrbit.add(jupiter);
saturnOrbit.add(saturn);
uranusOrbit.add(uranus);
neptuneOrbit.add(neptune);

// Add rings to Saturn/Uranus orbits
saturnOrbit.add(saturnRing);
uranusOrbit.add(uranusRing);

// Add all orbits to scene
scene.add(
  mercuryOrbit,
  venusOrbit,
  earthOrbit,
  marsOrbit,
  jupiterOrbit,
  saturnOrbit,
  uranusOrbit,
  neptuneOrbit
);


// === Animation ===
function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.002;
  mercury.rotation.y += 0.02;   // Fast
  venus.rotation.y += 0.002;    // Very slow (retrograde)
  earth.rotation.y += 0.01;     // Normal
  mars.rotation.y += 0.01;      // Similar to Earth
  jupiter.rotation.y += 0.03;   // Fastest spinner
  saturn.rotation.y += 0.025;   // Very fast
  uranus.rotation.y += 0.018;   // Moderate (retrograde but keep it simple)
  neptune.rotation.y += 0.017;  // Moderate


  mercuryOrbit.rotation.y += 0.04;
  venusOrbit.rotation.y += 0.015;
  earthOrbit.rotation.y += 0.01;
  marsOrbit.rotation.y += 0.008;
  jupiterOrbit.rotation.y += 0.004;
  saturnOrbit.rotation.y += 0.003;
  uranusOrbit.rotation.y += 0.002;
  neptuneOrbit.rotation.y += 0.001;

  renderer.render(scene, camera);
}
function createOrbitLine(radius) {
  const points = [];
  const segments = 128;

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x888888 });
  return new THREE.LineLoop(geometry, material);
}
scene.add(createOrbitLine(9));    // Mercury
scene.add(createOrbitLine(12.75));  // Venus
scene.add(createOrbitLine(16.5));   // Earth
scene.add(createOrbitLine(21));   // Mars
scene.add(createOrbitLine(30));   // Jupiter
scene.add(createOrbitLine(39));   // Saturn
scene.add(createOrbitLine(48));   // Uranus
scene.add(createOrbitLine(57));   // Neptune


animate();
