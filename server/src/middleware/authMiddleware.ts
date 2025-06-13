import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const SECRET = "ushitapunikiakun";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).json({success: false});
    }else{
        const token = authHeader.split(" ")[1];
        try{
            jwt.verify(token, SECRET);
            next();
        }catch(err){
            res.status(401).json({success: false});
        }
    }
};
