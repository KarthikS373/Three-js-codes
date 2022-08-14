const scene = new THREE.Scene();

size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const fov = 45;
const aspectRatio = size.width / size.height;
const near = 0.1,
  far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
camera.position.set(0, 0, 10);
scene.add(camera);  

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;
// material.metalness = 0.45;
material.side = THREE.DoubleSide;

// const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(3, 3, 3), material);
const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(2, 100, 100, 0, Math.PI * 2),
  material
);
const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(15, 15, 100, 100),
  material
);
scene.add(sphere, plane);
plane.rotation.x = Math.PI / 2;
plane.position.y = -2.5;

//~ LIGHTS

//! AMBIENT LIGHT - Spread light equally to all object in all direction (All part of mesh lighted up equally)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // THREE.AmbientLight(color, intensity)
// scene.add(ambientLight)
// // ambientLight.color = new THREE.Color('yellow');
// // ambientLight.intensity = 4;

//! DIRECTIONAL LIGHT - Sun like effect of parallel lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3); // THREE.DirectionalLight(color, intensity)
directionalLight.position.set(5, 1, 1);
scene.add(directionalLight);
// directionalLight.color = new THREE.Color('yellow');
// directionalLight.intensity = 4;

//! HEMISPHERE LIGHT - Two parts of object in two colors and center is almost like mixture
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.4); // THREE.HemisphereLight(color1, color2,intensity)
scene.add(hemisphereLight);
hemisphereLight.position.set(5, 4, 1);
// hemisphereLight.intensity = 4;

//! POINT LIGHT - Two parts of object in two colors and center is almost like mixture
const pointLight = new THREE.PointLight(0xff9000, 0.2, 10, 5); // THREE.PointLight(color,intensity, distance, decay)
//// distance - Maximum range of the light. Default is 0 (no limit).
//// decay - The amount the light dims along the distance of the light. Default is 1. For physically correct lighting, set this to 2.
scene.add(pointLight);
pointLight.position.set(5, 5, 1);
// pointLight.position.set(10, 10, 1);
// pointLight.color = new THREE.Color('yellow');
// pointLight.intensity = 4;

//! RECTAREA LIGHT - Two parts of object in two colors and center is almost like mixture
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 1, 10, 10); // THREE.RectAreaLight(color,intensity, width, height)
rectAreaLight.position.set(0, 10, 0);
rectAreaLight.lookAt(plane.position);
scene.add(rectAreaLight);
// rectAreaLight.color = new THREE.Color('yellow');
// rectAreaLight.intensity = 4;

//! SPOT LIGHT
// SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
const spotLight = new THREE.SpotLight(
  0x78ff00,
  0.5,
  10,
  Math.PI * 0.2,
  0.25,
  1
);
scene.add(spotLight.target);
spotLight.target.position.x = -10; //note: spotLight.target.position
scene.add(spotLight);
// color - (optional) hexadecimal color of the light. Default is 0xffffff (white).
// intensity - (optional) numeric value of the light's strength/intensity. Default is 1.
// distance - Maximum range of the light. Default is 0 (no limit).
// angle - Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.
// penumbra (FADING OF LIGHT AT EDGES)- Percent of the spotlight cone that is attenuated due to penumbra. Takes values between zero and 1. Default is zero.
// decay - The amount the light dims along the distance of the light.

// //~ LIGHT HELPERS
// // constructor(helpLight, sixzeofHelper) -> hemisphere, directional, point

// //! Hemisphere Light Helper
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(
//   hemisphereLight,
//   0.5
// );
// scene.add(hemisphereLightHelper);

// //! Directional Light Helper
// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight,
//   0.5
// );
// scene.add(directionalLightHelper);

//! Point Light Helper
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
// scene.add(pointLightHelper);

// // constructor(helpLight) -> spotlight
// //! Spot Light Helper
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);
// window.requestAnimationFrame(() => {
//   spotLightHelper.update();
// });


// const axis = new THREE.AxisHelper(20);
// scene.add(axis)

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
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
  sphere.rotation.y = elapsedTime * 3;
  plane.rotation.z = -elapsedTime * 0.5;

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect - size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.render(scene, camera);
});

window.addEventListener("dblclick", () => {
  renderer.render(scene, camera);
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen();
  }
});
