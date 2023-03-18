import { Router } from "express";
import controllers from "../controllers/index.js";

const router = Router();

const { addMovie, rankMovie, listTop100Movies, removeMovie } = controllers;

// GET - Routes
router.get("/MyTop100Movies", listTop100Movies);

// POST - Routes
router.post("/AddMovie", addMovie);
router.post("/RankMovie", rankMovie);
router.post("/RemoveMovie", removeMovie);

export default router;