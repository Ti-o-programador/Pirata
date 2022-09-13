class Cannon 
{

    constructor(x, y, larg, alt, angulo)
    {
        this.x = x;
        this.y = y;
        this.larg = larg;
        this.alt = alt;
        this.angulo = angulo;
    }

    show()
    {
        push();
        imageMode(CENTER);
        image(cannonImg,this.x, this.y, this.larg, this.alt);
        pop();

        image(cannonBaseImg,70,20,200,210);
        noFill();

    }

}
