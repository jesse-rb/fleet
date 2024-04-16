import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import Body from '../common/body';
import { getForwardVector3, getRightVector3, scene } from '../common/three';

export default class Ship extends Body {

    ai() {
        if (this.getScene) {
            const vForward:Vector3 = getForwardVector3(this.getScene);
            const vRight:Vector3 = getRightVector3(this.getScene);
            if ( vRight < new Vector3(0, 0, 0) ) {
                this.thrust.sub(vRight.multiplyScalar(0.01));
            }
            this.thrust = vForward.multiplyScalar(1);
            this.thrustRotational.randomDirection().multiplyScalar(0.0005);
        }
        requestAnimationFrame(()=>this.ai());
    }

    setRandomMesh() {
        const geometry = new BoxGeometry( 1, 1, 1 ); 
        const material = new MeshBasicMaterial( {color: 0x00ff00} ); 
        const cube = new Mesh( geometry, material );

        this.setScene(cube);
        
        scene.add(cube);
    }

}
