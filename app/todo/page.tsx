"use client";

import { useEffect, useState } from "react";

export default function TodoPage(){
    const [todos, setTodos] = useState<string[]>();

    async function updateTodos() {
        try{
            const response = await fetch("/api/todo");
            if(!response.ok) console.warn("Error while fetching todos: ", response.status, await response.json());
            const json = await response.json();
            setTodos(json.todos);
        }
        catch(err){
            console.warn("Error while fething todos: ", err);
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
                    <li key={index}>{todo}</li>
                ))
            }
        </ul>
    </>);
}