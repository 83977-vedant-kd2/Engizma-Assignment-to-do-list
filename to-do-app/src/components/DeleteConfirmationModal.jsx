import React from 'react';
import './DeleteConfirmationModal.css'; 

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, task }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Are you sure you want to delete this task?</h3>
        <p>{`Task: ${task.assignedTo} - ${task.description}`}</p>
        <div className="modal-actions">
          <button onClick={() => onConfirm(task)} style={{ backgroundColor: 'red', color: 'white' }}>
            Yes
          </button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
