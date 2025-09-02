import Link from "next/link";



export default function Page() {
  return (
   <div>
      <h1 className="text-fuchsia-800 font-bold text-4xl">Mini Event Manager Page</h1>
    <Link href="/events" className="text-blue-500 hover:underline">
      Go to Event Page
    </Link>
   </div>
  );
}
