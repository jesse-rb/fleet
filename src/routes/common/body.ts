import { Vector3, type Scene } from 'three';
import type { Point } from './common'

export default class Body implements Body {
    // Fundamentals
    position:Point;
    rotation:Point;
    velocity:Vector3;
    velocityRotational:Vector3;
    thrust:Vector3;
    thrustRotational:Vector3;
    mass:number;

    // Threejs
    model:string|null = null;
    private scene:THREE.Scene|null = null;

    constructor(pos:Point={x:0,y:0,z:0}, rot:Point={x:0,y:0,z:0}, vel:Vector3=new Vector3(0, 0, 0), velRot:Vector3=new Vector3(0, 0, 0), thrust:Vector3=new Vector3(0, 0, 0), thrustRot:Vector3=new Vector3(0, 0, 0), mass:number=1) {
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

    setScene(scene:Scene) {
        this.scene = scene;
        this.updateScene();
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

    animate() {
        this.velocity.add(this.thrust);
        this.velocityRotational.add(this.thrustRotational);

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
