export interface Reservation {
    id: number;
    startDate: Date | null;
    endDate: Date | null;
    startTime: string;
    endTime: string;
}

export interface ReservationTableProps {
    reservations: Reservation[];
}
