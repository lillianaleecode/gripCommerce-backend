const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            //required: true, 
            //unique: true
        },
        email: {
            type: String,
            //required: true, 
            //unique: true
        },
        password: {
        type: String,
        //required: true, 
        },
        isAdmin:{
            type: Boolean,
            default: false,
        },
    },
    {versionKey: false}
       
);

const userModel = mongoose.model("usuario", userSchema);

const mostrar = async ()=>{
    const usuario = await userModel.find()
    console.log(usuario)

}

const crear = async ()=>{
    const usuario = new userModel({
        username: "licodetest", 
        email: "123456@gmailcom",
        password: "123"
    })
    const resultado = await usuario.save()
    console.log(resultado)
}

// mostrar();
// crear();
module.exports = userModel