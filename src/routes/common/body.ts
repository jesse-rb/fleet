import type { Point } from './common'

export default class Body implements Body {
    // Fundamentals
    position:Point;
    velocity:Point;
    velocityRotational:Point;
    mass:number;

    // Threejs
    model:string|null = null;
    private scene:THREE.Scene|null = null;

    constructor(pos:Point={x:0,y:0,z:0}, vel:Point={x:0,y:0,z:0}, velRot:Point={x:0,y:0,z:0}, mass:number=1) {
        this.position = pos;
        this.velocity = vel;
        this.velocityRotational = velRot;
        this.mass = mass;
    }

    get getScene():THREE.Scene|null {
        return this.scene;
    }

    setScene(scene:any) {
        this.scene = scene;
    }
}
