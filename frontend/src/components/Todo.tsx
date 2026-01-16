import { useEffect, useState } from "react";

export default function Todo(){
    const [todos, setTodos] = useState<string[]>([]);

    async function updateTodos() {
        try{
            const response = await fetch("/todos");
            if(response.ok){
                const json = await response.json();
                setTodos(json.todos.map((todo:any, index:any) => (
                    <li key={index} onClick={() => deleteTodo(todo)} style={{cursor: "pointer"}}>{todo}</li>
                )))
            }
            else if(response.status == 404) setTodos([]);
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