import path from "path";
import fs from "fs"

const rootdir = process.cwd();

export interface Db{
    todos?: string[],
    notes?: Note[],
}

interface Note{
    name: string,
    description: string,
}

export default function getDb(): Db | undefined{
    const dbPath = path.join(rootdir, "db.json");
    try{
        const db = fs.readFileSync(dbPath);
        return JSON.parse(db.toString()) as Db;
    }
    catch{
        try{
            fs.writeFileSync(dbPath, JSON.stringify({}));
            const createdDb = fs.readFileSync(dbPath);
            return JSON.parse(createdDb.toString()) as Db;
        }
        catch(err){
            console.warn("error while getting db: ", err);
            return undefined;
        }
    }
}