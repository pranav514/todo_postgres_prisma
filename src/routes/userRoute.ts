import express, { Express, Response, Request } from "express";
import { compareSync, hashSync } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken"
import authMiddleware from "../middlewares/authentication";
const app = express();
export const router = express.Router();
const prisma = new PrismaClient();

router.post("/user/register", async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }

    })
    if(existingUser){
     res.status(400).json({message: "Email already exists"})
    }
    const hashedPassword =  hashSync(password , 10);
    const val = await prisma.user.create({
      data: {
        email,
        password : hashedPassword,
        firstname,
        lastname,
      },
    });
    res.status(200).json({ message: "User registered sucessfully", val });
  } catch (err) {
    res.status(400).json({ error: "user could not register" });
  }
});

router.post('/user/login' , async (req:Request , res:Response) => {
    const {email , password} = req.body;
    const findUser = await prisma.user.findUniqueOrThrow({
        where : {
            email: email
        }
    })
    if(!findUser){
        res.status(400).json({error : "user not found"});
    }
    const hashedPassword : string  = findUser.password;
    if (!compareSync(password ,hashedPassword)){
    res.status(400).json({error : "wrong password entered"});
 }  
    const token =  sign({id : findUser.id} , "dddfdfdfdfd")
    res.status(200).json({message : "user logged in sucessfully" , findUser , token});



})

router.put("/user/update" ,authMiddleware, async (req : Request , res : Response) => {
  try { 
      const {firstname , lastname} = req.body;
  const id  = (req as any).userId;
  const remove = await prisma.user.update({
    where: {
      id: id,
    },
    data : {
      firstname : firstname ,
      lastname : lastname ,
    }
  })
  res.status(200).json({message : "user updated sucessfully" , remove});
  }catch(err){
    res.status(400).json({error : "user could not update" });
  }

})

router.delete("/user/delete" , authMiddleware ,async (req : Request , res : Response) => {
  try {
    const id = (req as any).userId;
    const remove = await prisma.user.delete({
      where: {
        id: id,
      }
    })
    res.status(200).json({message : "user deleted sucessfully" , remove});
  }catch(err){
    res.status(400).json({error : "user could not delete" });
  }
})
