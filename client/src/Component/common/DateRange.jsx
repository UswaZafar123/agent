
import { useState } from 'react';
import { DateRange } from 'react-date-range';

function DateRangePickerComponent(props) {


const handleChange=(item)=>{
  setState([item.selection])
props.handleDate(item)

}






    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
      


    return <DateRange
    editableDateInputs={true}
    onChange={item => handleChange(item)}
    moveRangeOnFirstSelection={false}
    ranges={state}
  />
  }


export default DateRangePickerComponent;