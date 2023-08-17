import type Body from "./body";
import { loader } from './three';
import { scene } from "./three";

export class BodyManager {
    bodies:Array<Body> = [];

    add(body:Body) {
        this.bodies.push(body);
        loader.load(body.model , function ( gltf:any ) {
            const bodyScene:THREE.Scene = gltf.scene;
            body.setScene(bodyScene);
            scene.add( bodyScene );
        }, undefined, ( error:any ) => console.error( error ));

    }

    animate() {
        for(const b of this.bodies) {
            b.animate();
        }
    }
}
