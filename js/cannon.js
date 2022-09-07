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
        rectMode(CENTER);
        rect(this.x, this.y, this.larg, this.alt);
        pop();

        rect(70,20,200,200);
        noFill();

    }

}
