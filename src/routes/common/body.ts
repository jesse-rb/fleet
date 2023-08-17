import type { Scene } from 'three';
import type { Point } from './common'

export default class Body implements Body {
    // Fundamentals
    position:Point;
    rotation:Point;
    velocity:Point;
    velocityRotational:Point;
    thrust:Point;
    thrustRotational:Point;
    mass:number;

    // Threejs
    model:string|null = null;
    private scene:THREE.Scene|null = null;

    constructor(pos:Point={x:0,y:0,z:0}, rot:Point={x:0,y:0,z:0}, vel:Point={x:0,y:0,z:0}, velRot:Point={x:0,y:0,z:0}, thrust:Point={x:0,y:0,z:0}, thrustRot:Point={x:0,y:0,z:0}, mass:number=1) {
        this.position = pos;
        this.rotation = rot;
        this.velocity = vel;
        this.velocityRotational = velRot;
        this.thrust = thrust;
        this.thrustRotational = thrustRot;
        this.mass = mass;
    }

    get getScene():THREE.Scene|null {
        return this.scene;
    }

    private updateScene() {
        if (this.scene) {
            this.scene.position.x = this.position.x;
            this.scene.position.y = this.position.y;
            this.scene.position.z = this.position.z;
            this.scene.rotation.x = this.rotation.x;
            this.scene.rotation.y = this.rotation.y;
            this.scene.rotation.z = this.rotation.z;
        }
    }

    setScene(scene:Scene) {
        this.scene = scene;
        this.updateScene();
    }

    thrustToVel(rot:number, thrust:number) {
        let fn = (((rot%Math.PI)/Math.PI)-(1/2))*2;
        fn = Math.abs(fn);
        //console.log(rot/Math.PI+'pi');
        //console.log(fn);
        const vel = fn*thrust;
        console.log(vel);
        return vel;
    }

    animate() {
        this.velocity.x += this.thrustToVel(this.rotation.y, this.thrust.x);
        this.velocity.z += this.thrustToVel(this.rotation.y, this.thrust.x);

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;
        this.rotation.x += this.velocityRotational.x;
        this.rotation.y += this.velocityRotational.y;
        this.rotation.z += this.velocityRotational.z;

        if (this.scene) {
            this.updateScene();
        }
    }
}
