import { Vector3 } from 'three';
import Body from '../common/body';
import { getForwardVector3, getRightVector3 } from '../common/three';

export default class Ship extends Body {

    ai() {
        if (this.getScene) {
            const vForward:Vector3 = getForwardVector3(this.getScene);
            const vRight:Vector3 = getRightVector3(this.getScene);
            if ( vRight < new Vector3(0, 0, 0) ) {
                this.thrust.sub(vRight.multiplyScalar(0.01));
            }
            this.thrust = vForward.multiplyScalar(0.0001);
            this.thrustRotational.randomDirection().multiplyScalar(0.00001);
        }
        requestAnimationFrame(()=>this.ai());
    }

}
