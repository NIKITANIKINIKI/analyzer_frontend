import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  algorithms: [
    {
      label: "Линейная регрессия",
      value: "1",
    },
    {
      label: "Ридж-регрессия",
      value: "2",
    },
    {
      label: "SVD разложение",
      value: "3",
    },
    {
      label: "Метод группового учета",
      value: "4",
    },
    {
      label: "Регрессия в нелинейном базисе",
      value: "5",
    },
    {
      label: "Робастная регрессия",
      value: "6",
    },
    {
      label: "Регуляризация",
      value: "7",
    },
    {
      label: "Метод главных компонентов",
      value: "8",
    },
    {
      label: "Градиентный бустинг",
      value: "9",
    },
    {
      label: "Дерево решений",
      value: "10",
    },
    {
      label: "Метод ближайших соседей",
      value: "11",
    },
    {
      label: "Метод опорных векторов",
      value: "12",
    },
    {
      label: "Корреляция величиной с запаздыванием",
      value: "13",
    },
  ],
};

const algorithmsSlice = createSlice({
  name: "algorithms",
  initialState,
  reducers: {},
});

export default algorithmsSlice.reducer

export const selectAlgorithms =(state) => state.algorithms.algorithms