"use client";

import { useEffect, useState } from "react";

export default function TodoPage(){
    const [todos, setTodos] = useState<string[]>();
    const [createTodoInp, setCreateTodoInp] = useState<string>();

    async function updateTodos() {
        try{
            const response = await fetch("/api/todo");
            const json = await response.json();
            if(!response.ok) {
                console.warn("Error while fetching todos: ", response.status, json);
                return;
            }
            setTodos(json.todos);
        }
        catch(err){
            console.warn("Error while fething todos: ", err);
        }
    }

    async function createTodo() {
        if(createTodoInp == "" || !createTodoInp) return;
        
        try{
            await fetch("/api/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    todo: createTodoInp
                })
            });

            setCreateTodoInp("");

            await updateTodos();
        }
        catch(err){
            console.warn("Error while creating todo: ", err);
        }
    }

    async function deleteTodo(todo: string) {
        try{
            await fetch("/api/todo", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    todo: todo
                })
            });

            await updateTodos();
        }
        catch(err){
            console.warn("Error while deleting note: ", err);
        }
    }

    useEffect(() => {
        updateTodos();
    }, [])

    return(<>
        <h5>Todos:</h5>
        <br />
        <ul>
            {
                todos?.map((todo: string, index: number) => (
                    <li key={index} onClick={() => deleteTodo(todo)} style={{cursor: "pointer"}}>{todo}</li>
                ))
            }
        </ul>
        <br />

        <form onSubmit={createTodo}>
            <input type="text" value={createTodoInp} className="form-control w-50" onChange={(e) => setCreateTodoInp(e.target.value)} />
        
            <input type="submit" value="Create" className="btn btn-primary" />
        </form>
    </>);
}