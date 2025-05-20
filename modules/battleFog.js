const battleFog = document.getElementById("battleFog");
battleFog.width = fieldResolution;
battleFog.height = fieldResolution;
bfctx = battleFog.getContext("2d");
bfctx.fillStyle="black";


var battleFogMap = new Array(ceilCount);

for(let i=0; i<ceilCount; i++){
    let row = new Array(ceilCount);
    battleFogMap[i]=row;
}

function updateFog(player="top"){
    if(!switchFog.checked) {
        bfctx.clearRect(0, 0, fieldResolution, fieldResolution);
        return;
        
    }
    for(let i=0; i<ceilCount; i++){
        let row = new Array(ceilCount);
        battleFogMap[i]=row;
    }
    for(let y=0; y<ceilCount; y++){
        for(let x=0; x<ceilCount; x++){
            if(!hitBoxMap[y][x]) continue;
            if(!hitBoxMap[y][x].unitReference) continue;
            if(hitBoxMap[y][x].unitReference.player!=player) continue;
            let r = hitBoxMap[y][x].unitReference.watchingRadius;
            for(let ySee=-r; ySee<=r; ySee++){
                for(let xSee=-r; xSee<=r; xSee++){
                    if((xSee*xSee+ySee*ySee<=r*r)&&(xSee+x<ceilCount)&&(xSee+x>=0)&&(ySee+y<ceilCount)&&(ySee+y>=0)){
                        battleFogMap[y+ySee][x+xSee]="clear";
                    }
                }
            }
        }
    }
    bfctx.fillRect(0, 0, fieldResolution, fieldResolution);
    for(let y=0; y<ceilCount; y++){
        for(let x=0; x<ceilCount; x++){
            if(battleFogMap[y][x]=="clear"){
                bfctx.clearRect(x*ceilResolution, y*ceilResolution, ceilResolution, ceilResolution);
            }
        }
    }
}
