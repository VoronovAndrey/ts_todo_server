import { NextFunction, Request, Response } from 'express'
// import mongoose from 'mongoose'
import Todo from '../model/model.Todo'


const readAll = ((req: Request, res: Response, next: NextFunction) => {
    return Todo.find()
        .then((todos) => {
            res.status(200).json({ todos: todos })
        })
        .catch(err => res.status(500).json({ err }))
})

const addNew = ((req: Request, res: Response, next: NextFunction) => {
    const { todo, id, isDone } = req.body;

    const task = new Todo({
        id: id,
        todo: todo,
        isDone: isDone
    })

    return task.save()
        .then((task) => res.status(201).json({ task }))
        .catch((err) => res.status(500).json({ err }))
})

const deleteById = ((req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id

    return Todo.findOneAndDelete({ id: id })
        .then((task) => task ? res.status(200).json({ message: "deleted" }) : res.status(404).json({ message: "not found" }))
        .catch(err => res.status(500).json({ err }))
})

const updateById = ((req: Request, res: Response, next: NextFunction) => {
    const { todo, id, isDone } = req.body;

    return Todo.findOneAndUpdate({ id: id }, {
        todo: todo,
        isDone: isDone
    })
        .then((task) => task ? res.status(200).json({ message: "updated" }) : res.status(404).json({ message: "not found" }))
        .catch(err => res.status(500).json({ err }))
})


export default { readAll, addNew, deleteById, updateById }