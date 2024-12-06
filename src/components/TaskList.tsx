import React from "react";

const TaskList = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
    return (
        <div className='space-y-4'>
            {tasks.map((task) => (
                <div key={task.id} className='p-4 border rounded-lg flex justify-between items-center'>
                    <div>
                        <h3 className='font-bold'>{task.title}</h3>
                        <p>{task.description}</p>
                        <p className={`text-sm ${task.status === "Completed" ? "text-green-500" : "text-yellow-500"}`}>Status: {task.status}</p>
                    </div>
                    <div className='space-x-2'>
                        <button onClick={() => onEdit(task)} className='px-2 py-1 bg-blue-500 text-white rounded'>
                            Edit
                        </button>
                        <button onClick={() => onDelete(task.id)} className='px-2 py-1 bg-red-500 text-white rounded'>
                            Delete
                        </button>
                        <button onClick={() => onToggleStatus(task.id)} className='px-2 py-1 bg-gray-500 text-white rounded'>
                            Toggle Status
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
