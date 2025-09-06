import axios from "axios";
import type { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import multer from "multer";

dotenv.config();

interface IUser{
    _id : string;
    name : string;
    email : string;
    password : string; 
    role : string;
    playlist : string[];
};

interface AuthenticatedReq extends Request{
    user ? : IUser | null;
}

export const isAuth = async (req : AuthenticatedReq, res : Response, next : NextFunction) : Promise<void> => {
    try {
        const token = req.headers.token as string;

        if(!token){
            res.status(403).json({
                message : "Please login",
            });
            return;
        }

        const {data} = await axios.get(`${process.env.USER_URL}/api/v1/user/me`, {
            headers:{
                token,
            },
        });
        req.user = data;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Please login"
        });
    }
}

//multer setup

const storage = multer.memoryStorage();

const uploadFile = multer({storage}).single("file");

export default uploadFile;