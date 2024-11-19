import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Token not provided" });
      return; // Ensure the function does not proceed further
    }

    const decodedToken = verify(token, "dddfdfdfdfd") as { id: string };
    const userId = decodedToken.id;

    if (req.body.id && req.body.id !== userId) {
      res.status(401).json({ error: "Invalid token" });
      return; 
    }

    
    (req as any).userId = userId;

    next(); 
  } catch (error) {
    res.status(401).json({ error: "Authentication error occurred" });
  }
};

export default authMiddleware;
