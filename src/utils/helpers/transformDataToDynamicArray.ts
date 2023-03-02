export interface IData<T = string> {
  [key: string]: T;
}

export const transformDataToDynamicArray = (dataArr: IData[]) => {
  const dynamicArray = dataArr.map(obj => {
    const dynamicObj: { [key: string]: string } = {};
    Object.keys(obj).forEach(key => {
      dynamicObj[key] = obj[key];
    });

    return dynamicObj;
  });
  return dynamicArray;
};
