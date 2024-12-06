const mockTasks = [
    {
        id: 1,
        title: "Buy groceries",
        description: "Milk, eggs, bread, and coffee",
        status: "Pending",
        createdAt: "2024-12-01T10:00:00Z",
        updatedAt: "2024-12-01T10:00:00Z",
    },
    {
        id: 2,
        title: "Workout",
        description: "1-hour cardio session",
        status: "Completed",
        createdAt: "2024-12-02T08:30:00Z",
        updatedAt: "2024-12-03T09:15:00Z",
    },
];

export const fetchTasks = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...mockTasks]), 500);
    });
};

export const createTask = async (task) => {
    return new Promise((resolve) => {
        const newTask = {
            id: Date.now(),
            ...task,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        mockTasks.push(newTask);
        setTimeout(() => resolve(newTask), 500);
    });
};

export const updateTask = async (id, updatedTask) => {
    return new Promise((resolve, reject) => {
        const index = mockTasks.findIndex((task) => task.id === id);
        if (index !== -1) {
            mockTasks[index] = {
                ...mockTasks[index],
                ...updatedTask,
                updatedAt: new Date().toISOString(),
            };
            setTimeout(() => resolve(mockTasks[index]), 500);
        } else {
            reject(new Error("Task not found"));
        }
    });
};

export const deleteTask = async (id) => {
    return new Promise((resolve, reject) => {
        const index = mockTasks.findIndex((task) => task.id === id);
        if (index !== -1) {
            mockTasks.splice(index, 1);
            setTimeout(() => resolve({ success: true }), 500);
        } else {
            reject(new Error("Task not found"));
        }
    });
};

export const toggleTaskStatus = async (id) => {
    return new Promise((resolve, reject) => {
        const index = mockTasks.findIndex((task) => task.id === id);
        if (index !== -1) {
            mockTasks[index].status = mockTasks[index].status === "Pending" ? "Completed" : "Pending";
            mockTasks[index].updatedAt = new Date().toISOString();
            setTimeout(() => resolve(mockTasks[index]), 500);
        } else {
            reject(new Error("Task not found"));
        }
    });
};
