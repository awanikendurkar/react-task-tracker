import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: "Doctor's appointment",
            day: "Feb 5th at 2:30 pm",
            reminder: true,
        },
        {
            id: 2,
            text: "Meeting at school",
            day: "Feb 6th at 1:30 pm",
            reminder: true,
        },
        {
            id: 3,
            text: "Food shopping",
            day: "Feb 5th at 2:30 pm",
            reminder: false,
        },
    ]);

    // delete a task
    const deleteTask = (id) => {
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
            <Header />
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
