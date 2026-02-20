import path from "path";
import { Db } from "./geteDb";
import fs from "fs";

const rootdir = process.cwd();

export default function writeDb(db: Db){
    const dbPath = path.join(rootdir, "db.json");
    try{
        fs.writeFileSync(dbPath, JSON.stringify(db));
        return;
    }
    catch(err){
        console.warn("error while writing db: ", err);
        return;
    }
}