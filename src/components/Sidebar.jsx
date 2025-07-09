import React from "react";

import vectorIcon from "../assets/Vector.png";
import icone2 from "../assets/Icone 2.png";
import icone3 from "../assets/Icone 3.png";
import icone4 from "../assets/Icone 4.png";
import icone5 from "../assets/Icone 5.png";
import icone6 from "../assets/Icone 6.png";

const Sidebar = ({ activeItem, onItemClick }) => {
  const menuItems = [
    { id: "dashboard", icon: vectorIcon, label: "Dashboard" },
    { id: "users", icon: icone2, label: "Usuários" },
    { id: "orgchart", icon: icone3, label: "Organograma" },
    { id: "notifications", icon: icone4, label: "Notificações" },
    { id: "history", icon: icone5, label: "Histórico" },
    { id: "profile", icon: icone6, label: "Perfil" },
  ];

  return (
    <aside className="w-14 bg-[#1976D2] h-screen flex flex-col items-center sticky top-0">
      <nav className="pt-8">
        <ul className="flex flex-col items-center gap-y-6">
          {menuItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick(item.id)}
                  aria-label={item.label}
                  className={`p-3 rounded-lg transition-colors duration-200 ${
                    isActive ? "bg-black/20" : "hover:bg-black/10"
                  }`}
                >
                  <img src={item.icon} alt={item.label} className="w-6 h-6" />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
