"use client"
import Link from "next/link"
import { useSidebar } from "@/contexts/sidebar/sidebar.context"
import { menus } from "@/routes"

const Sidebar = () => {
  const { isExpanded } = useSidebar()

  return (
    <div
      className={`h-screen bg-white shadow-md flex flex-col transition-all duration-300 ${
        isExpanded ? "w-64" : "fit-content"
      }`}
    >
      <nav className="flex-grow mt-4 px-2">
        <ul className="space-y-2">
          {menus.map(({ icon: Icon, link, title }) => (
            <li key={title}>
              <Link
                href={link}
                className="flex items-center gap-3 px-4 py-2 hover:bg-slate-200 rounded"
              >
                <Icon size={20} />
                <span
                  className={`transition-opacity ${
                    isExpanded ? "opacity-100" : "hidden"
                  }`}
                >
                  {title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
