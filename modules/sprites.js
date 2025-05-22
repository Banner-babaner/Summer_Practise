class Sprite{
    constructor(staticAnimation, width=1, height=1, framesPerChange=3){
        this.animations = {
            "static" : staticAnimation
        }
        this.width = width;
        this.height = height;

        this.defaultInterval = framesPerChange;
        this.interval = framesPerChange;
        this.frame = 0;
        this.animation = "static";
        this.slide = 0;

        this.x = "none";
        this.y = "none";

        this.name = "Unnamed";
        this.unitReference = undefined;

    }

    changeAnimation(newAnimation, reset=true){
        if(this.animations[newAnimation]) this.animation = newAnimation;
        if(reset){
            this.frame=0;
            this.slide=0;  
        }
    }

    addAnimation(name, newAnimation){
        this.animations[name]=newAnimation;
    }

    update(){
        if(this.frame>=this.interval){
            this.frame=0;
            this.slide++;
        }
        if(this.slide==this.animations[this.animation].length){
            this.slide = 0;
        }
        this.frame++;
        return {
            img: this.animations[this.animation][this.slide],
            height: this.height,
            width: this.width
        };
    }


    putable(x, y){
        if(x+this.width>fieldResolution) return 0;
        if(y+this.height>fieldResolution) return 0;
        if(x<0) return 0;
        if(y<0) return 0;
        for(let i=0; i<this.height; i++){
            for(let j=0; j<this.width; j++){
                if(hitBoxMap[y+i][x+j]&&(hitBoxMap[y+i][x+j]!=this)){
                    return 0;
                }
            }
        }
        return 1;
    }


    put(x, y){
        if(!this.putable(x, y)) return;

        
        if(this.x!="none"){
            spriteMap[this.y][this.x] = undefined;
            for(let i=0; i<this.height; i++){
                for(let j=0; j<this.width; j++){
                    hitBoxMap[this.y+i][this.x+j]=undefined;
                }
            }
        }

        spriteMap[y][x] = this;
        this.x = x;
        this.y = y;
        for(let i=0; i<this.height; i++){
            for(let j=0; j<this.width; j++){
                hitBoxMap[y+i][x+j] = this;
            }
        }
    }

    connect(unit){
        this.unitReference = unit;
    }
    onclick(){
        if(this.unitReference) this.unitReference.onclick();
    }
    onhover(){
        if(this.unitReference) this.unitReference.onhover();
    }

    changeSpeed(mult){
        let test_value = Math.floor(this.defaultInterval/mult);
        this.interval=(test_value>0?test_value:test_value+1);
    }

}

