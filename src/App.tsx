// import React, { useState } from "react";
// import { DateRangePicker, DateRange } from "react-date-range";
// import Select from "react-select";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import "./App.css";
// import { addDays } from "date-fns";

// interface Reservation {
//     id: number;
//     startDate: Date;
//     endDate: Date | null;
//     startTime: string;
//     endTime: string;
// }

// interface DateRangePickerProps {
//     onChange: (item: { [key: string]: DateRange }) => void;
//     showPreview: boolean;
//     moveRangeOnFirstSelection: boolean;
//     months: number;
//     ranges: DateRange[];
//     direction: string;
//     showDateDisplay: boolean;
//     minDate: Date;
//     maxDate?: Date | null | undefined;
// }

// const App: React.FC = () => {
//     const [state, setState] = useState<DateRange[]>([
//         {
//             startDate: new Date(),
//             endDate: addDays(new Date(), 0),
//             key: "selection",
//         },
//     ]);
//     const [selectedTime, setSelectedTime] = useState({
//         startTime: "09:00",
//         endTime: "18:00",
//     });

//     const reservations: Reservation[] = [{ id: 1, ...state[0], ...selectedTime }];

//     const maxDate = new Date();
//     maxDate.setDate(maxDate.getDate() + 200);

//     const handleTimeChange = (selectedOption: any, type: "startTime" | "endTime") => {
//         const time = selectedOption.value;
//         setSelectedTime((prev) => ({
//             ...prev,
//             [type]: time,
//         }));
//     };

//     // const handleDateChange = (item: { [key: string]: DateRange }) => {
//     //     setState([item.selection]);
//     //     console.log("Selected Start Date:", item.selection.startDate);
//     //     console.log("Selected End Date:", item.selection.endDate);
//     // };

//     const handleDateChange = (item: { [key: string]: DateRange }) => {
//         setState([item.selection]);
//         console.log("Selected Start Date:", item.selection.startDate);
//         console.log("Selected End Date:", item.selection.endDate);

//         // Include selected hours in the end date
//         const selectedStartTime = selectedTime.startTime;
//         const selectedEndTime = selectedTime.endTime;
//         const formattedStartDate = item.selection.startDate;
//         const formattedEndDate = item.selection.endDate ? new Date(item.selection.endDate) : null;

//         if (formattedEndDate) {
//             formattedEndDate.setHours(parseInt(selectedEndTime.split(":")[0], 10));
//             formattedEndDate.setMinutes(parseInt(selectedEndTime.split(":")[1], 10));
//         }

//         console.log(`Date ${formattedStartDate.toString()} ${selectedStartTime} - ${formattedEndDate?.toString()} ${selectedEndTime} GMT+0200`);
//     };

//     console.log("Selected Start Time:", selectedTime.startTime);
//     console.log("Selected End Time:", selectedTime.endTime);

//     const startHour = 9;
//     const endHour = 18;

//     // Generate time options from 09:00 to 18:00
//     const timeOptions = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
//         const hour = startHour + i;
//         return {
//             value: `${hour < 10 ? "0" : ""}${hour}:00`,
//             label: `${hour < 10 ? "0" : ""}${hour}:00`,
//         };
//     });

//     // Generate end time options based on the selected start time
//     const disabledEndTimes = timeOptions.map((option) => option.value).filter((value) => value <= selectedTime.startTime);

//     const endTimeOptions = timeOptions.map((option) => ({
//         ...option,
//         isDisabled: disabledEndTimes.includes(option.value),
//     }));

//     const dateRangePickerProps: DateRangePickerProps = {
//         onChange: handleDateChange,
//         showPreview: true,
//         moveRangeOnFirstSelection: false,
//         months: 1,
//         ranges: state,
//         direction: "horizontal",
//         showDateDisplay: false,
//         minDate: new Date(),
//         maxDate: maxDate,
//     };

//     return (
//         <div className="app-container">
//             <div className="calendar-container">
//                 <DateRangePicker {...dateRangePickerProps} />
//             </div>
//             <div className="time-picker-container">
//                 {state[0]?.startDate && state[0]?.endDate && state[0]?.startDate.toDateString() === state[0]?.endDate.toDateString() && (
//                     <div className="time-picker">
//                         <label>Start Time:</label>
//                         <Select
//                             options={timeOptions}
//                             value={{ value: selectedTime.startTime, label: selectedTime.startTime }}
//                             onChange={(selectedOption) => handleTimeChange(selectedOption, "startTime")}
//                             className="custom-time-picker"
//                         />
//                         <label>End Time:</label>
//                         <Select
//                             options={endTimeOptions}
//                             value={{ value: selectedTime.endTime, label: selectedTime.endTime }}
//                             onChange={(selectedOption) => handleTimeChange(selectedOption, "endTime")}
//                             className="custom-time-picker"
//                         />
//                     </div>
//                 )}
//             </div>
//             <div className="reservation-table">
//                 <h2>Reservations</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Start Date</th>
//                             <th>End Date</th>
//                             <th>Start Time</th>
//                             <th>End Time</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {reservations.map((reservation) => (
//                             <tr key={reservation.id}>
//                                 <td>{reservation.id}</td>
//                                 <td>{reservation.startDate.toString() || "N/A"}</td>
//                                 <td>{reservation.endDate?.toString() || "N/A"}</td>
//                                 <td>{reservation.startTime}</td>
//                                 <td>{reservation.endTime}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default App;

// App.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
};

export default App;
