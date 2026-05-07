import { Sidebar } from "@/components/Sidebar";
import { Canvas } from "@/components/Canvas";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden antialiased">
      <Sidebar />
      <Canvas />
    </div>
  );
}
