import React from 'react';
import './DeleteConfirmationModal.css';

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal_overlay">
    <div className="modal_content">
      <h2>Are you sure you want to delete this vacation?</h2>
      <div className="modal_actions">
        <button>Cancel</button>
        <button>Delete</button>
      </div>
    </div>
  </div>
  );
};

export default DeleteConfirmationModal;