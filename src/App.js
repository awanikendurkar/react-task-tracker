import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
    const [showAddTask, setShowAddTask] = useState(false);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };
        getTasks();
    }, []);

    // fetch tasks
    const fetchTasks = async () => {
        const res = await fetch("http://localhost:5050/tasks");
        const data = await res.json();

        return data;
    };

    // add task
    const addTask = async (task) => {
        const res = await fetch("http://localhost:5050/tasks", {
            method: "POST",
            headers: {
                "Content-type": "applcation/json",
            },
            body: JSON.stringify(task),
        });

        const data = await res.json();

        setTasks([...tasks, data]);
    };

    // delete a task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5050/tasks/${id}`, {
            method: "DELETE",
        });

        setTasks(tasks.filter((task) => task.id !== id));
    };

    // toggle reminder
    const toggleReminder = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, reminder: !task.reminder } : task
            )
        );
    };

    return (
        <div className='container'>
            <Header
                onAdd={() => setShowAddTask(!showAddTask)}
                showAdd={showAddTask}
            />
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? (
                <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                />
            ) : (
                "No tasks to show!"
            )}
        </div>
    );
}

export default App;
