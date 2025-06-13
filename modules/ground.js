class Ground{
    constructor(imageList, type="ground"){
        this.imageList = imageList;
        this.type = type;
        this.forPlants = true;
    }


    getTile(index="random"){
        let img;
        if(index=="random"){
            img = this.imageList[randint(0, this.imageList.length)];
        }
        else{
            img = this.imageList[index];
        }

        return {
            img : img,
            type : this.type,
            forPlants: this.forPlants
        }
    }
}
