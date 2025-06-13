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

class DarkDeadAxedTree extends Unit{
    constructor(){
        super(DarkDeadAxedTreeSprite);
    }
    name = "DarkDeadTree";
    player = "passive";
    atc = 0;
    onclick = ()=>{};
    moveable = false;
    atcRange = 0;
    watchingRadius = 0;
};

class LightDeadAxedTree extends Unit{
    constructor(){
        super(LightDeadAxedTreeSprite);
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
    onDie(){
        this.spawn(PurplePortal);
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


class SwordsManCyan extends Unit{
    constructor(){
        super(SwordsManCyanSprite);
    }
    name = "SwordsManCyan";
    atcRange = 3;
    watchingRadius = 5;
}

class PurpleDemon extends Unit{
    constructor(){
        super(PurpleDemonSprite);
    }
    name = "PurpleDemon";
}

class Tombstone extends Spawner{
    constructor(){
        super(TombstoneSprite);
    }
    moveable = false;
    name = "Protect Tombstone";
}

class Skeleton extends Unit{
    constructor(){
        super(SkeletonSprite);
    }
    name = "Skeleton";
    atc = 5;
    hp = 60;
}

class Orc extends Unit{
    constructor(){
        super(OrcSprite);
    }
    name = "Orc";
}

class KeepCyan extends Spawner{
    constructor(){
        super(KeepCyanSprite);
    }
    name = "KeepCyan";
    moveable = false;
    atcRange = 10;
    watchingRadius = 15;
}

class BarracksCyan extends Spawner{
    constructor(){
        super(BarracksCyanSprite);
    }
    spawnList=[SwordsManCyan];
    moveable = false;
    watchingRadius = 5;
    atcRange = 4;
}

class TowerCyan extends Spawner{
    constructor(){
        super(TowerCyanSprite);
    }
    atcRange = 10;
    watchingRadius = 11;
    moveable = false;
}

class Mausoleum extends Spawner{
    constructor(){
        super(MausoleumSprite);
    }
    name = "Mausoleum";
    moveable = false;
    atcRange = 10;
    watchingRadius = 15;
}

class SpawnMausoleum extends Spawner{
    constructor(){
        super(SpawnMausoleumSprite);
    }
    name = "Spawn Mausoleum";
    moveable = false;
    atcRange = 10;
    watchingRadius = 15;
    spawnList=[Skeleton, Skeleton];
}

class OrcKeep extends Spawner{
    constructor(){
        super(OrcKeepSprite);
    }
    name = "OrkKeep";
    moveable = false;
    atcRange = 10;
    watchingRadius = 13;
}

class OrcBarracks extends Spawner{
    constructor(){
        super(OrcBarracksSprite);
    }
    name = "OrkBarracks";
    moveable = false;
    atcRange = 10;
    watchingRadius = 13;
    spawnList = [Orc];
}

class OrcTower extends Spawner{
    constructor(){
        super(OrcTowerSprite);
    }
    name = "OrcTower";
    moveable = false;
    atcRange = 10;
    watchingRadius = 13;
}

class OrangePortal extends Spawner{
    constructor(){
        super(OrangePortalSprite);
    }
    name = "OrangePortal";
    moveable = false;
    spawnList = [PurpleDemon];
}

class PurplePortal extends Spawner{
    constructor(){
        super(PurplePortalSprite);
    }
    name = "PurplePortal";
    moveable = false;
}

class GreenPortal extends Spawner{
    constructor(){
        super(GreenPortalSprite);
    }
    name = "GreenPortal";
    moveable = false;
    atcRange = 10;
    watchingRadius = 13;
}
