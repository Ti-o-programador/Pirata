class Boat {
    constructor(x, y, width, height, boatPos, boatAnimation)
    {
        this.image = loadImage("./assets/boat.png");
        this.width = width;
        this.height = height;

        this.body = Bodies.rectangle(x, y, width, height);
        World.add(world, this.body);
        this.boatPosition = boatPos;
        this.boatAnimation = boatAnimation;
        this.speed = 0.05;
        this.isBroken = false;
    }

    animate()
    {
        this.speed += 0.05;
    }

    show()
    {
        var angle = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed % this.boatAnimation.length);

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.boatAnimation[index], 0, this.boatPosition, this.width, this.height);
        pop();
    }

    remove(boatIndex) {
        this.boatAnimation = brokenBoatAnimation;
        this.speed = 0.05;
        this.width = this.height = 300;
        this.isBroken = true;
        setTimeout(() => {
            World.remove(world, this.body);
            delete boats[boatIndex];
        }, 2000);
    }

}