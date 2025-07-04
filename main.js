// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 30);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("solarCanvas"),
  antialias: true
});
renderer.physicallyCorrectLights = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lighting 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xfff2a1, 800, 100);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);
scene.add(new THREE.PointLightHelper(sunLight, 2));

// Texture Loader
const loader = new THREE.TextureLoader();

// Planets and Sun 
function createPlanet(texturePath, radius, position, ringTexture, ringInner, ringOuter) {
  const texture = loader.load(texturePath);
  const geometry = new THREE.SphereGeometry(radius, 64, 64);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const planet = new THREE.Mesh(geometry, material);
  planet.position.set(position, 0, 0);
  scene.add(planet);

  let ring;
  if (ringTexture) {
    const ringTex = loader.load(ringTexture);
    const ringGeom = new THREE.RingGeometry(ringInner, ringOuter, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      map: ringTex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });
    ring = new THREE.Mesh(ringGeom, ringMat);
    ring.position.copy(planet.position);
    ring.rotation.x = Math.PI / 2.1;
    scene.add(ring);
  }
  return { planet, ring };
}

const sunTexture = loader.load("textures/sun.jpg");
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(4, 64, 64),
  new THREE.MeshBasicMaterial({ map: sunTexture, emissive: 0xffff00, emissiveIntensity: 10 })
);
sun.position.set(0, 0, 0);
scene.add(sun);

// Create planets
const mercury = createPlanet("textures/mercury.jpg", 1, 9).planet;
const venus = createPlanet("textures/venus.jpg", 1.5, 12.5).planet;
const earth = createPlanet("textures/earth.jpg", 2, 16.5).planet;
const mars = createPlanet("textures/mars.jpg", 1.2, 21).planet;
const jupiter = createPlanet("textures/jupiter.jpg", 3.5, 30).planet;
const saturnData = createPlanet("textures/saturn.jpg", 3, 39, "textures/saturn_ring.jpg", 3.3, 4.5);
const uranusData = createPlanet("textures/uranus.jpg", 2.5, 48, "textures/uranus_ring.jpg", 2.6, 3.2);
const neptune = createPlanet("textures/neptune.jpg", 2.4, 57).planet;
const saturn = saturnData.planet;
const uranus = uranusData.planet;

// Orbit Parents 
function createOrbitParent(planet) {
  const orbit = new THREE.Object3D();
  orbit.add(planet);
  scene.add(orbit);
  return orbit;
}

const mercuryOrbit = createOrbitParent(mercury);
const venusOrbit = createOrbitParent(venus);
const earthOrbit = createOrbitParent(earth);
const marsOrbit = createOrbitParent(mars);
const jupiterOrbit = createOrbitParent(jupiter);
const saturnOrbit = createOrbitParent(saturn);
const uranusOrbit = createOrbitParent(uranus);
const neptuneOrbit = createOrbitParent(neptune);
saturnOrbit.add(saturnData.ring);
uranusOrbit.add(uranusData.ring);

// Orbit Speeds
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

// Slider Events
["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"].forEach(p => {
  document.getElementById(`${p}Slider`).addEventListener("input", e => {
    orbitSpeeds[p] = parseFloat(e.target.value);
  });
});

// Animate
function animate() {
  animationId = requestAnimationFrame(animate);
  if (!isPaused) {
    sun.rotation.y += 0.002;
    mercury.rotation.y += 0.02;
    venus.rotation.y += 0.002;
    earth.rotation.y += 0.01;
    mars.rotation.y += 0.01;
    jupiter.rotation.y += 0.03;
    saturn.rotation.y += 0.025;
    uranus.rotation.y += 0.018;
    neptune.rotation.y += 0.017;

    mercuryOrbit.rotation.y += orbitSpeeds.mercury;
    venusOrbit.rotation.y += orbitSpeeds.venus;
    earthOrbit.rotation.y += orbitSpeeds.earth;
    marsOrbit.rotation.y += orbitSpeeds.mars;
    jupiterOrbit.rotation.y += orbitSpeeds.jupiter;
    saturnOrbit.rotation.y += orbitSpeeds.saturn;
    uranusOrbit.rotation.y += orbitSpeeds.uranus;
    neptuneOrbit.rotation.y += orbitSpeeds.neptune;
  }
  controls.update();
  renderer.render(scene, camera);
}

// Orbit Controls 
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = true;
controls.enableZoom = true;
controls.rotateSpeed = 0.8;
controls.zoomSpeed = 1;
controls.panSpeed = 0.5;

// Star Background 
(function createStars() {
  const geometry = new THREE.BufferGeometry();
  const positions = Array.from({ length: 1000 }, () => (Math.random() - 0.5) * 1000);
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
  scene.add(new THREE.Points(geometry, material));
})();

// Sidebar & Pause
let isPaused = false, animationId;

document.getElementById("toggleSidebar").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

document.getElementById("pauseResume").addEventListener("click", () => {
  isPaused = !isPaused;
  const btn = document.getElementById("pauseResume");
  btn.textContent = isPaused ? "▶️ Resume" : "⏸️ Pause";
  if (!isPaused) animate();
});

// Orbit Paths
[9, 12.75, 16.5, 21, 30, 39, 48, 57].forEach(r => {
  const points = Array.from({ length: 129 }, (_, i) => {
    const theta = (i / 128) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r);
  });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x888888 });
  scene.add(new THREE.LineLoop(geometry, material));
});

// Theme Toggle
const themeBtn = document.getElementById("toggleTheme");
document.body.classList.add("dark-mode");
scene.background = new THREE.Color(0x000000);

themeBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode", !isDark);
  themeBtn.textContent = isDark ? "🌙" : "🌞";
  scene.background = new THREE.Color(0x000000);
});

// Tooltip on Hover
const tooltip = document.getElementById("planetTooltip");
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const planets = [
  { mesh: sun, name: "Sun" },
  { mesh: mercury, name: "Mercury" },
  { mesh: venus, name: "Venus" },
  { mesh: earth, name: "Earth" },
  { mesh: mars, name: "Mars" },
  { mesh: jupiter, name: "Jupiter" },
  { mesh: saturn, name: "Saturn" },
  { mesh: uranus, name: "Uranus" },
  { mesh: neptune, name: "Neptune" }
];

window.addEventListener("mousemove", event => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));
  if (intersects.length > 0) {
    const planet = planets.find(p => p.mesh === intersects[0].object);
    tooltip.style.display = "block";
    tooltip.textContent = planet.name;
    tooltip.style.left = `${event.clientX + 10}px`;
    tooltip.style.top = `${event.clientY + 10}px`;
  } else {
    tooltip.style.display = "none";
  }
});

// Camera Zoom on Click
const pointer = new THREE.Vector2();
window.addEventListener("click", event => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));

  if (intersects.length > 0) {
    const planet = intersects[0].object;
    const orbitRadius = planet.position.length();
    const angle = Math.PI / 3;
    const orbitFocus = new THREE.Vector3(
      Math.cos(angle) * orbitRadius,
      0,
      Math.sin(angle) * orbitRadius
    );
    const cameraTarget = orbitFocus.clone().add(new THREE.Vector3(4, 4, 4));

    gsap.to(camera.position, {
      x: cameraTarget.x,
      y: cameraTarget.y,
      z: cameraTarget.z,
      duration: 2,
      onUpdate: () => controls.update()
    });
    controls.target.copy(orbitFocus);
  }
});

// Start Animation
animate();
