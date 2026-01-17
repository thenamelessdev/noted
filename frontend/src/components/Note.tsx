import { useEffect, useState } from "react";

interface NoteInterface{
    note: string
}

export default function Note({ note }: NoteInterface){

    const [noteText, setNoteText] = useState("loading...");

    async function getNote() {
        try{
            const response = await fetch(`/note?note=${note}`);
            if(response.ok){
                const json = await response.json();
                setNoteText(json.note);
            }
            else{
                setNoteText("error")
            }
        }
        catch(err){
            console.log(err);
            setNoteText("error");
        }
    }

    async function editNote() {
        try{
            await fetch("/note", {
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    note: note,
                    text: noteText
                })
            });
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getNote();
    }, [note]);

    return(
        <div>
            <h5>{note}</h5>
            <br />
            <textarea className="form-control" rows={5} value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
            <br />
            <button className="btn btn-success" onClick={editNote}>Update</button>
        </div>
    );
}