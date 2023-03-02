/* eslint-disable no-unused-vars */
import { FormEvent, createContext, Dispatch, SetStateAction } from 'react';
import { IData } from 'utils/helpers/transformDataToDynamicArray';

export interface ITableContext {
  tableData: IData[];
  handleModalFormInputChange: (e: FormEvent<HTMLInputElement>) => void;
  handleModalFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleModalFormCancel: () => void;
  handleDeleteRow: (rowId: string) => void;
  setIsModalFormOpen: Dispatch<SetStateAction<boolean>>;
  isModalFormOpen: boolean;
  inputValues: {};
  validationErrors: IData;
}

export const TableContext = createContext<ITableContext>({
  tableData: [],
  handleModalFormInputChange: () => {},
  handleModalFormSubmit: () => {},
  handleModalFormCancel: () => {},
  handleDeleteRow: () => {},
  setIsModalFormOpen: () => {},
  isModalFormOpen: false,
  inputValues: {},
  validationErrors: {}
});
