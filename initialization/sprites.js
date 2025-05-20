var BlueKingSlimeSprite;
var GreenKingSlimeSprite;
var BlueMegaSlimeSprite;
var GreenMegaSlimeSprite;
var BlueSlimeSprite;
var GreenSlimeSprite;

var DarkDeadTreeSprite;
var LightDeadTreeSprite;

async function createSprites(){
    BlueKingSlimeSprite = new Sprite(BlueKingSlimeImageMap.getRow(0), 5, 5, 5);
    BlueKingSlimeSprite.addAnimation("moveLeft", BlueKingSlimeImageMap.getRow(1));
    BlueKingSlimeSprite.addAnimation("moveRight", BlueKingSlimeImageMap.getRow(2));
    BlueKingSlimeSprite.addAnimation("moveTop", BlueKingSlimeImageMap.getRow(3));
    DarkDeadTreeSprite = new Sprite(DeadTreesImageMap.getRow(0, 2, 3), 2, 2);
    LightDeadTreeSprite = new Sprite(DeadTreesImageMap.getRow(0, 3), 2, 2);
}