import getDb from "@/backend/functions/geteDb";
import { NextResponse } from "next/server";

export function GET(req: Request){
    const db = getDb();
    if(!db) return NextResponse.json({error: "error while getting db"}, {status: 500});
    return NextResponse.json({
        todos: db.todos || []
    });
}