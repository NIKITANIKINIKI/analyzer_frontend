import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function BasicDateCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale='ru'>
      <DateCalendar /> 
    </LocalizationProvider>
  );
}