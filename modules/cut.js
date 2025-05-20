class ImageMap{
    constructor(img, xCount, yCount){
        this.img = img;
        this.xCount = xCount;
        this.yCount = yCount;

        this.xResolution = img.width/xCount;
        this.yResolution = img.height/yCount;
    }


    getAll(){
        let all  = new Array();
        for(let y=0; y<this.yCount; y++){
            for(let x=0; x<this.xCount; x++){
                all.push(
                    {
                        img: this.img,
                        xStart : x*this.xResolution,
                        yStart : y*this.yResolution,
                        width: this.xResolution,
                        height: this.yResolution
                    }
                );
            }
        }
        return all;
    }


    getRow(number, start=0, end="auto"){
        if((number<0)||(number>=this.yCount)) throw new Error("NoNoNo, mister Fish");
        if((start<0)||(start>=this.xCount)) throw new Error("NoNoNo, mister Fish");
        if(end=="auto") end = this.xCount;
        if(end>this.xCount) throw new Error("NoNoNo, mister Fish");
        let row = new Array();
        for(let x=start; x<end; x++){
            row.push(
                {
                    img: this.img,
                    xStart : x*this.xResolution,
                    yStart : number*this.yResolution,
                    width: this.xResolution,
                    height: this.yResolution
                }
            );
        }
        return row;
    }
}