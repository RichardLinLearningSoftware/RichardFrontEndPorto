import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { degToRad } from "three/src/math/MathUtils.js";
let mixer = new THREE.AnimationMixer();

const viewport = document.getElementsByClassName("viewport-3D")[0];

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, viewport.clientWidth / viewport.clientHeight);
camera.position.set(0, 0.5, 3.5);
camera.lookAt(0,0,0);

const light = new THREE.AmbientLight( 0xffffff, 1); // soft white light

//Directional lighting
const directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5);
directionalLight.position.set(0, 2, 1);
directionalLight.lookAt(0,0,0);

//Adding the objects into the scene
scene.add(camera, light, directionalLight);

const loader = new GLTFLoader();
const computerHeadGLB = await loader.loadAsync( '/assets/models/tvHead.gltf' );
const computerHead = computerHeadGLB.scene;
computerHead.position.set(0, -0.5,0)
computerHead.rotation.y = degToRad(180);
scene.add(computerHead);

//Animations
const walk = mixer.clipAction(computerHeadGLB.animations[0], computerHeadGLB.scene);
walk.setLoop(THREE.LoopForever);

const run = mixer.clipAction(computerHeadGLB.animations[1], computerHeadGLB.scene);
run.setLoop(THREE.LoopForever);

const endSit = mixer.clipAction(computerHeadGLB.animations[2], computerHeadGLB.scene);
endSit.setLoop(THREE.LoopOnce, 1);
endSit.clampWhenFinished = false;

const startSit = mixer.clipAction(computerHeadGLB.animations[3], computerHeadGLB.scene);
startSit.setLoop(THREE.LoopOnce, 1);
startSit.clampWhenFinished = true;

const intereact = mixer.clipAction(computerHeadGLB.animations[4], computerHeadGLB.scene);
intereact.setLoop(THREE.LoopOnce, 1);
intereact.clampWhenFinished = false;

const wave = mixer.clipAction(computerHeadGLB.animations[5], computerHeadGLB.scene);
wave.setLoop(THREE.LoopOnce, 1);
wave.clampWhenFinished = false;

const idle = mixer.clipAction(computerHeadGLB.animations[6], computerHeadGLB.scene);
idle.setLoop(THREE.LoopForever);

const showItem = mixer.clipAction(computerHeadGLB.animations[7], computerHeadGLB.scene);
showItem.setLoop(THREE.LoopOnce, 1);
showItem.clampWhenFinished = true;

const stowItem = mixer.clipAction(computerHeadGLB.animations[8], computerHeadGLB.scene);
stowItem.setLoop(THREE.LoopOnce, 1);
stowItem.clampWhenFinished = false;

const jump = mixer.clipAction(computerHeadGLB.animations[9], computerHeadGLB.scene);
jump.setLoop(THREE.LoopOnce, 1);
jump.clampWhenFinished = false;
// Animations ^

startSit.play();

//Renderers for a scene
const renderer = new THREE.WebGLRenderer({ 
    alpha: true 
});

viewport.appendChild(renderer.domElement);
renderer.setSize(viewport.clientWidth, viewport.clientHeight);

console.log(computerHeadGLB);
//Animate the mesh
const timer = new THREE.Timer();
timer.connect(document);
function animate() {
    requestAnimationFrame(animate);
    timer.update();
    const elapsed = timer.getElapsed();
    const delta = timer.getDelta();

    computerHead.rotation.y = 135+elapsed/10;
    mixer.update(delta);
    renderer.render(scene, camera);
}
animate();