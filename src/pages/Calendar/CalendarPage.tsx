// CalendarPage.tsx
import React from "react";
import { DateRangePicker } from "react-date-range";
import Select from "react-select";
import { CalendarContainer, StyledAppContainer, StyledCalendarContainer, StyledTimePicker, StyledTimePickerContainer } from "./Calendar.style";
import { useCalendar } from "./Calendar.logic";
import { Reservation } from "../Reservation/Reservation.static";

const CalendarPage: React.FC<{ reservations: Reservation[]; onAddReservation: (newReservation: Reservation) => void }> = ({ reservations, onAddReservation }) => {
    const { state, selectedTime, handleTimeChange, handleMakeReservation, timeOptions, endTimeOptions, dateRangePickerProps } = useCalendar(reservations, onAddReservation);

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
