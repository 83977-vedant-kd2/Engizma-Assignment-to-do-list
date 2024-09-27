import React, { useState, useEffect , useMemo} from 'react';
import './TaskModal.css'; 

const TaskModal = ({ isOpen, onClose, taskData, onSave }) => {
    const initialTaskState = useMemo(() => ({
        assignedTo: '',
        status: 'Not Started',
        dueDate: '',
        priority: 'Normal',
        description: '',
      }), []);

      const [task, setTask] = useState(initialTaskState);

      useEffect(() => {
        if (taskData) {
          setTask(taskData);
        } else {
          setTask(initialTaskState); 
        }
      }, [taskData,initialTaskState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = () => {
    onSave(task);
    setTask(initialTaskState);
    onClose(); 
  };

  const handleCancel = () => {
    setTask(initialTaskState); 
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
      <h2 className="modal-header">{taskData ? 'Edit Task' : 'New Task'}</h2>
      <div className="modal-body">
      <div className="row">
        <div className="column">
            <label>Assigned To:</label>
            <input
              type="text"
              name="assignedTo"
              value={task.assignedTo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="column">
            <label>Status:</label>
            <select name="status" value={task.status} onChange={handleChange}>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          </div>

        <div className="row">
            <div className="column">
            <label>Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="column">
            <label>Priority:</label>
            <select name="priority" value={task.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
          </div>
        <div className="row">
            <div className="column" style={{ width: "100%" }}>
            <label>Description:</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
            ></textarea>
          </div>
          </div>
          </div>
          <div className="modal-actions">
          <button type="button" onClick={handleSubmit}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
