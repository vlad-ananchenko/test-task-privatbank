import { useContext } from 'react';

import { TableContext } from 'contexts/TableContext';
import { AddNewTableRowButton } from 'components/buttons/AddNewTableRowButton';
import { DeleteTableRowButton } from 'components/buttons/DeleteTableRowButton';
import Paper from 'components/papers/newTableFormModalPaper/NewTableFormModalPaper';

import './newTableRowForm.css';

interface INewTableRowFormProps {
  fields: string[];
}

const NewTableRowForm = ({ fields }: INewTableRowFormProps) => {
  const {
    handleModalFormSubmit,
    handleModalFormCancel,
    handleModalFormInputChange,
    validationErrors
  } = useContext(TableContext);

  return (
    <Paper>
      <form onSubmit={handleModalFormSubmit}>
        {fields.map(field => (
          <div className="form-field" key={field}>
            <label htmlFor={field}>{field}:</label>
            <input
              type={typeof [field]}
              id={field}
              name={field}
              onChange={handleModalFormInputChange}
            />
            {validationErrors[field] && (
              <span className="error">{validationErrors[field]}</span>
            )}
          </div>
        ))}
        <div className="form-buttons">
          <AddNewTableRowButton type="submit">Add</AddNewTableRowButton>
          <DeleteTableRowButton type="button" onClick={handleModalFormCancel}>
            Cancel
          </DeleteTableRowButton>
        </div>
      </form>
    </Paper>
  );
};

export default NewTableRowForm;
