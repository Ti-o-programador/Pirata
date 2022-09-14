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
        
        if(keyIsDown(RIGHT_ARROW))
        {
            this.angulo += 1
        }
        if(keyIsDown(LEFT_ARROW))
        {
            this.angulo -= 1
        }

        push();
        translate(this.x,this.y);
        rotate(this.angulo);
        imageMode(CENTER);
        image(cannonImg,0,0,this.larg,this.alt);
        pop();

        image(cannonBaseImg,70,20,200,210);
        noFill();

    }

}
