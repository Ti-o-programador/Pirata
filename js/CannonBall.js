class CannonBall {
    constructor(x, y)
    {
        this.radius = 30;
        this.image = loadImage("./assets/cannonball.png");
        this.body = Bodies.circle(x, y, this.radius, { isStatic: true });
        World.add(world, this.body);
    }

    display()
    {
        var pos = this.body.position;
        push(); // captura uma nova configuracao
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.radius, this.radius);
        pop(); // volta a configuracao anterior
    }

    shoot()
    {
        var newAngle = cannon.angulo - 28;
        newAngle = newAngle * (3.14/180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5)
        Body.setStatic(this.body,false);
        Body.setVelocity(this.body,{
            x:velocity.x*(180/3.14),
            y:velocity.y*(180/3.14)
        });
    }

    remove(index)
    {

    }
}