import express, { Request, Response } from "express";
import { getDb, writeDb } from "./functions.js";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import path from "path";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "frontend", "dist");
const index = path.join(dist, "index.html");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(dist));

app.get("/", (req: Request, res: Response) => res.sendFile(index));

app.get("/todos", (req: Request, res: Response) => {
    const db = getDb();
    if(!db) return res.sendStatus(500);
    if(!db.todos) return res.sendStatus(404);

    res.json({
        todos: db.todos
    });
});

app.put("/todos", (req: Request, res: Response) => {
    const {todo} = req.body;
    if(!todo) return res.sendStatus(400);
    const db = getDb();
    if(!db) return res.sendStatus(500);
    if(!db.todos) db.todos = [];
    db.todos.push(todo);
    writeDb(db);
    res.sendStatus(204);
});

app.delete("/todos", (req: Request, res: Response) => {
    const {todo} = req.body;
    if(!todo) return res.sendStatus(400);
    const db = getDb();

    if(!db) return res.sendStatus(500);
    if(!db.todos) db.todos = []

    db.todos = db.todos.filter((item:string) => item !== todo);
    writeDb(db);
    res.sendStatus(204);
});


app.get("/notes", (req: Request, res: Response) => {
    const db = getDb();
    if(!db) return res.sendStatus(500);
    if(!db.notes) return res.sendStatus(404);

    res.json({
        notes: Object.keys(db.notes)
    })
});

app.put("/notes", (req: Request, res: Response) => {
    const {note} = req.body;
    if(!note) return res.sendStatus(400);
    const db = getDb();
    if(!db) return res.sendStatus(500);
    if(!db.notes) db.notes = {};
    
    db.notes[note] = "Edit me";
    writeDb(db);
    res.sendStatus(204);
});

app.get("/note", (req: Request, res: Response) => {
    const {note} = req.query;
    if(!note) return res.sendStatus(400);
    const db = getDb();
    if(!db) return res.sendStatus(500);

    if(!db.notes[note.toString()]) return res.sendStatus(404);

    res.json({
        name: note,
        note: db.notes[note.toString()]
    });
});

app.patch("/note", (req: Request, res: Response) => {
    const {note, text} = req.body;
    if(!note || !text) return res.sendStatus(400);
    const db = getDb();
    if(!db) return res.sendStatus(500);
    if(!db.notes[note]) return res.sendStatus(404);

    db.notes[note] = text;
    writeDb(db);
    res.sendStatus(204);
});

app.listen(process.env.port || 8080);