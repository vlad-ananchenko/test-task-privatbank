import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TableContext } from 'contexts/TableContext';
import { DeleteTableRowButton } from 'components/buttons/DeleteTableRowButton';
import { AddNewTableRowButton } from 'components/buttons/AddNewTableRowButton';
import EditableTableCell from 'components/cells/editableTableCell/EditableTableCell';
import NewTableRowForm from 'components/forms/newTableRowForm/NewTableRowForm';
import Modal from 'components/modals/newTableRowModal/NewTableRowModal';

import './mainTable.css';

const MainTable = () => {
  const { tableData, handleDeleteRow, isModalFormOpen, setIsModalFormOpen } =
    useContext(TableContext);

  const columns = Object.keys(tableData[0]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={uuidv4()} colSpan={i === columns.length - 1 ? 2 : 1}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map(row => (
            <tr key={row.id}>
              {columns.map(column => (
                <EditableTableCell key={uuidv4()} value={row[column]} />
              ))}

              <td>
                <div className="table-row-buttons">
                  <DeleteTableRowButton
                    type="button"
                    onClick={() => handleDeleteRow(row.id)}
                  >
                    Delete
                  </DeleteTableRowButton>
                  <AddNewTableRowButton
                    type="button"
                    onClick={() => setIsModalFormOpen(true)}
                  >
                    Add
                  </AddNewTableRowButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalFormOpen && (
        <Modal>
          <NewTableRowForm fields={columns} />
        </Modal>
      )}
    </div>
  );
};

export default MainTable;
