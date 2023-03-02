import { FormEvent, useEffect, useRef, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';

import './editableTableCell.css';

interface IEditableTableCellProps {
  value: string;
}

const EditableTableCell = ({ value }: IEditableTableCellProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(prev => !prev);
  };

  const handleValueChange = (e: FormEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;

    setInputValue(newValue);
    setError(!newValue.trim());
  };

  const handleInputBlur = () => {
    if (inputValue.trim() !== '') {
      setEditedValue(inputValue);
    }
    setIsEditing(false);
    setError(false);
  };

  return (
    <td
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        textAlign: 'center',
        outline: error ? '2px solid #e63946' : 'none'
      }}
    >
      {isEditing ? (
        <textarea
          required
          disabled={!isEditing}
          defaultValue={editedValue}
          onChange={handleValueChange}
          onBlur={handleInputBlur}
          ref={ref}
        />
      ) : (
        editedValue
      )}

      {isHovered && !isEditing && (
        <button className="edit-button" type="button" onClick={handleEdit}>
          <AiFillEdit className="edit-icon" />
        </button>
      )}
    </td>
  );
};

export default EditableTableCell;
