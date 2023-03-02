import { IField } from '../../components/pages/homePage/HomePage';
import { IData } from './transformDataToDynamicArray';

export const isObjectEmpty = (obj: IData) => Object.keys(obj).length === 0;

export const validationForm = (inputValues: IData<IField>): IData => {
  const errors: IData = {};

  Object.entries(inputValues).forEach(([fieldName, field]) => {
    if (!field.value) {
      errors[fieldName] = `${fieldName} is required field`;
    }
  });

  return errors;
};

export const validationField = (fieldName: string, value: string): IData => {
  const error: IData = {
    [fieldName]: ''
  };

  if (!value) {
    error[fieldName] = `${fieldName} is a required field`;
  }

  return error;
};
