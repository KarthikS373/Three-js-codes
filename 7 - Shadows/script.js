const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspect = sizes.width / sizes.height;
const near = 0.1;
const far = 1000;
const fov = 45;

const material = new THREE.MeshBasicMaterial();
material.wireframe = true;
const geometry = new THREE.BoxBufferGeometry(2, 2, 2, 20, 20);
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 10);
scene.add(camera);

const directionalLight = new THREE.DirectionalLight();
scene.add(directionalLight);
directionalLight.position.set(1, 1, 1);


const canvas = document.getElementById("webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const controls = new THREE.OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.enabled = true;
controls.enableDamping = true;
controls.update();

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

window.addEventListener("dblclick", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen();
  }
});

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect - sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});
