import express from 'express'
import authmiddlware from '../middleware/authmiddlware.js'
import { addDepartment,getDepartments,getDepartment, updateDepartment,deleteDepartment } from '../controllers/departmentController.js'
const router = express.Router()

    router.post('/add', authmiddlware,addDepartment)
    router.get('/', authmiddlware,getDepartments)
    router.get('/:id', authmiddlware,getDepartment)
    router.put('/:id', authmiddlware,updateDepartment)
    router.delete('/:dep_name', authmiddlware,deleteDepartment)





export default router


