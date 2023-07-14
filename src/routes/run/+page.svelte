<script lang="ts">
    // @ts-ignore TODO: quick fix
    import * as THREE from 'three';
    import { onMount } from 'svelte';

    let sceneContainer:any = null;

    onMount(() => {
        const sceneContainerRect = sceneContainer.getBoundingClientRect();
        const width = sceneContainerRect.width;
        const height = sceneContainerRect.height;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        sceneContainer.appendChild( renderer.domElement );

        const geom = new THREE.BoxGeometry(1, 1, 1);
        const mat = new THREE.MeshBasicMaterial({color: 0x00ff00 });
        const cube = new THREE.Mesh(geom, mat);

        scene.add(cube);
        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        animate();
    });

    

</script>

<div>

    <div id="scene-container" bind:this={ sceneContainer }>

    </div>
</div>

<style>
    #scene-container {
        width: 1600px;
        height: 900px;
    }
</style>
