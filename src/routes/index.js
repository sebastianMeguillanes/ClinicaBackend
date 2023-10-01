const{ Router}= require("express");
const router = Router();

const { getUsers,creatUser, getUsersById, deleteUser,updateUser }= require('../controllers/indexControllers')

router.get('/users',getUsers);//para obtener
router.get('/users/:id',getUsersById);//obtener id
router.post('/users',creatUser);//para crear
router.delete('/users/:id',deleteUser);
router.put('/users/:id',updateUser);

 
module.exports = router;