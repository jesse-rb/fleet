import type Body from "./body";

export class BodyManager {
    bodies:Array<Body> = [];

    add(body:Body) {
        this.bodies.push(body);
    }

    animate() {
        for(const b of this.bodies) {
            b.animate();
        }
    }
}
