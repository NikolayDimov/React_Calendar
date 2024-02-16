declare module "react-date-range" {
    export interface DateRange {
        startDate: Date;
        endDate: Date | null;
        key: string;
    }

    export interface DateRangePickerProps {
        onChange: (ranges: { [key: string]: DateRange }) => void;
        months: number;
        minDate: string | number | Date;
        maxDate?: string | number | Date | null;
        direction?: string;
        scroll?: { enabled: boolean };
        ranges: DateRange[];
    }

    const DateRangePicker: React.ComponentType<DateRangePickerProps>;

    export { DateRangePicker };
}
