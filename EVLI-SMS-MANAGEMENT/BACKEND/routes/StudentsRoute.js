import express from 'express'
import {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentByName,
    getStudentByPassportId,
    getStudentByStudentId,
    upload
} from "../controllers/Students.js"

import { verifyUser, adminOnly, adminAndSuperOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/students',verifyUser,  getStudents);
router.post('/studentbyname',verifyUser,  getStudentByName);
router.post('/studentbypassportid',verifyUser,  getStudentByPassportId);
router.get('/students/:id',verifyUser,  getStudentById);
router.post('/students', verifyUser,adminAndSuperOnly, createStudent);
router.post('/studentbystudentid', verifyUser, getStudentByStudentId);
router.patch('/students/:id', upload,verifyUser,  updateStudent);
router.delete('/students/:id',verifyUser, adminAndSuperOnly, deleteStudent);



export default router;