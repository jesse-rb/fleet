<script lang="ts">
    // @ts-ignore TODO: quick fix
    import * as THREE from 'three';
    import { onMount } from 'svelte';

    let sceneContainer:any = null;
    let scene:THREE.Scene = new THREE.Scene();
    let camera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
    let renderer:THREE.WebGLRenderer | null;
    let mesh:any = {};

    $: sceneContainerRect = sceneContainer?.getBoundingClientRect();
    $: width = sceneContainerRect?.width;
    $: height = sceneContainerRect?.height;
    
    $: renderer?.setSize(width, height);
    $: if (width && height) {
        camera.fov = 75;
        camera.aspect = width / height;
        camera.near = 0.1;
        camera.far = 1000;
        camera.updateProjectionMatrix();
    }

    onMount(() => {
        console.log("[lifecycle] mounting");

        renderer = new THREE.WebGLRenderer();
        sceneContainer.appendChild( renderer.domElement );
        addMesh();
        animate();

        document.addEventListener('keydown', handleKeyDown);

        console.log("[lifecycle] mounted");
    });

    function animate() {
        requestAnimationFrame(animate);

        animateMesh();
        
        if (scene && camera) {
            renderer?.render(scene, camera)
        }
    }

    function addMesh() {
        const geom:THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
        const mat:THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube:THREE.Mesh = new THREE.Mesh(geom, mat);
        cube.position.z = -5;
        mesh.cube = cube;
        scene?.add(cube);
    }

    function animateMesh() {
        mesh.cube.rotation.x += 0.01;
        mesh.cube.rotation.y += 0.01;
    }

    function handleKeyDown(e:KeyboardEvent) {
        const key = e.key;
        const keyTL = key.toLowerCase();
        console.log(`[event] keydown -> ${key}`);

        if (keyTL === 'a') {
            camera.position.x -= 0.1;
        }
        if (keyTL === 'd') {
            camera.position.x += 0.1;
        }
        if (keyTL === 'w') {
            camera.position.z -= 0.1;
        }
        if (keyTL === 's') {
            camera.position.z += 0.1;
        }
    }

</script>

<div>
    <div id="scene-container" bind:this={ sceneContainer }>

    </div>
</div>

<style>
    #scene-container {
        width: 80vw;
        height: 80vh;
    }
</style>
