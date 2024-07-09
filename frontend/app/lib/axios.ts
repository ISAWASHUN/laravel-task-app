import axios from 'axios';
import { Task } from '../types/task';


const API_BASE_URL = 'http://localhost:8081/api';

export const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data.data;
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
    const response = await axios.post(`${API_BASE_URL}/tasks`, task);
    return response.data;
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, task);
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
};
