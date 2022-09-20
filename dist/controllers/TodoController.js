"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import mongoose from 'mongoose'
const model_Todo_1 = __importDefault(require("../model/model.Todo"));
const readAll = ((req, res, next) => {
    return model_Todo_1.default.find()
        .then((todos) => {
        res.status(200).json({ todos: todos });
    })
        .catch(err => res.status(500).json({ err }));
});
const addNew = ((req, res, next) => {
    const { todo, id, isDone } = req.body;
    const task = new model_Todo_1.default({
        id: id,
        todo: todo,
        isDone: isDone
    });
    return task.save()
        .then((task) => res.status(201).json({ task }))
        .catch((err) => res.status(500).json({ err }));
});
const deleteById = ((req, res, next) => {
    const id = req.body.id;
    return model_Todo_1.default.findOneAndDelete({ id: id })
        .then((task) => task ? res.status(200).json({ message: "deleted" }) : res.status(404).json({ message: "not found" }))
        .catch(err => res.status(500).json({ err }));
});
const updateById = ((req, res, next) => {
    const { todo, id, isDone } = req.body;
    return model_Todo_1.default.findOneAndUpdate({ id: id }, {
        todo: todo,
        isDone: isDone
    })
        .then((task) => task ? res.status(200).json({ message: "updated" }) : res.status(404).json({ message: "not found" }))
        .catch(err => res.status(500).json({ err }));
});
exports.default = { readAll, addNew, deleteById, updateById };
