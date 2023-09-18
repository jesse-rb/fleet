import * as THREE from 'three';
// @ts-ignore TODO: quick fix
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const loader = new GLTFLoader();
export const scene:THREE.Scene = new THREE.Scene();
export const camera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
export let renderer:THREE.WebGLRenderer|null;

export function initRenderer(container:Element) {
    renderer = new THREE.WebGLRenderer();
    container.appendChild(renderer.domElement);
}

export function getForwardVector3(obj:THREE.Object3D):THREE.Vector3 {
    const v = new THREE.Vector3();
    obj.getWorldDirection(v).normalize().multiplyScalar(0.1);
    return v;
}

export function getUpVector3(obj:THREE.Object3D):THREE.Vector3 {
    const v = new THREE.Vector3(0, 1, 0);
    const objUp:THREE.Object3D = new THREE.Object3D();
    objUp.copy(obj);
    objUp.rotateX(Math.PI/2).getWorldDirection(v).normalize().multiplyScalar(-0.1);
    return v;

}

export function getRightVector3(obj:THREE.Object3D):THREE.Vector3 {
    const vForward:THREE.Vector3 = getForwardVector3(obj);
    const vUp:THREE.Vector3 = getUpVector3(obj);
    const v:THREE.Vector3 = new THREE.Vector3().crossVectors(vForward, vUp).normalize().multiplyScalar(0.1);
    return v;
}
