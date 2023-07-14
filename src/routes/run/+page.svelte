<script>
    // @ts-ignore TODO: quick fix
    import * as THREE from 'three';
    import { onMount } from 'svelte';

    let sceneContainer:?HTMLDivElement = null;

    onMount(() => {
        const width = sceneContainer.innerWidth;
        const height = sceneContainer.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild( renderer.domElement );
    });

</script>

<div>

    <div bind:this={ sceneContainer }>

    </div>
</div>
