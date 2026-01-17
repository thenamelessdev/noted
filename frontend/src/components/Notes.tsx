import { useEffect, useState } from "react";
import Note from "./Note";

export default function Notes(){

    const [notes, setNotes] = useState<string[]>([]);
    const [renderNote, setRenderNote] = useState(false);
    const [newNoteName, setNewNoteName] = useState("");

    async function getNotes() {
        try{
            const response = await fetch("/notes");
            if(response.ok){
                const json = await response.json();
                setNotes(json.notes.map((note:any, index:any) => (
                    <li key={index} onClick={() => setRenderNote(note)} style={{cursor: "pointer"}}>{note}</li>
                )))
            }
        }
        catch(err){
            console.log(err);
        }
    }

    async function createNote() {
        if(newNoteName == "") return;
        try{
            await fetch("/notes", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    note: newNoteName
                })
            });
            getNotes();
        }
        catch(err){
            console.log(err);
        }
    }


    useEffect(() => {
        getNotes()
    }, []);

    return(
        <div>
            <ul>{notes}</ul>
            <br />
            <input type="text" className="form-control w-50" onChange={(e) => setNewNoteName(e.target.value)} placeholder="Note name" />
            <br />
            <button onClick={createNote} className="btn btn-primary">Create Note</button>
            <br /><br />
            {renderNote && <Note note={renderNote.toString()}/>}
        </div>
    );
}