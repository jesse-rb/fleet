import type Body from "./body";
import { loader } from './three';

class bodyManager {
    bodies:Array<Body> = [];

    add(body:Body) {
        this.bodies.push(body);
        loader.load( '/models/ship2.glb', function ( gltf:any ) {
            const scene:THREE.Scene = gltf.scene;
            body.setScene(scene);
            scene.position.z = -5;
            scene.add( ships.ship );
        }, undefined, ( error:any ) => console.error( error ));

    }
}
