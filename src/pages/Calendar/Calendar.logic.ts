// Calendar.logic.ts
import { useState } from "react";
import { addDays } from "date-fns";
import { Reservation } from "../Reservation/Reservation.static";
import { DateRange } from "react-date-range";
import { DateRangePickerProps } from "./Calendar.static";

export const useCalendar = (reservations: Reservation[], onAddReservation: (newReservation: Reservation) => void) => {
    const [state, setState] = useState<DateRange[]>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: "selection",
        },
    ]);

    const [selectedTime, setSelectedTime] = useState({
        startTime: "09:00",
        endTime: "18:00",
    });

    const handleTimeChange = (selectedOption: { value: string; label: string }, type: "startTime" | "endTime") => {
        const time = selectedOption.value;
        setSelectedTime((prev) => ({
            ...prev,
            [type]: time,
        }));
    };

    const handleMakeReservation = () => {
        const selectedStartTime = selectedTime.startTime;
        const selectedEndTime = selectedTime.endTime;
        const formattedStartDate = state[0]?.startDate ? new Date(state[0]?.startDate) : null;
        const formattedEndDate = state[0]?.endDate ? new Date(state[0]?.endDate) : null;

        if (formattedStartDate) {
            formattedStartDate.setHours(parseInt(selectedStartTime.split(":")[0], 10));
            formattedStartDate.setMinutes(parseInt(selectedStartTime.split(":")[1], 10));
        }

        if (formattedEndDate) {
            const newFormattedEndDate = new Date(formattedEndDate);
            newFormattedEndDate.setHours(parseInt(selectedEndTime.split(":")[0], 10));
            newFormattedEndDate.setMinutes(parseInt(selectedEndTime.split(":")[1], 10));
            const newEndDate = newFormattedEndDate;

            const newReservation: Reservation = {
                id: reservations.length + 1,
                startDate: formattedStartDate,
                endDate: newEndDate,
                ...selectedTime,
            };

            onAddReservation(newReservation);

            console.log(`Reservation made from ${formattedStartDate?.toString()} ${selectedStartTime} to ${newEndDate?.toString()} ${selectedEndTime} GMT+0200`);

            setState([
                {
                    startDate: formattedStartDate || new Date(),
                    endDate: newEndDate || new Date(),
                    key: "selection",
                },
            ]);
        }
    };

    const startHour = 9;
    const endHour = 18;

    const timeOptions = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
        const hour = startHour + i;
        return {
            value: `${hour < 10 ? "0" : ""}${hour}:00`,
            label: `${hour < 10 ? "0" : ""}${hour}:00`,
        };
    });

    const disabledEndTimes = timeOptions.map((option) => option.value).filter((value) => value <= selectedTime.startTime);

    const endTimeOptions = timeOptions.map((option) => ({
        ...option,
        isDisabled: disabledEndTimes.includes(option.value),
    }));

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 730); // User will see next 2 years

    const dateRangePickerProps: DateRangePickerProps = {
        onChange: (item) => setState([item.selection]),
        showPreview: true,
        moveRangeOnFirstSelection: false,
        months: 1,
        ranges: state,
        direction: "horizontal",
        showDateDisplay: false,
        minDate: new Date(),
        maxDate: maxDate,
    };

    return {
        state,
        selectedTime,
        handleTimeChange,
        handleMakeReservation,
        timeOptions,
        endTimeOptions,
        dateRangePickerProps,
    };
};
