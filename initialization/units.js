class LightDeadTree extends Unit{
    constructor(){
        super(LightDeadTreeSprite);
    }
    name = "LightDeadTree";
    player = "passive";
    atc = 0;
    onclick = ()=>{};
    moveable = false;
    atcRange = 0;
    watchingRadius = 0;
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
    atcRange = 0;
    watchingRadius = 0;
};

class BlueKingSlime extends Unit{
    constructor(){
        super(BlueKingSlimeSprite);
    }
    name = "BlueKingSlime";
    watchingRadius = 10;
    atcRange = 5;
    onclick(){
        this.die();
    }
}


class GreenKingSlime extends Unit{
    constructor(){
        super(GreenKingSlimeSprite);
    }
    name = "GreenKingSlime";
    watchingRadius = 10;
    atcRange = 5;
    onclick(){
        this.die();
    }
}


class SwordsManRed extends Unit{
    constructor(){
        super(SwordsManRedSprite);
    }
    name = "SwordsManRed";
}