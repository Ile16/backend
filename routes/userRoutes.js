import express from "express";
import User from "../models/User.js";

const router = express.Router();

//Rotta per ottenere tutta la lista di utenti nel DB
// router.get("/" , async (req, res) => { // "/" vuota perchè li voglio tutti all'interno
//     try {
//         const users = await User.find({});
//         res.json(users)
//     }catch (err) {
//         res.status(500).json({message: err.message})
//     }
// });
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;//arriva come stringa e noi trasformiamo in numero
        const limit = parseInt(req.query.limit) || 5;
        const sort = req.query.sort || 'name';  //in questo caso è una stringa e si lascia tale
        const sortDirection = req.query.sortDirection === 'desc' ? -1 : 1;
        const skip = (page - 1) * limit;
        
        const users = await User.find({})
        .sort({[sort]: sortDirection}) //ordiniamo i risultati 
        .skip(skip) //quanti documenti saltare per arrivare alla pagina 
        .limit(limit) //limite di dati per pagina
   
    const total = await  User.countDocuments(); //contiamo il numero di utenti nel DB 
    res.json({
        users,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total
    })
    }catch (error){ 
        res.status(500).json({message: err.message})
}
})

//Rotta per un singolo utente e quindi mi serve l'id 
router.get("/:id", async (req, res) => {
    try{
        const user= await User.findById(req.params.id);
        if (!user){
            return res.status(404).json({message:"Utente non trovato"})
        }
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Rotta per creare un utente
router.post("/", async (req, res) => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    }catch (err) {
        res.status(400).json({message: err.message})
    }
});

//Rotta per aggiornare un utente
router.patch("/:id", async (req, res)=> {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(updatedUser)
    }catch(err) {
        res.status(400).json({message: err.message})
    }
})

//Rotta per cancellare un utente
router.delete("/:id", async (req, res)=> {
    try{
        await User.findByIdAndDelete(req.params.id) 
        res.json({message:"Utente eliminato definitivamente"})
    }catch(err) {
        res.status(500).json({message: err.message})
    }
})

export default router;