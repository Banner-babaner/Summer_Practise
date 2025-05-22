var BlueKingSlimeSprite;
var GreenKingSlimeSprite;
var BlueMegaSlimeSprite;
var GreenMegaSlimeSprite;
var BlueSlimeSprite;
var GreenSlimeSprite;

var DarkDeadTreeSprite;
var LightDeadTreeSprite;

var SwordsManRedSprite;

async function createSprites(){
    BlueKingSlimeSprite = new Sprite(BlueKingSlimeImageMap.getRow(0), 5, 5, 5);
    BlueKingSlimeSprite.addAnimation("moveDown", BlueKingSlimeImageMap.getRow(0));
    BlueKingSlimeSprite.addAnimation("moveLeft", BlueKingSlimeImageMap.getRow(1));
    BlueKingSlimeSprite.addAnimation("moveRight", BlueKingSlimeImageMap.getRow(2));
    BlueKingSlimeSprite.addAnimation("moveTop", BlueKingSlimeImageMap.getRow(3));

    GreenKingSlimeSprite = new Sprite(GreenKingSlimeImageMap.getRow(0), 5, 5, 5);
    GreenKingSlimeSprite.addAnimation("moveDown", GreenKingSlimeImageMap.getRow(0));
    GreenKingSlimeSprite.addAnimation("moveLeft", GreenKingSlimeImageMap.getRow(1));
    GreenKingSlimeSprite.addAnimation("moveRight", GreenKingSlimeImageMap.getRow(2));
    GreenKingSlimeSprite.addAnimation("moveTop", GreenKingSlimeImageMap.getRow(3));

    DarkDeadTreeSprite = new Sprite(DeadTreesImageMap.getRow(0, 2, 3), 2, 2);
    LightDeadTreeSprite = new Sprite(DeadTreesImageMap.getRow(0, 3), 2, 2);

    SwordsManRedSprite = new Sprite(SwordsManRedImageMap.getRow(0), 2, 2, 10);
    SwordsManRedSprite.addAnimation("moveDown", SwordsManRedImageMap.getRow(0));
    SwordsManRedSprite.addAnimation("moveLeft", SwordsManRedImageMap.getRow(3));
    SwordsManRedSprite.addAnimation("moveTop", SwordsManRedImageMap.getRow(1));
    SwordsManRedSprite.addAnimation("moveRight", SwordsManRedImageMap.getRow(2));
    SwordsManRedSprite.addAnimation("beatDown", SwordsManRedImageMap.getRow(4, 0, 4));
    SwordsManRedSprite.addAnimation("beatLeft", SwordsManRedImageMap.getRow(7, 0, 4));
    SwordsManRedSprite.addAnimation("beatTop", SwordsManRedImageMap.getRow(5, 0, 4));
    SwordsManRedSprite.addAnimation("beatRight", SwordsManRedImageMap.getRow(6, 0, 4));

}