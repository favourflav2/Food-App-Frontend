import * as React from 'react';
import { DemoContainer,DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDateTimePicker() {
  return (
    
      <DemoContainer components={[
        'DatePicker',
        'DateTimePicker',
        'TimePicker',
        'DateRangePicker',
      ]}>
        <DemoItem label="DatePicker">
          <DatePicker
            //defaultValue={tomorrow}
            disableFuture
            views={['year', 'month', 'day']}
          />
        </DemoItem>
        <DemoItem label="TimePicker">
          <TimePicker 
          //defaultValue={todayEndOfTheDay} 
          //disableFuture 
          />
        </DemoItem>
      </DemoContainer>
    
  );
}
