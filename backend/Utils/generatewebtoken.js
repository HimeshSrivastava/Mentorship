import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env'});


const generatewebtoken = (userid) => {
    const secretKey = process.env.JWT_SECRET_KEY;  

    if (!secretKey) {
        throw new Error("JWT_SECRET_KEY is not defined in .env");
    }
    const token = jwt.sign(
        {userid},     
        secretKey,            
        { expiresIn: '15d' }   
      );
      
      return token;
};

export default generatewebtoken

