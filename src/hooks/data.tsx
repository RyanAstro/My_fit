import moment, { MomentInput } from "moment";
import React, { createContext, useContext, useState, useEffect } from "react";
import { filterIsToday, getLocalStorage, setLocalStorage } from "../helpers";
import { Item, DataProviderData } from "../types";

const DataContext = createContext<DataProviderData>({} as DataProviderData);

export const DataProvider: React.FC = ({ children }) => {
  const [currentDate, setCurrentDate] = useState<MomentInput>(moment());
  const [currentKcal, setCurrentKcal] = useState<number>(0);
  const [currentList, setCurrentList] = useState<Item[]>([]);

  const [listAllItens, setListAllItens] = useState<Item[]>([]);

  useEffect(() => {
    getStorageData();
  }, []);

  useEffect(() => {
    updateCurrentDay();
  }, [currentDate, listAllItens]);

  const getStorageData = async () => {
    const response = await getLocalStorage();
    setListAllItens(response);
  };

  const addItem = async (item: Item) => {
    if (listAllItens) {
      const newList = [...listAllItens, item];
      setListAllItens(newList);
      await setLocalStorage(newList);
      updateCurrentDay();
    } else {
      setListAllItens([item]);
      await setLocalStorage([item]);
      updateCurrentDay();
    }
    setCurrentDate(moment());
  };

  const updateCurrentDay = () => {
    if (listAllItens) {
      const filteredList = listAllItens.filter((item) =>
        filterIsToday(item.date, currentDate)
      );

      console.log("filtered", filteredList, listAllItens);

      const countKcal = filteredList.reduce((acc, currentValue) => {
        return acc + currentValue.kcal;
      }, 0);

      setCurrentList(filteredList);
      setCurrentKcal(countKcal);
    }
  };

  const handleChangeDate = (date: MomentInput) => {
    setCurrentDate(date);
  };

  return (
    <DataContext.Provider
      value={{
        currentDate,
        currentKcal,
        currentList,
        addItem,
        handleChangeDate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("use into of Data Context");

  return context;
};
