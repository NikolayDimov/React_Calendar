// src/App.tsx
import React, { useState } from "react";
import { DateRangePicker, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./App.css";
import { addDays } from "date-fns";
// import "./CustomStyles.css"; // Import the custom styles

// Reservation interface
interface Reservation {
    id: number;
    startDate: Date;
    endDate: Date | null;
}

// DateRangePickerProps interface
interface DateRangePickerProps {
    onChange: (item: { [key: string]: DateRange }) => void;
    showPreview: boolean;
    moveRangeOnFirstSelection: boolean;
    months: number;
    ranges: DateRange[];
    direction: string;
    showDateDisplay: boolean;
    minDate: Date;
    maxDate?: Date | null | undefined;
}

const App: React.FC = () => {
    const [state, setState] = useState<DateRange[]>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: "selection",
        },
    ]);

    // Create an array of Reservation objects
    const reservations: Reservation[] = [{ id: 1, ...state[0] }];

    // Calculate maxDate
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 200); // 200 days later
    // console.log("maxDate:", maxDate); // Log maxDate

    // Use the new type/interface for the DateRangePicker component props
    const dateRangePickerProps: DateRangePickerProps = {
        onChange: (item) => setState([item.selection]),
        showPreview: true,
        moveRangeOnFirstSelection: false,
        months: 1,
        ranges: state,
        direction: "horizontal",
        showDateDisplay: false,
        minDate: new Date(), // Set a default value
        maxDate: maxDate,
    };

    console.log("startDate", state[0]?.startDate);
    console.log("endDate", state[0]?.endDate);

    return (
        <div className="app-container">
            <div className="calendar-container" style={{ color: "black" }}>
                {/* Pass the props to DateRangePicker */}
                <DateRangePicker {...dateRangePickerProps} />
            </div>
            <div className="reservation-table">
                <h2>Reservations</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
                                <td>{reservation.startDate.toString() || "N/A"}</td>
                                <td>{reservation.endDate?.toString() || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;

// Double calendar
// // App.tsx
// import React, { useState } from "react";
// import { DateRangePicker, DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import "./App.css";

// interface Reservation {
//     id: number;
//     startDate: Date;
//     endDate: Date | null;
// }

// const App: React.FC = () => {
//     const [state, setState] = useState({
//         selection: {
//             startDate: new Date(),
//             endDate: null as Date | null,
//             key: "selection",
//         },
//         compare: {
//             startDate: new Date(),
//             endDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days later
//             key: "compare",
//         },
//     });

//     const handleDateChange = (ranges: { [key: string]: DateRange }) => {
//         setState((prev) => ({
//             ...prev,
//             ...ranges,
//         }));
//     };

//     const reservations: Reservation[] = [
//         { id: 1, ...state.selection },
//         { id: 2, ...state.compare },
//     ];

//     return (
//         <div className="app-container">
//             <div className="calendar-container">
//                 <DateRangePicker
//                     onChange={handleDateChange}
//                     months={1}
//                     minDate={new Date()}
//                     maxDate={new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)} // 30 days later
//                     direction="vertical"
//                     scroll={{ enabled: true }}
//                     ranges={[state.selection, state.compare]}
//                 />
//             </div>
//             <div className="reservation-table">
//                 <h2>Reservations</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Start Date</th>
//                             <th>End Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {reservations.map((reservation) => (
//                             <tr key={reservation.id}>
//                                 <td>{reservation.id}</td>
//                                 <td>{reservation.startDate.toString()}</td>
//                                 <td>{reservation.endDate?.toString() || "N/A"}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default App;
