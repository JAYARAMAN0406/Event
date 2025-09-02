import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


interface DateFieldProps {
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  required?: boolean;
  disablePast?: boolean;
}

export function Dates({
  label,
  value,
  onChange,
  required,
  disablePast,
}: DateFieldProps) {
  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      disablePast={disablePast}
      slotProps={{
        textField: {
          variant: "standard",
          required,
          fullWidth: true,
        },
      }}
    />
    </LocalizationProvider>
  );
}
