import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

console.log("diceRoutes loaded");

//req count: int
//res rolls: int[], sum: int
router.get("/roll", authMiddleware, (req, res) => {
    const {count} = req.body;
    console.log(`roll: count = ${count}`);
    const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);
    const sum = rolls.reduce((a, b) => a + b, 0);
    res.json({success: true, rolls: rolls, sum: sum });
});

export default router;
