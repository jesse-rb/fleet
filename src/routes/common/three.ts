import * as THREE from 'three';
// @ts-ignore TODO: quick fix
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const loader = new GLTFLoader();
export const scene:THREE.Scene = new THREE.Scene();
export const camera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
export let renderer:THREE.WebGLRenderer|null;

