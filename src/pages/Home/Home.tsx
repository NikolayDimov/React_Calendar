// Home.tsx
import React, { useState } from "react";
import CalendarPage from "../Calendar/CalendarPage";
import ReservationTable from "../Reservation/Reservation";
import { Reservation } from "../Reservation/Reservation.static";
import { HomeContainer } from "./Home.style";

const Home: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const addReservation = (newReservation: Reservation) => {
        setReservations((prevReservations) => [...prevReservations, newReservation]);
    };

    return (
        <HomeContainer>
            <h1>Welcome to the Home Page</h1>
            <CalendarPage reservations={reservations} onAddReservation={addReservation} />
            <ReservationTable reservations={reservations} />
        </HomeContainer>
    );
};

export default Home;
