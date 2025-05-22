class Unit{
    constructor(sprite, hp=100, atc=10, armor=1, player="neutral", name="Unnamed"){
        this.sprite = new Sprite(undefined);
        Object.assign(this.sprite, sprite);
        this.sprite.connect(this);
        unitList.push(this);
        this.hp = hp;
        this.atc = atc;
        this.atcRange=1;
        this.atcInterval=1;
        this.armor = armor;
        this.player = player;
        this.name = name;
        this.hpRegen=0;
        this.watchingRadius=20;
    }


    die(){

    }



    changeHp(dHp){
        this.hp-=dHp;
        if(this.hp<1){
            this.die();
        }
    }

    onclick(){
        alert(`Name:    ${this.name}\nHp: ${this.hp}\nAtc:   ${this.atc}\nArmor:  ${this.armor}\nCommand:    ${this.player}\n`);
    }

    onhover(){
        
    }

    put(x, y){
        this.sprite.put(x, y);
        let index=unitList.indexOf(this);
        if(index>-1){
            unitList.splice(index, 1);
        }
        unitList.push(this);

    }

    findEnemyNearby(){

    }

    move(way){
        switch(way){
            case "top":
                this.sprite.changeAnimation("moveTop", false);
                this.put(this.sprite.x, this.sprite.y-1);
                break;
            case "right":
                this.sprite.changeAnimation("moveRight", false);
                this.put(this.sprite.x+1, this.sprite.y);
                break;
            case "down":
                this.sprite.changeAnimation("moveDown", false);
                this.put(this.sprite.x, this.sprite.y+1);
                break;
            case "left":
                this.sprite.changeAnimation("moveLeft", false);
                this.put(this.sprite.x-1, this.sprite.y);
                break;
            case "stop":
                this.sprite.changeAnimation("static", false);
                break;
            default:
                throw "Куда ._."
        }
    }
    beat(way){
        switch(way){
            case "top":
                this.sprite.changeAnimation("beatTop");
                break;
            case "right":
                this.sprite.changeAnimation("beatRight");
                break;
            case "down":
                this.sprite.changeAnimation("beatDown");
                break;
            case "left":
                this.sprite.changeAnimation("beatLeft");
                break;
            case "stop":
                this.sprite.changeAnimation("static");
                break;
            default:
                throw "Куда ._."
        }

    }
    hit(){

    }

}
