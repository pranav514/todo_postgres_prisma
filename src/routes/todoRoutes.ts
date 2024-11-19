import express ,{ Request , Response } from "express";
import  authMiddlware  from "../middlewares/authentication";
import { PrismaClient } from "@prisma/client";
import { isTemplateLiteralTypeNode } from "typescript";
const prisma = new PrismaClient();
export const router = express.Router()

router.post("/create" ,authMiddlware, async (req : Request, res : Response) => {
    try{
            const {title , description} = req.body;
    const userId = (req as any).userId;
    const todo = await prisma.todo.create({
        data : {
            title ,
            description,
            userId,
        
        }
    })
    res.status(201).json({message : "Todo created succesfully" , todo});
    }catch(err){
        res.status(401).json({error : "error occured"});
    }


})

router.get("/get" , authMiddlware , async(req: Request , res : Response) => {
    try{
        const userId = (req as any).userId;
        const todos = await prisma.todo.findMany({
            where : {
                userId,
            },
            select : {
                id : true,
                title : true ,
                description : true ,
                userId : true ,
                user  : true,
            }
        })
        res.status(200).json({message : "fetched the todos sucessfully" , todos});
    }catch(err){
        res.status(401).json({error : "error occured"});
    }
})

router.put("/update/:id" , authMiddlware,async (req  : Request , res : Response) => {
    try{
        const {title , description} = req.body;
        const userId = (req as any).userId;
        const id = Number(req.params.id);
        console.log(id);
        const todo = await prisma.todo.update({
            where : {
                id,
                userId,
            },
            data : {   
                title ,
                description ,
             }
        })
        res.status(200).json({message : "todo updated successfully" , todo});
    }catch(err){
        res.status(401).json({error : "error occured"});
    }

})

router.delete("/delete/:id" ,authMiddlware,async(req : Request , res : Response) => {
    try{
        const userId = (req as any).userId;
        const id = req.params.id;
        const todo = await prisma.todo.delete({
            where : {
                id : Number(id),
                userId ,
            }
        })
        res.status(200).json({message : "todo deleted successfully" , todo});
    }catch(err){
        res.status(401).json({error : "error occured"});
    }
} )
