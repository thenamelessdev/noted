import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const dbFile = path.join(root, "db.json");


export function getDb(){
    try{
        const db = readFileSync(dbFile);
        return JSON.parse(db.toString());
    }
    catch(err){
        try{
            writeFileSync(dbFile, "{}");
            return JSON.parse(readFileSync(dbFile).toString());
        }
        catch(err){
            console.log(err);
            return false;
        }
    }
}

export function writeDb(db:any){
    try{
        writeFileSync(dbFile, db.toString());
    }
    catch(err){
        console.log(err);
        return false;
    }
}