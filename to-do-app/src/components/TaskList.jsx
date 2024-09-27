import React from 'react';


const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <table className="task-list">
      <thead>
        <tr>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Comments</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id}>
            <td>{task.assignedTo}</td>
            <td>{task.status}</td>
            <td>{task.dueDate}</td>
            <td>{task.priority}</td>
            <td>{task.description}</td>
            <td>
              <button onClick={() => onEdit(task)}>Edit</button>
              <button 
                onClick={() => onDelete(task)} 
                style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
