import { Schema, model } from "mongoose";

const userSchema = new Schema (
    {
        // Nome stringa
        name:{
            type: String,
            required: true
        },

        //Email stringa (unica)
         email:{
            type: String,
            required: true,
            unique: true
         },   
         //Ruolo stringa
         role:{
            type: String,
            enum:["admin","user"],
            default:"user"
         },

         //Validated boolean
         validated:{
            type:Boolean,
            default:false
         },
    },
    {
        //oggetto relativo alla collection che conterrà i document singoli
        collection:"users"
     }
);

const User = model("User", userSchema);
export default User;