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

// Orbit speed values (initially set to match original values)
const orbitSpeeds = {
  mercury: 0.04,
  venus: 0.015,
  earth: 0.01,
  mars: 0.008,
  jupiter: 0.004,
  saturn: 0.003,
  uranus: 0.002,
  neptune: 0.001
};

// Add event listeners to sliders
document.getElementById("mercurySlider").addEventListener("input", (e) => {
  orbitSpeeds.mercury = parseFloat(e.target.value);
});
document.getElementById("venusSlider").addEventListener("input", (e) => {
  orbitSpeeds.venus = parseFloat(e.target.value);
});
document.getElementById("earthSlider").addEventListener("input", (e) => {
  orbitSpeeds.earth = parseFloat(e.target.value);
});
document.getElementById("marsSlider").addEventListener("input", (e) => {
  orbitSpeeds.mars = parseFloat(e.target.value);
});
document.getElementById("jupiterSlider").addEventListener("input", (e) => {
  orbitSpeeds.jupiter = parseFloat(e.target.value);
});
document.getElementById("saturnSlider").addEventListener("input", (e) => {
  orbitSpeeds.saturn = parseFloat(e.target.value);
});
document.getElementById("uranusSlider").addEventListener("input", (e) => {
  orbitSpeeds.uranus = parseFloat(e.target.value);
});
document.getElementById("neptuneSlider").addEventListener("input", (e) => {
  orbitSpeeds.neptune = parseFloat(e.target.value);
});

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

let isPaused = false;
let animationId;

document.getElementById("toggleSidebar").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
});

document.getElementById("pauseResume").addEventListener("click", () => {
  isPaused = !isPaused;

  const btn = document.getElementById("pauseResume");
  if (isPaused) {
    btn.textContent = "▶️ Resume";
    cancelAnimationFrame(animationId); // Stop animation loop
  } else {
    btn.textContent = "⏸️ Pause";
    animate(); // Restart animation loop
  }
});



function animate() {
  animationId = requestAnimationFrame(animate);

  if (!isPaused) {
    // Rotation
    sun.rotation.y += 0.002;
    mercury.rotation.y += 0.02;
    venus.rotation.y += 0.002;
    earth.rotation.y += 0.01;
    mars.rotation.y += 0.01;
    jupiter.rotation.y += 0.03;
    saturn.rotation.y += 0.025;
    uranus.rotation.y += 0.018;
    neptune.rotation.y += 0.017;

    // Revolution
    mercuryOrbit.rotation.y += orbitSpeeds.mercury;
    venusOrbit.rotation.y += orbitSpeeds.venus;
    earthOrbit.rotation.y += orbitSpeeds.earth;
    marsOrbit.rotation.y += orbitSpeeds.mars;
    jupiterOrbit.rotation.y += orbitSpeeds.jupiter;
    saturnOrbit.rotation.y += orbitSpeeds.saturn;
    uranusOrbit.rotation.y += orbitSpeeds.uranus;
    neptuneOrbit.rotation.y += orbitSpeeds.neptune;

    controls.update();
    renderer.render(scene, camera);
  }

  controls.update();
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

function createStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 1000;
  const positions = [];

  for (let i = 0; i < starCount; i++) {
    positions.push(
      (Math.random() - 0.5) * 1000,  // x
      (Math.random() - 0.5) * 1000,  // y
      (Math.random() - 0.5) * 1000   // z
    );
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.7,
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}
const themeBtn = document.getElementById("toggleTheme");
document.body.classList.add("dark-mode");
scene.background = new THREE.Color(0x000000);

themeBtn.addEventListener("click", () => {
  const body = document.body;

  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    themeBtn.textContent = "🌞"; // show moon for light mode
    scene.background = new THREE.Color(0x000000); // light background
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    themeBtn.textContent = "🌙"; // show sun for dark mode
    scene.background = new THREE.Color(0x000000); // dark background
  }
});


createStars();
animate();

