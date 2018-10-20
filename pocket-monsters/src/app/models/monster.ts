export class Monster {

    public _id:String;

    constructor(
        public name:String,
        public description:String,
        public type:String,
        public strength:Number,
        public life:Number,
        public nicknames:String
    ){ }

}