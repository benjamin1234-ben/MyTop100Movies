import { Schema, model } from "mongoose";

const MovieSchema = new Schema({
    name : { type : String, required : true },
    release_date : { type : Date, required : true },
    pg : { type : String, enum : ["12+", "14+", "16+", "18+", "20+"], required : true },
    description : { type : String, required : true },
    rank : { type : Number, min : 1, max : 100,  required : true}
})

const MovieModel = model("Movie", MovieSchema);

export default MovieModel;