//  mongodb://localhost:27017

import mongoose from "mongoose";

export default function dbConnect(){
    mongoose.connect('mongodb://localhost:27017').then(()=>{
        console.log("data base connected succesfully !")
    }).catch(()=>{
        console.log("error at batable ")
    });
}

