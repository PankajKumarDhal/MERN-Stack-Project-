import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken"
// import router from './../routes/authRoute';
// import { compare } from "bcrypt";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";

export const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body
        // validation
        if(!name){
            returnres.send({message:'Name is Required'})
        }
        if(!email){
            returnres.send({message:'email is Required'})
        }
        if(!password){
            returnres.send({message:'password is Required'})
        }
        if(!phone){
            returnres.send({message:'phone is Required'})
        }
        if(!address){
            returnres.send({message:'address is Required'})
        }

        // exisiting user
        const exisitingUser = await userModel.findOne({email})
        if(exisitingUser){
            return res.status(200).send({
                success:false,
                message:'Already Register please login',
            })
        }
        // registeruser
        const hashedPassword = await hashPassword(password);
        // save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword,
        }).save()

        res.status(201).send({
            success:true,
            message:'User Register Successfull',
            user,
        });
    }catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Errro in Registeration',
            error
        })
    }
};

// export default {registerController};

// post login
export const loginController = async (req,res) => {
    try{
        const {email,password} = req.body
        // vallidatin
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })

        }
        // user check
        const user = await userModel.findOne({email})
        if (!user){
            return res.status(404).send({
                success:false,
                message:'email is not Registerd'
            });
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'

            });
        }

        // token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{
            expiresIn: "7d",
        });
        res.status(200).send({
            success:true,
            message:'login successfilly',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,

            },
            token
        })

        

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
};

// test controller
export const testController = (req, res) => {
    console.log("protected Route");
};