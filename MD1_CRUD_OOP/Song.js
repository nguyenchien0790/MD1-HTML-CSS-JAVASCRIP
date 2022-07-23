class Song {
    constructor(id,name,lyrics,category) {
        this.id = id;
        this.name = name;
        this.lyrics = lyrics;
        this.category =category;
    }
    getId(){
        return this.id;
    }
    setId(id){
        this.id = id;
    }
    getName(){
        return this.name;
    }
    setName(name){
        this.name = name;
    }
    getLyrics(){
        return this.lyrics;
    }
    setLyrics(lyrics){
        this.lyrics = lyrics;
    }  getLyrics() {
        return this.lyrics;
    }

    getCategory() {
        return this.category;
    }

    setCategory(category) {
        this.category = category;
    }

}