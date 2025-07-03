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
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// === Lights ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xffaa00, 2.5, 100);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// === Texture Loader ===
const loader = new THREE.TextureLoader();
const sunTexture = loader.load("textures/sun.jpg");

// === Realistic Sun Sphere ===
const sunGeometry = new THREE.SphereGeometry(4, 64, 64);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
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
mercury.position.set(7, 0, 0);  // closer to sun than Earth (Earth is at 12)
scene.add(mercury);

//Venus
const venusTexture = loader.load('textures/venus.jpg');
const venusGeometry = new THREE.SphereGeometry(1.5, 64, 64);
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.set(9, 0, 0);
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
earth.position.set(12, 0, 0);
scene.add(earth);

//Mars
const marsTexture = loader.load('textures/mars.jpg');
const marsGeometry = new THREE.SphereGeometry(1.2, 64, 64);
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.set(15, 0, 0);
scene.add(mars);

//Jupiter
const jupiterTexture = loader.load('textures/jupiter.jpg');
const jupiterGeometry = new THREE.SphereGeometry(3.5, 64, 64);
const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiter.position.set(22, 0, 0);
scene.add(jupiter);

//Saturn
const saturnTexture = loader.load('textures/saturn.jpg');
const saturnGeometry = new THREE.SphereGeometry(3, 64, 64);
const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture });
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturn.position.set(28, 0, 0);
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
saturnRing.rotation.x = Math.PI / 2.7; // tilt the rings a bit

scene.add(saturnRing);


//Uranus
const uranusTexture = loader.load('textures/uranus.jpg');
const uranusGeometry = new THREE.SphereGeometry(2.5, 64, 64);
const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture });
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranus.position.set(34, 0, 0);
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
uranusRing.rotation.x = Math.PI / 2.7;

scene.add(uranusRing);


//Neptune
const neptuneTexture = loader.load('textures/neptune.jpg');
const neptuneGeometry = new THREE.SphereGeometry(2.4, 64, 64);
const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture });
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
neptune.position.set(40, 0, 0);
scene.add(neptune);



// === Animation ===
function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.01;
  mercury.rotation.y += 0.01; 
  venus.rotation.y += 0.01;   
  earth.rotation.y += 0.01;
  mars.rotation.y += 0.01;
  jupiter.rotation.y += 0.01;
  saturn.rotation.y += 0.01;
  uranus.rotation.y += 0.01;
  neptune.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
