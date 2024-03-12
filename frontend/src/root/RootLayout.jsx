import Sidebar from "../components/Sidebar";
import TopNavBar from "../components/TopNavBar";
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <div className="">
      <TopNavBar />
      <Sidebar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
    </div>
  )
}

export default RootLayout