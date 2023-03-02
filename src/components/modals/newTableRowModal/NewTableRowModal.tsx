import { ReactNode } from 'react';

import './newTableRowModal.css';

type INewTableRowModalProps = {
  children: ReactNode;
};

const NewTableRowModal = ({ children }: INewTableRowModalProps) => (
  <div className="modal-container">
    <div className="modal-content">{children}</div>
  </div>
);

export default NewTableRowModal;
