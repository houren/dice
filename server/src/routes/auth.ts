import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

console.log("authRoutes loaded");

const router = Router();
const prisma = new PrismaClient();

const SECRET = "ushitapunikiakun";

//req username: string, password: string
//res success: boolean
router.post("/register", async (req, res) => {
    const {username, password} = req.body;
    console.log(`register: username = ${username}`)
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        await prisma.user.create({
            data: {username, password: hashedPassword},
        });
        res.json({success: true});
    }catch(e: any){
        if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
            res.status(409).json({success: false});
        }
        res.status(500).json({success: false});
    }
});

//req username: string, password: string
//res success: boolean
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    console.log(`login: username = ${username}`)
    const user = await prisma.user.findUnique({ where: { username } });
    if(!user){
        res.status(402).json({success: false});
    }else{
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(403).json({success: false});
        }
        const token = jwt.sign({userId: user.id}, SECRET, {expiresIn: "1d"});
        res.json({success: true, token});
    }
});

export default router;
