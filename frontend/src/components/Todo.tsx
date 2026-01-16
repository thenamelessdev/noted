import { useEffect, useState } from "react";

export default function Todo(){
    const [todos, setTodos] = useState<string[]>([]);
    const [addThisTodo, setAddThisTodo] = useState("");

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

    async function addTodo() {
        if(addThisTodo == "") return;
        try{
            await fetch("/todos", {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    todo: addThisTodo
                })
            });
            setAddThisTodo("");
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
           <br />
           <input type="text" className="form-contorl w-50" onChange={(e) => setAddThisTodo(e.target.value)} value={addThisTodo} placeholder="Todo" />
           <br />
           <button className="btn btn-primary" onClick={addTodo}>Add todo</button>
           
        </div>
    );
}