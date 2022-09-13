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
}