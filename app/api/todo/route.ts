import getDb from "@/backend/functions/geteDb";
import writeDb from "@/backend/functions/writeDb";
import { NextResponse } from "next/server";

export function GET(req: Request){
    const db = getDb();
    if(!db) return NextResponse.json({error: "error while getting db"}, {status: 500});
    return NextResponse.json({
        todos: db.todos || []
    });
}

export async function POST(req: Request){
    const body = await req.json();
    if(!body.todo) return NextResponse.json({error: "Missing todo"}, {status: 400});
    const db = getDb();
    if(!db) return NextResponse.json({error: "error while getting db"}, {status: 500});

    const todos = db.todos || [];
    todos.push(body.todo);
    db.todos = todos;
    writeDb(db);

    return new NextResponse(null, {status: 204});
}