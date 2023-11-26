import express from "express";
import { login, register } from "../controllers/user.js";
import { add, deleteCrud, getOne, update } from "../controllers/crud.js";
 const router = express.Router();

//user
router.post('/Register', register);
router.post('/Login', login);
//ajouter
router.post('/add', add);
//find one
router.get('/getone/:encrypted_id',getOne)
//mis ajour
router.put('/update/:encrypted_id', update);
//delete 
router.delete('/delate/:encrypted_id',deleteCrud);

 export default router;