class Boat {
    constructor(x, y, width, height, boatPos)
    {
        this.image = loadImage("./assets/boat.png");
        this.width = width;
        this.height = height;

        this.body = Bodies.rectangle(x, y, width, height);
        World.add(world, this.body);
        this.boatPosition = boatPos;
    }

    show()
    {
        var angle = this.body.angle;
        var pos = this.body.position;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, this.boatPosition, this.width, this.height);
        pop();
    }
}