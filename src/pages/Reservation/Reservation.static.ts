export interface Reservation {
    id: number;
    startDate: Date;
    endDate: Date | null;
    startTime: string;
    endTime: string;
}

export interface ReservationTableProps {
    reservations: Reservation[];
}
