import React, { useState , useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import { getTasks, createTask, updateTask, deleteTask } from './components/TaskService';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
 
  useEffect(() => {
    getTasks()
      .then(fetchedTasks => setTasks(fetchedTasks))
      .catch(error => console.error(error));
  }, []);

  const openNewTaskModal = () => {
    setEditingTask(null); 
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setEditingTask(task); 
    setIsModalOpen(true);
  };

  const saveTask = (task) => {
    if (editingTask) {

      updateTask(editingTask.id, task)
        .then(updatedTask => {
          setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
          setIsModalOpen(false); 
        })
        .catch(error => console.error('Error updating task:', error));
    } else {
      // Adding a new task
      createTask(task)
        .then(newTask => {
          setTasks([...tasks, newTask]);
          setIsModalOpen(false);
        })
        .catch(error => console.error('Error creating task:', error));
    }
  };

  const openDeleteModal = (task) => {
    setTaskToDelete(task); 
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteTask = (task) => {
    deleteTask(task.id)
      .then(() => {
        setTasks(tasks.filter(t => t.id !== task.id));
        setIsDeleteModalOpen(false); 
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="app-container">
      <div className="task-header">
        <h2>Tasks - All Tasks</h2>
        <button onClick={openNewTaskModal}>New Task</button>
        <button onClick={() => {getTasks()
            .then(fetchedTasks => setTasks(fetchedTasks))
            .catch(error => console.error('Error fetching tasks:', error));}}>Refresh</button>
      </div>
      <TaskList 
        tasks={tasks} 
        onEdit={openEditTaskModal} 
        onDelete={openDeleteModal} 
      />
      
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        taskData={editingTask} 
        onSave={saveTask} 
      />
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteTask}
        task={taskToDelete}
      />
    </div>
  );
};

export default App;
