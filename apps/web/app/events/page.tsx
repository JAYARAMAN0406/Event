'use client'

import Link from "next/link";
import { Buttons } from "@repo/ui/Buttons";
import { TextFields } from "@repo/ui/Textfields";
import { Dates } from "@repo/ui/Dates";
import { useUserStore } from "@repo/ui/Store";
import { useForm, Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ReusableTable } from "@repo/ui/ReusableTable";

interface FormValues {
  eventName: string;
  eventDate: Dayjs | null;
}

export default function EventPage() {
   const { eventsList, addEvent } = useUserStore();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      eventName: "",
      eventDate: null,
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!data.eventName || !data.eventDate) return;
    addEvent(data.eventName, dayjs(data.eventDate));
    reset({ eventName: "", eventDate: null });
  };


 const columns = [
  { key: "name", label: "Event Name" },
  { key: "date", label: "Event Date" },
];

 const handleDelete = (id: string | number) => {
  const strId = id.toString();
  
  useUserStore.setState((state) => ({
    eventsList: state.eventsList.filter((_, index) => index.toString() !== strId),
  }));
};


  const tableData = eventsList.map((event, index) => ({
    id: index.toString(),
    name: event.name,
    date: new Date(event.date).toLocaleDateString(),
  }));


  return (
    <div>
      <div className="flex flex-auto">
        <h1 className="text-fuchsia-800 font-bold text-2xl w-full">Event Page</h1>
        <div className="flex justify-end w-full mt-3">
  <Link href="/" className="text-blue-500 hover:underline">
    Home Page
  </Link>
</div>

      </div>

      <div>
        <h1 className="text-teal-400 font-bold text-2xl mt-5">Add Event</h1>
     
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2 space-y-4">
            <Controller
              name="eventName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextFields
                  label="Event Title"
                  name="eventName"
                  value={field.value ? String(field.value) : ""}
                  onChange={field.onChange}
                  required
                />
              )}
            />
 <div className="mt-2 space-y-4">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
  <Controller
    name="eventDate"
    control={control}
    rules={{ required: true }}
    render={({ field }) => (
      <Dates
        label="Event Date"
        value={field.value}
        onChange={field.onChange}
      />
    )}
  />
</LocalizationProvider>
</div>
<div className="flex justify-center mt-4">
            <Buttons type="submit" label="Submit" />
            </div>
          </div>
        </form>

        <br />
          <h1 className="text-fuchsia-800 font-bold text-2xl">Event List</h1>
      <div className="mt-5">
               <ReusableTable columns={columns} data={tableData} onDelete={handleDelete} />
             
           </div>
  
      
      </div>
    </div>
  );
}
