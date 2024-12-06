import { createTask, deleteTask, fetchTasks, toggleTaskStatus, updateTask } from "../mockApi";
import { useEffect, useState } from "react";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", status: "Pending" });
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks().then(setTasks);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingTask) {
            const updatedTask = await updateTask(editingTask.id, form);
            setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
            setEditingTask(null);
        } else {
            const newTask = await createTask(form);
            setTasks((prev) => [...prev, newTask]);
        }
        setForm({ title: "", description: "", status: "Pending" });
    };

    const handleEdit = (task) => {
        setForm({
            title: task.title,
            description: task.description,
            status: task.status,
        });
        setEditingTask(task);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const handleToggleStatus = async (id) => {
        const updatedTask = await toggleTaskStatus(id);
        setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    };

    return (
        <div className='min-h-screen bg-gray-100 p-4'>
            <h1 className='text-3xl font-bold text-center mb-6'>Task Manager</h1>

            {/* Task Form */}
            <form onSubmit={handleSubmit} className='bg-white p-4 shadow-md rounded-md mb-6'>
                <input
                    name='title'
                    value={form.title}
                    onChange={handleInputChange}
                    placeholder='Title'
                    required
                    className='w-full mb-4 p-2 border rounded-md'
                />
                <textarea
                    name='description'
                    value={form.description}
                    onChange={handleInputChange}
                    placeholder='Description'
                    className='w-full mb-4 p-2 border rounded-md'
                />
                <select name='status' value={form.status} onChange={handleInputChange} className='w-full mb-4 p-2 border rounded-md'>
                    <option value='Pending'>Pending</option>
                    <option value='Completed'>Completed</option>
                </select>
                <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>
                    {editingTask ? "Update Task" : "Create Task"}
                </button>
            </form>

            {/* Task List */}
            <ul className='space-y-4'>
                {tasks.map((task) => (
                    <li key={task.id} className='bg-white p-4 shadow-md rounded-md flex items-center justify-between'>
                        <div>
                            <h2 className='text-lg font-bold'>{task.title}</h2>
                            <p>{task.description}</p>
                            <p className='text-sm text-gray-500'>Status: {task.status}</p>
                        </div>
                        <div className='flex space-x-2'>
                            <button onClick={() => handleEdit(task)} className='bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600'>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(task.id)} className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'>
                                Delete
                            </button>
                            <button
                                onClick={() => handleToggleStatus(task.id)}
                                className={`px-3 py-1 rounded-md ${
                                    task.status === "Pending" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
                                } text-white`}
                            >
                                {task.status === "Pending" ? "Mark Completed" : "Mark Pending"}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
