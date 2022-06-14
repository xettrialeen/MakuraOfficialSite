import "./scss/main.css";
import * as THREE from "three";
import gsap from "gsap";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as dat from "dat.gui";

/**
 * Debug
 */

const gui = new dat.GUI();

const canvas = document.querySelector(".webgl");

////////////////////////////////////////////////////////////////////////////
// END OF DEBUG
////////////////////////////////////////////////////////////////////////////

/**
 * creating scene
 */
const scene = new THREE.Scene();

////////////////////////////////////////////////////////////////////////////
// END OF SCENE
////////////////////////////////////////////////////////////////////////////

// creating light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 10, 6);
scene.add(light);

/**
 * Geometry
 */
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "white",
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
////////////////////////////////////////////////////////////////////////////
// END OF GEOMETRY
////////////////////////////////////////////////////////////////////////////

/**
 * Mesh
 */

// creating  controls for drone
const droneControls = {
  x: 0,
  y: 0,
};
// crating conntrols function
function droneControlling() {
  window.addEventListener("keydown", (keys) => {
    if (keys.key === "w") {
      droneControls.y= -10;
   
    } else if (keys.key === "s") {
      droneControls.y =10;
    } else if (keys.key === "a") {
      droneControls.x = 1;
    } else if (keys.key === "d") {
      droneControls.x = -1;
    }
  });
  window.addEventListener("keyup", (keys) => {
    if (keys.key === "w") {
      droneControls.y = 0;
  
    } else if (keys.key === "s") {
      droneControls.y = 0;
    } else if (keys.key === "a") {
      droneControls.x = 0.01;
    } else if (keys.key === "d") {
      droneControls.x = -0.01;
    }
  });
}
console.log(droneControls.x, droneControls.y);
droneControlling();

// loding gltf models
const loader = new GLTFLoader();
const modelUrl = "./drone/scene.gltf";
loader.load(modelUrl, (model) => {
  let drone = model.scene;

  drone.traverse((materials) => {
    if (materials.isMesh) {
      material.material = material;
    }
  });

  const clock = new THREE.Clock();

  const droneAnimation = () => {
    camera.lookAt(drone.position);
    const delta = clock.getDelta();
    const moveDistance = 2.5 * delta;
    if (droneControls.y  ) {
        
    }

    // if (keyboard.pressed("down"))
    //     drone.translateZ(moveDistance);
    // if (keyboard.pressed("up"))
    //     drone.translateZ(-moveDistance);
    // if (keyboard.pressed("left"))
    //     drone.translateX(-moveDistance);
    // if (keyboard.pressed("right"))
    //     drone.translateX(moveDistance);

    // if (keyboard.pressed("w"))
    //     drone.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
    // if (keyboard.pressed("s"))
    //     drone.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
    // if (keyboard.pressed("a"))
    //     drone.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
    // if (keyboard.pressed("d"))
    //     drone.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
    drone.translateZ(droneControls.y * moveDistance);
    drone.rotateY(droneControls.x * moveDistance);

    requestAnimationFrame(droneAnimation);
  };

  droneAnimation();

  scene.add(drone);
});

////////////////////////////////////////////////////////////////////////////
// END OF MESH
////////////////////////////////////////////////////////////////////////////

// todo size
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

////////////////////////////////////////////////////////////////////////////
// END OF SIZE
////////////////////////////////////////////////////////////////////////////

/**
 * camera
 */

const camera = new THREE.PerspectiveCamera(3.5, size.width / size.height);
camera.position.z = 2;
camera.position.x = -166.18;
camera.position.y = 163.31;
gui.add(camera.position, "x", -200, 200, 0.01).name("Camera positon x");
gui.add(camera.position, "y", -200, 200, 0.01).name("Camera positon y");

window.addEventListener("resize", () => {
  // resize canvas

  size.width = window.innerWidth;
  size.height = window.innerHeight;
  //   update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

////////////////////////////////////////////////////////////////////////////
// END OF CAMERA
////////////////////////////////////////////////////////////////////////////

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
scene.add(camera);

////////////////////////////////////////////////////////////////////////////
// END OF RENDERER
////////////////////////////////////////////////////////////////////////////

// controlss
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

////////////////////////////////////////////////////////////////////////////
// END OF CONTROLS
////////////////////////////////////////////////////////////////////////////

/**
 * Animation
 */

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  //   controls.update();
  // mesh.rotation.x= elapsedTime;
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();

////////////////////////////////////////////////////////////////////////////
// END OF ANIMATION
////////////////////////////////////////////////////////////////////////////
