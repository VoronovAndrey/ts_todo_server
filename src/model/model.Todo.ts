import mongoose, { Document, Schema } from "mongoose";

export interface Todo {
    id: number;
    todo: string;
    isDone: boolean;
}

export interface TodoModel extends Todo, Document {
    id: number;
}

const TodoSchema: Schema = new Schema(
    {
        id: {type: Number, required: true, unique: true},
        todo: {type: String, required: true},
        isDone: {type: Boolean, required: true}
    }, 
    { 
        collection: 'Tasks',
        versionKey: false
    }
)


export default mongoose.model<TodoModel>('Todo', TodoSchema)