class LightDeadTree extends Unit{
    constructor(){
        super(LightDeadTreeSprite);
    }
    name = "LightDeadTree";
    player = "passive";
    atc = 0;
    onclick = ()=>{};
    moveable = false;
};

class DarkDeadTree extends Unit{
    constructor(){
        super(DarkDeadTreeSprite);
    }
    name = "DarkDeadTree";
    player = "passive";
    atc = 0;
    onclick = ()=>{};
    moveable = false;
};

class BlueKingSlime extends Unit{
    constructor(){
        super(GreenKingSlimeSprite);
    }
    name = "BlueKingSlime";
    watchingRadius = 10;
    onclick(){
        this.sprite.changeAnimation(["static", "moveLeft", "moveRight", "moveTop"][randint(0, 4)]);
    }
}


class GreenKingSlime extends Unit{
    constructor(){
        super(BlueKingSlimeSprite);
    }
    name = "GreenKingSlime";
    watchingRadius = 10;
    onclick(){
        this.sprite.changeAnimation(["static", "moveLeft", "moveRight", "moveTop"][randint(0, 4)]);
    }
}


class SwordsManRed extends Unit{
    constructor(){
        super(SwordsManRedSprite);
    }
    name = "SwordsManRed";
}