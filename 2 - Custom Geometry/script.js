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

//~ CUSTOM GEOMETRY
// https://r105.threejsfundamentals.org/threejs/lessons/threejs-custom-buffergeometry.html
const vertices = [
  // front
  { pos: [-1, -1, 1], norm: [0, 0, 1], uv: [0, 1] },
  { pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 1] },
  { pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 0] },

  { pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 0] },
  { pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 1] },
  { pos: [1, 1, 1], norm: [0, 0, 1], uv: [1, 0] },
  // right
  { pos: [1, -1, 1], norm: [1, 0, 0], uv: [0, 1] },
  { pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 1] },
  { pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 0] },

  { pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 0] },
  { pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 1] },
  { pos: [1, 1, -1], norm: [1, 0, 0], uv: [1, 0] },
  // back
  { pos: [1, -1, -1], norm: [0, 0, -1], uv: [0, 1] },
  { pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 1] },
  { pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 0] },

  { pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 0] },
  { pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 1] },
  { pos: [-1, 1, -1], norm: [0, 0, -1], uv: [1, 0] },
  // left
  { pos: [-1, -1, -1], norm: [-1, 0, 0], uv: [0, 1] },
  { pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 1] },
  { pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 0] },

  { pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 0] },
  { pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 1] },
  { pos: [-1, 1, 1], norm: [-1, 0, 0], uv: [1, 0] },
  // top
  { pos: [1, 1, -1], norm: [0, 1, 0], uv: [0, 1] },
  { pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 1] },
  { pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 0] }, 

  { pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 0] },
  { pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 1] },
  { pos: [-1, 1, 1], norm: [0, 1, 0], uv: [1, 0] },
  // bottom
  { pos: [1, -1, 1], norm: [0, -1, 0], uv: [0, 1] },
  { pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 1] },
  { pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 0] },

  { pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 0] },
  { pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 1] },
  { pos: [-1, -1, -1], norm: [0, -1, 0], uv: [1, 0] },
];
const positions = [];
const normals = [];
const uvs = [];
for (const vertex of vertices) {
  positions.push(...vertex.pos);
  normals.push(...vertex.norm);
  uvs.push(...vertex.uv);
}
const geometry = new THREE.BufferGeometry();
const positionNumComponents = 3;
const normalNumComponents = 3;
const uvNumComponents = 2;
geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents)
);
geometry.setAttribute(
  "normal",
  new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents)
);
geometry.setAttribute(
  "uv",
  new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents)
);

// geometry.setIndex([
//     0,  1,  2,   2,  1,  3,  // front
//     4,  5,  6,   6,  5,  7,  // right
//     8,  9, 10,  10,  9, 11,  // back
//    12, 13, 14,  14, 13, 15,  // left
//    16, 17, 18,  18, 17, 19,  // top
//    20, 21, 22,  22, 21, 23,  // bottom
//  ]);

const material = new THREE.MeshBasicMaterial({
  color: "cyan",
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// const vertices = new Float32Array([0, 0, 0, 0, 1, 0, 0, 0, 1]);

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
// const material = new THREE.MeshBasicMaterial({
//   color: "cyan",
//   wireframe: true
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

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
