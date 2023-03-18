import MovieModel from "../db/models/index.js";

const addMovie = async (req, res) => {
    try {
        const movie = new MovieModel({
            name : req.body.name,
            release_date : req.body.release_date ? req.body.release_date : Date.now(),
            pg : req.body.pg  ? req.body.pg : "18+",
            description : req.body.description  ? req.body.description : "One of my Top 100 Movies",
            rank : req.body.rank ? req.body.rank : 100
        });
        
        const data = await movie.save();

        data ? res.status(200).json(data) : undefined;
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const rankMovie = async (req, res) => {
    try {
        const result = await MovieModel.findOneAndUpdate({ name : req.body.name }, { rank : req.body.rank });

        result ? res.status(200).send(`${req.body.name} is now ranked ${req.body.rank} on my MyTop100Movies`) : undefined;
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const listTop100Movies = async (req, res) => {
    try {
        const data = await MovieModel.find().sort("rank").limit(100).exec();

        data ? res.status(200).json(data) : undefined;
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const removeMovie = async (req, res) => {
    try {
        const result = await MovieModel.findOneAndDelete({ name : req.body.name });

        result ? res.status(200).send(`${req.body.name} have been deleted.`) : undefined;
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const controllers = { addMovie, rankMovie , listTop100Movies, removeMovie };

export default controllers;