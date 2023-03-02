import { FormEvent, useEffect, useMemo, useState } from 'react';

import MainTable from 'components/tables/mainTable/MainTable';
import {
  IData,
  transformDataToDynamicArray
} from 'utils/helpers/transformDataToDynamicArray';
import { TableContext } from 'contexts/TableContext';
import { useFetchData } from 'hooks/useFetchData';
import {
  isObjectEmpty,
  validationField,
  validationForm
} from 'utils/helpers/validation';

import './homePage.css';

export interface IField {
  value: string;
  touched: boolean;
}

const HomePage = () => {
  const [tableData, setTableData] = useState<IData[]>([]);
  const [inputValues, setInputValues] = useState<IData<IField>>({});
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const fetchData = async () => {
    const data = await useFetchData<IData[]>();
    setTableData(transformDataToDynamicArray(data as IData[]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setValidationErrors({});
  }, [isModalFormOpen]);

  useEffect(() => {
    if (tableData.length) {
      const keys = Object.keys(tableData[0]);

      const initialInputValues = keys.reduce((acc: IData<IField>, key) => {
        acc[key] = {
          value: '',
          touched: false
        };
        return acc;
      }, {});
      setInputValues(initialInputValues);
    }
  }, [tableData]);

  const handleDeleteRow = (rowId: string) => {
    const updatedData = tableData.filter(row => row.id !== rowId);
    setTableData(updatedData);
  };

  const handleModalFormInputChange = (e: FormEvent<HTMLInputElement>) => {
    const error = validationField(e.currentTarget.name, e.currentTarget.value);
    setValidationErrors({ ...validationErrors, ...error });

    setInputValues({
      ...inputValues,
      [e.currentTarget.name]: {
        value: e.currentTarget.value,
        touched: true
      }
    });
  };

  const handleModalFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validationForm(inputValues);
    setValidationErrors(errors);

    if (!isObjectEmpty(errors)) {
      return;
    }

    const newTableRow = Object.keys(inputValues).reduce((acc: IData, key) => {
      acc[key] = inputValues[key].value;
      return acc;
    }, {});

    setTableData([...tableData, newTableRow]);
    setIsModalFormOpen(false);
  };

  const handleModalFormCancel = () => {
    setIsModalFormOpen(false);
  };

  const contextValue = useMemo(
    () => ({
      tableData,
      handleModalFormInputChange,
      handleModalFormSubmit,
      handleModalFormCancel,
      handleDeleteRow,
      setIsModalFormOpen,
      isModalFormOpen,
      inputValues,
      validationErrors
    }),
    [tableData, inputValues, isModalFormOpen, validationErrors]
  );

  return (
    <TableContext.Provider value={contextValue}>
      <div className="app">{tableData.length > 0 && <MainTable />}</div>
    </TableContext.Provider>
  );
};

export default HomePage;
