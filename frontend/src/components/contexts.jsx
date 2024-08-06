import { createContext } from 'react';

export const daysContext = createContext({
  days: [1, 2, 3],
  setDays: () => {},
});

export const selectedDayContext = createContext({
  selectedDay: 1,
  setSelectedDay: () => {},
});