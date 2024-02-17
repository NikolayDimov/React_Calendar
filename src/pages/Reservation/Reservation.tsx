// Reservation.tsx
import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { StyledReservationTable } from "./Reservation.style";
import { ReservationTableProps } from "./Reservation.static";

const ReservationTable: React.FC<ReservationTableProps> = ({ reservations }) => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 200);

    return (
        <StyledReservationTable>
            <h2>Reservations</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{reservation.startDate.toString() || "N/A"}</td>
                            <td>{reservation.endDate?.toString() || "N/A"}</td>
                            <td>{reservation.startTime}</td>
                            <td>{reservation.endTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </StyledReservationTable>
    );
};

export default ReservationTable;
