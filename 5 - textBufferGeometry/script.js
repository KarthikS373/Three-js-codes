// console.log(TYPEFONT)

//* SCENE
const scene = new THREE.Scene();

//~ TEXT TEXTURES & FONTS
const fontLoader = new THREE.FontLoader();
const font = fontLoader.load("./Poppins_ExtraLight_Regular.json", (font) => {
  // console.log(font)
  const textGeometry = new THREE.TextBufferGeometry("Karthik", {
    font: font,
    size: 0.6, // Size of text in 2D
    height: 0.2, // 3D height
    curveSegments: 12, // controls the curveness of curves
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5, // segments/ quality at bevelled corners
  }
);

  //   // textGeometry.computeBoundingBox(); // Used to unlock bounding box
  //   // console.log(textGeometry.boundingBox) // the location of the position where axis passes

  //   // textGeometry.translate(
  //   //   - textGeometry.boundingBox.max.x * 0.5,
  //   //   - textGeometry.boundingBox.max.y * 0.5,
  //   //   - textGeometry.boundingBox.max.z * 0.5,
  //   // ) // Translate the axis of revolution to the center

  textGeometry.center();

  const textMaterial = new THREE.MeshNormalMaterial();
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);
});

// //* AXES HELPER
// const axis = new THREE.AxesHelper(3);
// scene.add(axis);

//* SIZE
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspect = size.width / size.height;
const fov = 45;
let near = 0.1;
let far = 100;

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
