import express from "express";
import controller from '../controllers/TodoController'

const router = express.Router()


router.get('/get/', controller.readAll)
router.post('/add/', controller.addNew)
router.post('/delete/', controller.deleteById)
router.patch('/update/', controller.updateById)


export = router