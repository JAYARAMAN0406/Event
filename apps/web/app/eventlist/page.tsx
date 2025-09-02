'use client'

import Link from "next/link";
import { useUserStore } from "@repo/ui/Store";
import { ReusableTable } from "@repo/ui/ReusableTable";




export default function EventListPage() {
   const { eventsList } = useUserStore();

 


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
    <div className="mt-5">
      <div className="flex flex-auto space-x-8">
        <h1 className="text-fuchsia-800 font-bold text-4xl">Event List Page</h1>
        <Link href="/" className="text-blue-500 hover:underline mt-3">
          Home Page
        </Link>
      </div>

        <div className="mt-5">
          <ReusableTable columns={columns} data={tableData} onDelete={handleDelete} />
        
      </div>
    </div>
  );
}
