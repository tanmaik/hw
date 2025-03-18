import Image from "next/image";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-8">{/* Add your main content here */}</main>
    </div>
  );
}
