var BlueKingSlimeImageMap;
var GreenKingSlimeImageMap;
var BlueMegaSlimeImageMap;
var GreenMegaSlimeImageMap;
var BlueSlimeImageMap;
var GreenSlimeImageMap;

var DeadTreesImageMap;

var SwordsManCyanImageMap;
var PurpleDemonImageMap;
var SkeletonImageMap;
var OrcImageMap;

var KeepCyanImageMap;
var BarracksCyanImageMap;
var TowerCyanImageMap;
var MausoleumImageMap;
var SpawnMausoleumImageMap;
var TombstoneImageMap;
var OrcKeepImageMap;
var OrcBarracksImageMap;
var OrcTowerImageMap;
var PurplePortalImageMap;
var OrangePortalImageMap;
var GreenPortalImageMap;


async function loadSpriteImages(){
    BlueKingSlimeImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\KingSlimeBlue.png"), 6, 4);
    GreenKingSlimeImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\KingSlimeGreen.png"), 6, 4);
    BlueMegaSlimeImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\MegaSlimeBlue.png"), 6, 4);
    GreenMegaSlimeImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\MegaSlimeGreen.png"), 6, 4);
    BlueSlimeImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\SlimeBlue.png"), 6, 4);
    GreenSlimeImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\Slime.png"), 6, 4);


    DeadTreesImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Nature\\DeadTrees.png"), 4, 1);

    SwordsManCyanImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Soldiers\\Melee\\CyanMelee\\SwordsmanCyan.png"), 5, 12);
    KeepCyanImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Buildings\\Cyan\\CyanKeep.png"), 3, 2);
    BarracksCyanImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Buildings\\Cyan\\CyanBarracks.png"), 4, 5);
    TowerCyanImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Buildings\\Cyan\\CyanTower.png"), 3, 6);

    MausoleumImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Buildings\\Enemy\\Mausoleum.png"), 2, 1);
    SpawnMausoleumImageMap = MausoleumImageMap;
    TombstoneImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Miscellaneous\\Tombstones.png"), 4, 2);
    SkeletonImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Undead\\Skeleton-Soldier.png"), 5, 12);

    OrcKeepImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Buildings\\Enemy\\Orc\\AllBuildings-Preview.png"), 8, 6);
    OrcImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Orcs\\Orc.png"), 6, 8);
    OrcBarracksImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Buildings\\Enemy\\Orc\\AllBuildings-Preview.png"), 16, 12);
    OrcTowerImageMap = OrcBarracksImageMap;

    PurplePortalImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Miscellaneous\\Portal.png"), 4, 1);
    OrangePortalImageMap = PurplePortalImageMap;
    GreenPortalImageMap = OrangePortalImageMap;
    PurpleDemonImageMap = new ImageMap(await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Demons\\PurpleDemon.png"), 6, 8);
}