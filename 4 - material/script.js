// * ************************************ PART 1 *****************************************

// //* SCENE
// const scene = new THREE.Scene();

// //* SIZE
// const size = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };
// const aspect = size.width / size.height;
// const fov = 45;
// let near = 0.1;
// let far = 100;

// //* TEXTURE
// const textureLoader = new THREE.TextureLoader();
// const alphaMapTexture = textureLoader.load("./alphaMap.jpg");
// console.log(alphaMapTexture);
// const matCapTexture = textureLoader.load("./matCap.png"); // MatCaps are generally png
// console.log(matCapTexture);
// const gradientTexture = textureLoader.load("./gradient.jpg");
// console.log(gradientTexture);

// const woodTexture = textureLoader.load("./wood.jpg");
// const woodAOTexture = textureLoader.load("./woodAO.jpg");

// //~ MATERIAL

// //! MESH BASIC MATERIAL
// // const material = new THREE.MeshBasicMaterial();
// // // note: Basic material properties
// // // material.map = texture;
// // // material.color = new THREE.Color("cyan");
// // // material.color.set("yellow");
// // // material.woreframe = true;
// // // note: If we are changing Alpha value then we need material.transparent = true;
// // // material.transparent = true;
// // // material.opacity = 0.5;
// // // note: set the white color visible and black transparent using alphaMAP
// // // material.transparent = true;
// // // material.color.set('red')
// // // material.alphaMap = alphaMapTexture;
// // // note: Currently only one side of the object is visible(eg: plane) for making sides visible we use side
// // // material.side = THREE.FrontSide;    // shows Front  Side only
// // // material.side = THREE.BackSide;   // shows  Back Side only
// // // material.side = THREE.DoubleSide;   // shows  Both Side

// //! MESH NORMAL MATERIAL
// // const material = new THREE.MeshNormalMaterial();
// // // Has all properties of MeshBasicMaterial
// // material.flatShading = true;

// //! MESH NORMAL MATERIAL
// // const material = new THREE.MeshMatcapMaterial();
// // // Has all properties of MeshBasicMaterial
// // material.matcap = matCapTexture;

// //! MESH DEPTH MATERIAL
// // const material = new THREE.MeshDepthMaterial();
// // // Has all properties of MeshBasicMaterial

// //! MESH LAMBERT MATERIAL
// // const material = new THREE.MeshLambertMaterial(); // Reacts to Light
// // // Has all properties of MeshBasicMaterial

// //! MESH PHONG MATERIAL
// // const material = new THREE.MeshPhongMaterial(); // Reacts to Light and gives more reflection
// // material.shininess = 1000; // Amount of reflection
// // material.specular = new THREE.Color('red') // changes the color of the spot of relflection
// // // Has all properties of MeshBasicMaterial

// //! MESH TOON MATERIAL - Cartoonish
// // const material = new THREE.MeshToonMaterial(); // Reacts to Light and has cartoonish effects
// // material.gradientMap = gradientTexture;
// // // Has all properties of MeshBasicMaterial

// //! MESH STANDARD MATERIAL
// // const material = new THREE.MeshStandardMaterial(); // Reacts to Light and can control properties like metalness and roughness
// // material.roughness = 0.65; //
// // material.metalness = 0.45; // 0 - 1
// // // Has all properties of MeshBasicMaterial

// //! MESH PHYSICAL MATERIAL
// const material = new THREE.MeshPhysicalMaterial(); // Same as standard material with a clear coat filter
// // Has all properties of MeshBasicMaterial

// // //~ Material Maps
// // // note: Add THREE Ambient Occlusion uv2 to mesh - MAPS
// // material.map = woodTexture;

// // //& Occlusion
// // material.aoMap = woodAOTexture; // Add a ambient occlusion of the same image to increase depth
// // material.aoMapIntensiry = 100;

// // //& Displacement
// // material.displacementMap = woodAOTexture; // Displaces each of the vertices of the frame
// // material.displacementScale = 0.05; // Amount of displacement of each vertices

// // //& Metalness
// // material.metalnessMap = woodAOTexture; // White highly metallic and black least metallic

// // //& Roughness
// // material.roughnessMap = woodAOTexture;

// // //& Normal
// // material.normalMap = woodAOTexture;
// // material.normalScale.set(0.5, 0.5);

// // //& Alpha
// // material.transparent = true;
// // material.alphaMap = alphaMapTexture;

// //* LIGHTS
// const ambientLight = new THREE.AmbientLight("white", 0.5);
// scene.add(ambientLight);
// console.log(ambientLight);

// const pointLight = new THREE.PointLight();
// pointLight.position.set(2, 3, 4);
// scene.add(pointLight);
// console.log(pointLight);

// //* OBJECTS
// const sphere = new THREE.Mesh(
//   new THREE.SphereBufferGeometry(0.5, 64, 64),
//   material
// );

// const torus = new THREE.Mesh(
//   new THREE.TorusBufferGeometry(0.3, 0.1, 16, 32),
//   material
// );

// const plane = new THREE.Mesh(
//   new THREE.PlaneBufferGeometry(1, 1, 100, 100),
//   material
// );

// sphere.position.x = 0;
// plane.position.x = -2;
// torus.position.x = 2;

// plane.geometry.setAttribute(
//   "uv2",
//   new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
// );
// sphere.geometry.setAttribute(
//   "uv2",
//   new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
// );
// torus.geometry.setAttribute(
//   "uv2",
//   new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
// );

// scene.add(sphere, plane, torus);

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

// //~ CONTROLLER
// const dumbElement = canvas;
// const controls = new THREE.OrbitControls(camera, dumbElement);
// controls.target.set(0, 0, 0);
// controls.enabled = true;
// controls.enableDamping = true;
// controls.update();

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

// const clock = new THREE.Clock();
// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   // Add Code here
//   sphere.rotation.x = 0.15 * elapsedTime;
//   sphere.rotation.y = 0.1 * elapsedTime;

//   torus.rotation.x = 0.15 * elapsedTime;
//   torus.rotation.y = 0.1 * elapsedTime;

//   plane.rotation.x = 0.15 * elapsedTime;
//   plane.rotation.y = 0.1 * elapsedTime;

//   // * Rendering out to screen
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };

// tick();

// * ******************************************** PART 2 *************************************************

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
const texture = new THREE.TextureLoader();

//! MATERIAL
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.65;
material.metalness = 0.45;
//* Environmnet reflection texture for mesh standard material
const cubeTexture = new THREE.CubeTextureLoader();
// const environment = cubeTexture.load(positive_x, negetive_x, positive_y, negetive_y, positive_z, negetive_z)
// const environment = cubeTexture.load()

//* LIGHTS
const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);
console.log(ambientLight);

const pointLight = new THREE.PointLight();
pointLight.position.set(2, 3, 4);
scene.add(pointLight);
console.log(pointLight);

//* OBJECTS
const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1.5, 64, 64),
  material
);

sphere.position.x = 0;
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

scene.add(sphere);

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

//~ CONTROLLER
const dumbElement = canvas;
const controls = new THREE.OrbitControls(camera, dumbElement);
controls.target.set(0, 0, 0);
controls.enabled = true;
controls.enableDamping = true;
controls.update();

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

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Add Code here
  sphere.rotation.x = 0.15 * elapsedTime;
  sphere.rotation.y = 0.1 * elapsedTime;

  // * Rendering out to screen
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
