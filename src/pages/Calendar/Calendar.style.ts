import styled from "styled-components";

export const CalendarContainer = styled.div`
    background-color: gray;
    text-align: center;
    padding: 20px;
    max-width: 600px;
`;

export const StyledAppContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    padding: 20px;
    background-color: gray;
    font-family: Arial, sans-serif;
`;

export const StyledCalendarContainer = styled.div`
    flex: 1;

    .rdrCalendarWrapper {
        border-radius: 6px;
        border: 1px solid #000000;
    }

    .rdrStaticRanges button {
        color: black !important;
    }

    .rdrDefinedRangesWrapper {
        display: none;
    }
`;

export const StyledTimePickerContainer = styled.div`
    flex: 2;
    display: flex;
    align-items: stretch;
`;

export const StyledTimePicker = styled.div`
    background-color: #ffffff;
    border: 1px solid #000000;
    border-radius: 6px;
    padding: 25px;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    .custom-time-picker {
        color: black;
    }
`;
