var BlueKingSlimeSprite;
var GreenKingSlimeSprite;
var BlueMegaSlimeSprite;
var GreenMegaSlimeSprite;
var BlueSlimeSprite;
var GreenSlimeSprite;

var DarkDeadTreeSprite;
var LightDeadTreeSprite;
var DarkDeadAxedTreeSprite;
var LightDeadAxedTreeSprite;

var SwordsManCyanSprite;
var PurpleDemonSprite;
var SkeletonSprite;
var OrcSprite;

var KeepCyanSprite;
var BarracksCyanSprite;
var TowerCyanSprite;
var MausoleumSprite;
var OrcKeepSprite;
var PurplePortalSprite;
var OrangePortalSprite;
var GreenPortalSprite;
var SpawnMausoleumSprite;
var TombstoneSprite;
var OrcBarracksSprite;
var OrcTowerSprite;

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

    DarkDeadTreeSprite = new Sprite(DeadTreesImageMap.getRow(0, 2, 3), 1, 1);
    LightDeadTreeSprite = new Sprite(DeadTreesImageMap.getRow(0, 3), 1, 1);
    DarkDeadAxedTreeSprite = new Sprite(DeadTreesImageMap.getRow(0, 0, 1), 1, 1);
    LightDeadAxedTreeSprite = new Sprite(DeadTreesImageMap.getRow(0, 1, 2), 1, 1);

    SwordsManCyanSprite = new Sprite(SwordsManCyanImageMap.getRow(0), 1, 1, 7);
    SwordsManCyanSprite.addAnimation("moveDown", SwordsManCyanImageMap.getRow(0));
    SwordsManCyanSprite.addAnimation("moveLeft", SwordsManCyanImageMap.getRow(3));
    SwordsManCyanSprite.addAnimation("moveTop", SwordsManCyanImageMap.getRow(1));
    SwordsManCyanSprite.addAnimation("moveRight", SwordsManCyanImageMap.getRow(2));
    SwordsManCyanSprite.addAnimation("beatDown", SwordsManCyanImageMap.getRow(4, 0, 4));
    SwordsManCyanSprite.addAnimation("beatLeft", SwordsManCyanImageMap.getRow(7, 0, 4));
    SwordsManCyanSprite.addAnimation("beatTop", SwordsManCyanImageMap.getRow(5, 0, 4));
    SwordsManCyanSprite.addAnimation("beatRight", SwordsManCyanImageMap.getRow(6, 0, 4));

    PurpleDemonSprite = new Sprite(PurpleDemonImageMap.getRow(0, 0, 5), 1, 1, 7);
    PurpleDemonSprite.addAnimation("moveDown", PurpleDemonImageMap.getRow(1, 0, 5));
    PurpleDemonSprite.addAnimation("moveLeft", PurpleDemonImageMap.getRow(3, 0, 5));
    PurpleDemonSprite.addAnimation("moveTop", PurpleDemonImageMap.getRow(0, 0, 5));
    PurpleDemonSprite.addAnimation("moveRight", PurpleDemonImageMap.getRow(2, 0, 5));
    PurpleDemonSprite.addAnimation("beatDown", PurpleDemonImageMap.getRow(4));
    PurpleDemonSprite.addAnimation("beatLeft", PurpleDemonImageMap.getRow(7));
    PurpleDemonSprite.addAnimation("beatTop", PurpleDemonImageMap.getRow(5));
    PurpleDemonSprite.addAnimation("beatRight", PurpleDemonImageMap.getRow(6));


    SkeletonSprite = new Sprite(SkeletonImageMap.getRow(0), 1, 1, 7);
    SkeletonSprite.addAnimation("moveDown", SkeletonImageMap.getRow(0));
    SkeletonSprite.addAnimation("moveLeft", SkeletonImageMap.getRow(3));
    SkeletonSprite.addAnimation("moveTop", SkeletonImageMap.getRow(1));
    SkeletonSprite.addAnimation("moveRight", SkeletonImageMap.getRow(2));
    SkeletonSprite.addAnimation("beatDown", SkeletonImageMap.getRow(4, 0, 4));
    SkeletonSprite.addAnimation("beatLeft", SkeletonImageMap.getRow(7, 0, 4));
    SkeletonSprite.addAnimation("beatTop", SkeletonImageMap.getRow(5, 0, 4));
    SkeletonSprite.addAnimation("beatRight", SkeletonImageMap.getRow(6, 0, 4));

    OrcSprite = new Sprite(OrcImageMap.getRow(0, 0, 5), 1, 1, 7);
    OrcSprite.addAnimation("moveDown", OrcImageMap.getRow(1, 0, 5));
    OrcSprite.addAnimation("moveLeft", OrcImageMap.getRow(3, 0, 5));
    OrcSprite.addAnimation("moveTop", OrcImageMap.getRow(0, 0, 5));
    OrcSprite.addAnimation("moveRight", OrcImageMap.getRow(2, 0, 5));
    OrcSprite.addAnimation("beatDown", OrcImageMap.getRow(4));
    OrcSprite.addAnimation("beatLeft", OrcImageMap.getRow(7));
    OrcSprite.addAnimation("beatTop", OrcImageMap.getRow(5));
    OrcSprite.addAnimation("beatRight", OrcImageMap.getRow(6));


    KeepCyanSprite = new Sprite(KeepCyanImageMap.getRow(0, 0, 1), 4, 4);
    BarracksCyanSprite = new Sprite(BarracksCyanImageMap.getRow(4, 2, 3), 2, 2);
    TowerCyanSprite = new Sprite(TowerCyanImageMap.getRow(3, 2), 2, 2);
    MausoleumSprite = new Sprite(MausoleumImageMap.getRow(0, 0, 1), 4, 4);
    SpawnMausoleumSprite = new Sprite(SpawnMausoleumImageMap.getRow(0, 1, 2), 2, 2);
    OrcKeepSprite = new Sprite(OrcKeepImageMap.getRow(1, 3, 4), 4, 4);
    PurplePortalSprite = new Sprite(PurplePortalImageMap.getRow(0, 3) ,4, 4);
    OrangePortalSprite = new Sprite(OrangePortalImageMap.getRow(0, 2, 3), 2, 2);
    GreenPortalSprite = new Sprite(GreenPortalImageMap.getRow(0, 1, 2), 2, 2);
    TombstoneSprite = new Sprite(TombstoneImageMap.getRow(0, 0, 1), 2, 2);
    OrcBarracksSprite = new Sprite(OrcBarracksImageMap.getRow(8, 0, 1), 2, 2);
    OrcTowerSprite = new Sprite(OrcTowerImageMap.getRow(5, 7, 8), 2, 2);
}