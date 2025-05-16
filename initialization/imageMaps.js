var BlueKingSlimeImageMap;
var GreenKingSlimeImageMap;
var BlueMegaSlimeImageMap;
var GreenMegaSlimeImageMap;
var BlueSlimeImageMap;
var GreenSlimeImageMap;

async function loadImages(){
    BlueKingSlimeImageMap = await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\KingSlimeBlue.png");
    GreenKingSlimeImageMap = await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\KingSlimeGreen.png");
    BlueMegaSlimeImageMap = await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\MegaSlimeBlue.png");
    GreenMegaSlimeImageMap = await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\MegaSlimeGreen.png");
    BlueSlimeImageMap = await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\SlimeBlue.png");
    GreenSlimeImageMap = await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\Slime.png");
}