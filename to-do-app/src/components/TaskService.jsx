import axios from 'axios';

// Base URL for JSON Server
const API_URL = 'http://localhost:5000/tasks';

// Get all Tasks (GET)
export const getTasks = () => {
  return axios.get(API_URL)
    .then(response => response.data)
    .catch(error => {
      console.error('There was an error fetching the tasks!', error);
      throw error;
    });
};

// Create a new task (POST)
export const createTask = (task) => {
  return axios.post(API_URL, task)
    .then(response => response.data)
    .catch(error => {
      console.error('There was an error creating the task!', error);
      throw error;
    });
};

// Update a task by ID (PUT)
export const updateTask = (id, updatedTask) => {
  return axios.put(`${API_URL}/${id}`, updatedTask)
    .then(response => response.data)
    .catch(error => {
      console.error('There was an error updating the task!', error);
      throw error;
    });
};

// Delete a task by ID (DELETE)
export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('There was an error deleting the task!', error);
      throw error;
    });
};
