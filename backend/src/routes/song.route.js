import { Router } from "express";
import { getAllSongs,getFeaturedSongs,getMadeForYousongs,getTrendingSongs } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();

router.get('/',protectRoute,requireAdmin,getAllSongs);
router.get('/featuredSongs',getFeaturedSongs);
router.get('/madeForYouSongs',getMadeForYousongs);
router.get('/trendingSongs',getTrendingSongs);


export default router