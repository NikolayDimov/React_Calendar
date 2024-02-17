import { DateRange } from "react-date-range";

export interface DateRangePickerProps {
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

export interface TimeOption {
    value: string;
    label: string;
}
