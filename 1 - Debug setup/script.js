//* SCENE
const scene = new THREE.Scene();

//* SIZE
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspect = size.width / size.height;
const fov = 75;
let near = 0.1;
let far = 100;

//* OBJECTS
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({
    color: "cyan",
    // wireframe: true,
  })
);
scene.add(cube);

//* CAMERA
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
scene.add(camera);
camera.position.set(0, 0, 10);


//~ DEBUGGER
const gui = new dat.GUI();
// gui.add(object.property, valueToChange);
// gui.add(cube.position, 'y');  

// gui.add(object.property, valueToChange, minVal, maxVal, step)
// gui.add(cube.position, 'y', -5, 5, 1)

// gui.add(object.property, valueToChange, minVal, maxVal, step).name('name of property indisplay')
gui.add(cube.position, 'y', -5, 5, 1).name('position-y')

//* RENDERER
const canvas = document.getElementById("webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//* CONTROLLER
const dumbElement = canvas;
const controls = new THREE.OrbitControls(camera, dumbElement);
controls.target.set(0, 0, 0);
controls.enabled = true;
controls.enableDamping = true;
controls.update();

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // Updating the camera aspect
  camera.aspect - size.width / size.height;
  camera.updateProjectionMatrix();

  // Updating the renderer
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});



const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Add Code here
  controls.update();

  // * Rendering out to screen
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
