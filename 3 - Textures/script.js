// * ************************************ PART 1 ******************************************
// //* SCENE
// const scene = new THREE.Scene();

// //* SIZE
// const size = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };
// const aspect = size.width / size.height;
// const fov = 75;
// let near = 0.1;
// let far = 100;

// // //~ TEXTURE
// // const texture = new THREE.TextureLoader().load('./image.jpg',
// //   () => { console.log('load') },
// //   () => { console.log('progress') },
// //   () => { console.log('error') }
// // );

// //~ TEXTURE
// const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = (item, startLoading, totalToLoad) => {
//   console.log(`Starting to Load ${item}... Item ${startLoading} / ${totalToLoad}`);
// };

// loadingManager.onProgress = (item, currentLoading, totalToLoad) => {
//   console.log(`Loading ${item}...Item ${currentLoading} / ${totalToLoad}`);
// };

// loadingManager.onError = (item) => {
//   console.log(`Error Loading ${item}...`);
// };

// loadingManager.onLoaded = (item) => {
//   console.log(`Loaded ${item}...`);
// };

// const textureLoader = new THREE.TextureLoader(loadingManager);
// const texture = textureLoader.load('./image.jpg');

// //* OBJECTS
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(3, 3, 3),
//   new THREE.MeshBasicMaterial({
//     color: "cyan",
//     map: texture,
//     //wireframe: true,
//   })
// );
// scene.add(cube);

// //* CAMERA
// const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// scene.add(camera);
// camera.position.set(0, 0, 10);

// //* RENDERER
// const canvas = document.getElementById("webgl");
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });
// renderer.setSize(size.width, size.height);
// renderer.render(scene, camera);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// window.addEventListener("dblclick", () => {
//   if (document.fullscreenElement) {
//     document.exitFullscreen();
//   } else {
//     canvas.requestFullscreen();
//   }
// });

// window.addEventListener("resize", () => {
//   size.width = window.innerWidth;
//   size.height = window.innerHeight;

//   // Updating the camera aspect
//   camera.aspect - size.width / size.height;
//   camera.updateProjectionMatrix();

//   // Updating the renderer
//   renderer.setSize(size.width, size.height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// //~ CONTROLLER
// const dumbElement = canvas;
// const controls = new THREE.OrbitControls(camera, dumbElement);
// controls.target.set(0, 0, 0);
// controls.enabled = true;
// controls.enableDamping = true;
// controls.update();

// const clock = new THREE.Clock();
// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   // Add Code here
//   controls.update();

//   // * Rendering out to screen
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };

// tick();

// * ************************************************ PART 2 *************************************
//* SCENE
const scene = new THREE.Scene();

//* SIZE
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspect = size.width / size.height;
const fov = 45;
let near = 0.1;
let far = 100;

//* TEXTURE
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./image.jpg");

//~ WRAPPING
// texture.repeat.x = 2;
// texture.repeat.y = 10;

// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;

// texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.MirroredRepeatWrapping;

// texture.rotation = 1; // rotaion around axis
// texture.center.x = 0.5, 0.5;  // axis coordinates
// texture.center.x = 0.5, 0.5;  // axis coordinates

//~ FILTERS
// texture.generateMipmaps = false; // false to improve performance   
// texture.minFilter = THREE.NearestFilter;
// texture.minFilter = THREE.LinearFilter;
// texture.minFilter = THREE.NearestMipmapNearestFilter;
// texture.minFilter = THREE.NearestMipmapLinearFilter;
// texture.minFilter = THREE.LinearMipmapNearestFilter;
// texture.minFilter = THREE.LinearMipmapLinearFilter;  // Default

// texture.maxFilter = THREE.NearestFilter;
// texture.maxFilter = THREE.LinearFilter; // default

//* OBJECTS
const geometry = new THREE.BoxBufferGeometry(3, 3, 3);
const material = new THREE.MeshBasicMaterial({
  color: "cyan",
  map: texture,
  // wireframe: true,
});
console.log(geometry.attributes.uv)
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//* CAMERA
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
scene.add(camera);
camera.position.set(0, 0, 10);

//* RENDERER
const canvas = document.getElementById("webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("dblclick", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen();
  }
});

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

//~ CONTROLLER
const dumbElement = canvas;
const controls = new THREE.OrbitControls(camera, dumbElement);
controls.target.set(0, 0, 0);
controls.enabled = true;
controls.enableDamping = true;
controls.update();

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
