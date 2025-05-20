var BlueKingSlimeImageMap;
var GreenKingSlimeImageMap;
var BlueMegaSlimeImageMap;
var GreenMegaSlimeImageMap;
var BlueSlimeImageMap;
var GreenSlimeImageMap;

var DeadTreesImageMap;

async function loadSpriteImages(){
    BlueKingSlimeImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\KingSlimeBlue.png"), 6, 4);
    GreenKingSlimeImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\KingSlimeGreen.png"), 6, 4);
    BlueMegaSlimeImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\MegaSlimeBlue.png"), 6, 4);
    GreenMegaSlimeImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\MegaSlimeGreen.png"), 6, 4);
    BlueSlimeImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\SlimeBlue.png"), 6, 4);
    GreenSlimeImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\Slime.png"), 6, 4);


    DeadTreesImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Nature\\DeadTrees.png"), 4, 1);
}