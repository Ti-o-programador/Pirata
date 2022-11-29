class CannonBall {
    constructor(x, y)
    {
        this.radius = 30;
        this.speed = 0.05;
        this.image = loadImage("./assets/cannonball.png");
        this.body = Bodies.circle(x, y, this.radius, { isStatic: true });
        World.add(world, this.body);
        this.animation = [this.image];
        this.trajectory = [];
        this.isSink = false;
    }

    animate()
    {
        this.speed += 0.05;
    }

    display()
    {
        var angle = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed % this.animation.length);

        push(); // captura uma nova configuracao
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index], 0, 0, this.radius, this.radius);
        pop(); // volta a configuracao anterior
    }

    shoot()
    {
        var newAngle = cannon.angulo - 28;
        newAngle = newAngle * (3.14/180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5)
        Body.setStatic(this.body,false);
        Body.setVelocity(this.body, {
            x:velocity.x*(180/3.14),
            y:velocity.y*(180/3.14)
        });
    }

    remove(ballIndex) {
        this.isSink = true;
        Body.setVelocity(this.body, {x:0, y:0});

        this.animation = splashAnimation;
        this.speed = 0.05;
        this.radius = 150;

        setTimeout(() => {
            World.remove(world, this.body);
            delete balls[ballIndex];
        }, 1000);

    }
}
