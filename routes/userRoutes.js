import express from 'express';
import {listAllUsers,createUser, getUser, updateUser, deleteUser}  from '../controllers/userController.js';

const router = express.Router();

router.get('/', listAllUsers);
router.post('/', createUser);
router.get('/get-user', getUser);
router.put('/update-user', updateUser);
router.delete('/delete-user', deleteUser);

export default router;