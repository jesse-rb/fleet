<script lang="ts">
    // @ts-ignore TODO: quick fix
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { renderer, camera, initRenderer, scene, getForwardVector3, getUpVector3, getRightVector3 } from '../common/three';
    import { BodyManager } from '../common/bodyManager';
    import Body from '../common/body';

    let sceneContainer:any = null;
    let ships:any = {};
    let keys:any = {};
    let mouseX:number = 0;
    let mouseY:number = 0;
    let mouseMovementX:number = 0;
    let mouseMovementY:number = 0;
    let mouseDown:boolean = false;
    let mouseMoving:boolean = false;
    const bodyManager = new BodyManager();

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
        
        initRenderer(sceneContainer);
        animate();
        handleKeys();
        handleMouse();

        const pointLight = new THREE.PointLight( 0xfffefe, 1, 100);
        pointLight.position.set( 20, 20, 20 );
        scene.add( pointLight );

        const sphereSize = 1;
        const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        scene.add( pointLightHelper );

        const flagship = new Body({x:0, y:0, z:-5}, {x:0, y:0, z:0}, {x:0.01, y:0, z:0}, {x:0, y:0.001, z:0}, {x:0.000001, y:0, z:0});
        flagship.model = '/models/ship2.glb';
        bodyManager.add(flagship);

        document.addEventListener('keydown', setKeys);
        document.addEventListener('keyup', setKeys);
        sceneContainer.addEventListener('mousedown', setMouse);
        sceneContainer.addEventListener('mouseup', setMouse);
        sceneContainer.addEventListener('mousemove', setMouse);
        sceneContainer.addEventListener('contextmenu', setMouse);

        console.log("[lifecycle] mounted");
    });

    function animate() {
        bodyManager.animate();
        renderer?.render(scene, camera)
        requestAnimationFrame(animate);
    }

    function setKeys(e:KeyboardEvent) {
        const key = e.key;

        if (e.type === 'keydown') {
            keys[key] = 1;
        }
        else {
            delete keys[key];
        }
    }

    function setMouse(e:MouseEvent) {
        e.preventDefault();
        switch (e.type) {
            case 'mousedown':
                mouseDown = true;
                break;

            case 'mouseup':
                mouseDown = false;
                break;

            case 'mousemove':
                mouseMoving = true;
                mouseMovementX = e.offsetX - mouseX;
                mouseMovementY = e.offsetY - mouseY;
                mouseX = e.offsetX;
                mouseY = e.offsetY;
                break;

            case 'contextmenu':
                // TODO: selecting
                break;

        }
    }

    function handleKeys() {
        for (let k of Object.keys(keys)) {

            const kLower = k.toLowerCase();

            const vForward:THREE.Vector3 = getForwardVector3(camera);
            const vUp:THREE.Vector3 = getUpVector3(camera);
            const vRight:THREE.Vector3 = getRightVector3(camera);

            if (kLower === 'a') {
                camera.position.sub(vRight);
            }
            if (kLower === 'd') {
                camera.position.add(vRight);
            }
            if (kLower === 'w') {
                camera.position.add(vForward);
            }
            if (kLower === 's') {
                camera.position.sub(vForward);
            }
            if (kLower === 'q') {
                camera.rotateZ(0.01);
            }
            if (kLower === 'e') {
                camera.rotateZ(-0.01);
            }
            if (kLower === 'r') {
                camera.position.add(vUp);
            }
            if (kLower === 'f') {
                camera.position.sub(vUp);
            }
        }
        requestAnimationFrame(handleKeys);
    }

    function handleMouse() {
        if (mouseDown && mouseMoving) {
            camera.rotateY(mouseMovementX*0.01);
            camera.rotateX(mouseMovementY*0.01);
        }
        
        mouseMoving = false;
        requestAnimationFrame(handleMouse);
    }

</script>

<div>
    <div id="scene-container" class="cursor-crosshair w-85% h-[85vh]"bind:this={ sceneContainer }></div>
    <div class="text-4xl">
        <span>keys:</span>
        { #each Object.keys(keys) as k }
            <span>{ k }</span>
        { /each }
    </div>
</div>

<style>
    
</style>
