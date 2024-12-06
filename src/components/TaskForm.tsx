import React from "react";

const TaskForm = ({ form, setForm, onSubmit, editing }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={onSubmit} className='space-y-4'>
            <input name='title' value={form.title} onChange={handleChange} placeholder='Title' required className='w-full p-2 border rounded' />
            <textarea name='description' value={form.description} onChange={handleChange} placeholder='Description' className='w-full p-2 border rounded' />
            <select name='status' value={form.status} onChange={handleChange} className='w-full p-2 border rounded'>
                <option value='Pending'>Pending</option>
                <option value='Completed'>Completed</option>
            </select>
            <button type='submit' className='px-4 py-2 bg-green-500 text-white rounded'>
                {editing ? "Update Task" : "Create Task"}
            </button>
        </form>
    );
};

export default TaskForm;
