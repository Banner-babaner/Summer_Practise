class Unit{
    constructor(sprite, hp=100, atc=10, armor=1, player="neutral", name="Unnamed"){
        this.sprite = new Sprite(undefined);
        Object.assign(this.sprite, sprite);
        this.sprite.connect(this);
        this.hp = hp;
        this.atc = atc;
        this.armor = armor;
        this.player = player;
        this.name = name;
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
}
