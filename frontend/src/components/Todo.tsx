import { useEffect, useState } from "react";

export default function Todo(){
    const [todos, setTodos] = useState("");

    async function updateTodos() {
        try{
            const response = await fetch("/todos");
            const json = await response.json();
            if(response.ok){
                setTodos(json.todos.map((todo:any, index:any) => (
                    <li key={index} onClick={() => deleteTodo(todo)} style={{cursor: "pointer"}}>{todo}</li>
                )))
            }
        }
        catch(err){
            console.log(err);
        }
    }

    async function deleteTodo(todo:string) {
        try{
            await fetch("/todos", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    todo: todo
                })
            });
            updateTodos();
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        updateTodos();
        setInterval(() => {
            updateTodos()
        }, 5000);
    }, []);
    return(
        <div>
           <ul>{todos}</ul> 
        </div>
    );
}