// CalendarPage.tsx
import React, { useState } from "react";
import { DateRangePicker, DateRange } from "react-date-range";
import Select from "react-select";
import { addDays } from "date-fns";
import { Reservation } from "../Reservation/Reservation.static";
import { CalendarContainer, StyledAppContainer, StyledCalendarContainer, StyledTimePicker, StyledTimePickerContainer } from "./Calendar.style";
import { DateRangePickerProps } from "./Calendar.static";

const CalendarPage: React.FC<{ reservations: Reservation[]; onAddReservation: (newReservation: Reservation) => void }> = ({ reservations, onAddReservation }) => {
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

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 730); // User will see next 2 years

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
        const formattedStartDate = state[0]?.startDate;
        const formattedEndDate = state[0]?.endDate ? new Date(state[0]?.endDate) : null;

        if (formattedEndDate) {
            formattedEndDate.setHours(parseInt(selectedEndTime.split(":")[0], 10));
            formattedEndDate.setMinutes(parseInt(selectedEndTime.split(":")[1], 10));
        }

        const newStartDate = formattedStartDate || new Date();
        const newEndDate = formattedEndDate || null;

        const newReservation: Reservation = {
            id: reservations.length + 1,
            startDate: newStartDate,
            endDate: newEndDate,
            ...selectedTime,
        };

        onAddReservation(newReservation);

        console.log(`Reservation made from ${formattedStartDate?.toString()} ${selectedStartTime} to ${formattedEndDate?.toString()} ${selectedEndTime} GMT+0200`);

        setState([
            {
                startDate: newStartDate,
                endDate: newEndDate,
                key: "selection",
            },
        ]);
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

    return (
        <CalendarContainer>
            <StyledAppContainer>
                <StyledCalendarContainer>
                    <DateRangePicker {...dateRangePickerProps} />
                </StyledCalendarContainer>

                <StyledTimePickerContainer>
                    {state[0]?.startDate && (
                        <StyledTimePicker>
                            <label>Start Time:</label>
                            <Select
                                options={timeOptions}
                                value={selectedTime.startTime ? { value: selectedTime.startTime, label: selectedTime.startTime } : null}
                                onChange={(selectedOption) => handleTimeChange(selectedOption || { value: "", label: "" }, "startTime")}
                                className="custom-time-picker"
                            />
                            {state[0]?.endDate && (
                                <>
                                    <label>End Time:</label>
                                    <Select
                                        options={endTimeOptions.filter((option) => !option.isDisabled)}
                                        value={selectedTime.endTime ? { value: selectedTime.endTime, label: selectedTime.endTime } : null}
                                        onChange={(selectedOption) => handleTimeChange(selectedOption || { value: "", label: "" }, "endTime")}
                                        className="custom-time-picker"
                                    />
                                </>
                            )}
                        </StyledTimePicker>
                    )}
                </StyledTimePickerContainer>
            </StyledAppContainer>
            <button onClick={() => handleMakeReservation()}>Make Reservation</button>
        </CalendarContainer>
    );
};

export default CalendarPage;
