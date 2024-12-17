import express from "express";
import {
    upsertProfile,
    getProfile,
    deleteProfile,
    getAllProfiles,
  } from "../controllers/profilemaker.controller.js";
import protectedroute from "../middleware/protectedroute.js";


const router = express.Router();

// Routes
router.post("/upsert",protectedroute, upsertProfile); // Create or update profile
router.get("/:userId", getProfile); // Get profile by userId
router.delete("/:userId", deleteProfile); // Delete profile by userId
router.get("/", getAllProfiles); // Get all profiles with filters


export default router;
