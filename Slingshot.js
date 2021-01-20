class Slingshot{
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10
        }
        this.sling1 = loadImage("sprites/sling1.png");
        this.sling2 = loadImage("sprites/sling2.png");
        this.sling3 = loadImage("sprites/sling3.png");
        this.chain = Constraint.create(options);
        this.pointB = pointB;
        World.add(world, this.chain);
    }

    display(){
        image(this.sling1, 200, 20);
        image(this.sling2, 170, 20);
        
        if(this.chain.bodyA != null){

            var pointA = this.chain.bodyA.position;
            var pointB = this.pointB;
            stroke("#54270F");
            if(pointA.x <= 220){

                strokeWeight(8);
                line(pointA.x - 25, pointA.y, pointB.x - 10, pointB.y);
                line(pointA.x - 25, pointA.y, pointB.x + 30, pointB.y);
                image(this.sling3, pointA.x - 25, pointA.y - 15, 15, 30);       
    

            } else {

                strokeWeight(6)
                line(pointA.x - 25, pointA.y, pointB.x - 10, pointB.y);
                line(pointA.x - 25, pointA.y, pointB.x + 30, pointB.y);
                image(this.sling3, pointA.x - 25, pointA.y - 15, 15, 30);       

            }
 
        }
    }

    fly(){

        this.chain.bodyA = null;
    }

    attach(body){

        this.chain.bodyA = body;

    }
    
}