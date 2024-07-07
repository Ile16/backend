import express from "express";
import endpoints from "express-list-endpoints";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors" //per collegare il front al back

dotenv.config(); //porto dentro variabili definite in .env

const app = express(); //inizializzo app

app.use(express.json()) //middlware per trasformare il corspo delle richieste in json
app.use(cors());

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connesso"))
.catch((err) => console.error("mongoBD: ERRORE -", err));


const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes) //creazione di pezzo di stringa 

app.listen(PORT, () => {
    console.log(`Server acceso sulla porta ${PORT}`);
    console.log("sono disponibili i seguenti endpoints");
    console.table(endpoints(app)) //stampa tutti gli endpoint definiti in userRoutes, se funziona tutto ciò che abbiamo scritto
})