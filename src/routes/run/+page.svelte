<script lang="ts">
    // @ts-ignore TODO: quick fix
    import { onMount } from 'svelte';


    let sceneContainer:any = null;
    let ships:any = {};
    let keys:any = {};
    let mouseX:number = 0;
    let mouseY:number = 0;
    let mouseMovementX:number = 0;
    let mouseMovementY:number = 0;
    let mouseDown:boolean = false;
    let mouseMoving:boolean = false;

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
        addShip();
        animate();
        handleKeys();
        handleMouse();

        const pointLight = new THREE.PointLight( 0xfffefe, 1, 100);
        pointLight.position.set( 20, 20, 20 );
        scene.add( pointLight );

        const sphereSize = 1;
        const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        scene.add( pointLightHelper );

        document.addEventListener('keydown', setKeys);
        document.addEventListener('keyup', setKeys);
        sceneContainer.addEventListener('mousedown', setMouse);
        sceneContainer.addEventListener('mouseup', setMouse);
        sceneContainer.addEventListener('mousemove', setMouse);
        sceneContainer.addEventListener('contextmenu', setMouse);

        console.log("[lifecycle] mounted");
    });

    function animate() {
        animateShips();
        renderer?.render(scene, camera)
        requestAnimationFrame(animate);
    }

    function addShip() {

            }

    function animateShips() {
        if (ships.ship) {
            ships.ship.rotation.x += 0.001;
            ships.ship.rotation.y += 0.001;
        }
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

            const vForward = new THREE.Vector3();
            camera.getWorldDirection(vForward).normalize().multiplyScalar(0.1);
            const vUp = new THREE.Vector3(0, 1, 0);
            const cameraUp:THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
            cameraUp.copy(camera);
            cameraUp.rotateX(Math.PI/2).getWorldDirection(vUp).normalize().multiplyScalar(0.1);
            const vRight: THREE.Vector3 = new THREE.Vector3().crossVectors(vForward, vUp).normalize().multiplyScalar(0.1);

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
