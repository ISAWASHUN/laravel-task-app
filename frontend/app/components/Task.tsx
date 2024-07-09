import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../lib/axios';
import { Task as TaskType } from '../types/task';

const Task = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState<Partial<TaskType>>({ title: '', description: '', is_completed: false });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasks = await getTasks();
      setTasks(Array.isArray(tasks) ? tasks : []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await createTask(newTask);
      setNewTask({ title: '', description: '', is_completed: false });
      fetchTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleUpdate = async (id: number, updatedTask: Partial<TaskType>) => {
    try {
      await updateTask(id, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        ></textarea>
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-4 p-4 border border-gray-300 rounded">
            <input
              type="text"
              value={task.title}
              onChange={(e) => handleUpdate(task.id, { ...task, title: e.target.value })}
              className="block w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <textarea
              value={task.description}
              onChange={(e) => handleUpdate(task.id, { ...task, description: e.target.value })}
              className="block w-full p-2 mb-2 border border-gray-300 rounded"
            ></textarea>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={task.is_completed}
                onChange={(e) => handleUpdate(task.id, { ...task, is_completed: e.target.checked })}
                className="mr-2"
              />
              <label>Completed</label>
            </div>
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
