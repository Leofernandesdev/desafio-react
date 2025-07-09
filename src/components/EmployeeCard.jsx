import React from "react";
import { MoreHorizontal } from "lucide-react";

const EmployeeCard = ({
  employee,
  onOptionsClick,
  isOptionsOpen,
  onDelete,
  onEdit,
}) => {
  const backgroundColor =
    employee.status === "ativo" ? "bg-blue-50" : "bg-white";

  return (
    <li
      className={`relative rounded-2xl flex items-stretch overflow-visible ${backgroundColor} h-[80px] border border-[#E0E0E0] ${
        isOptionsOpen ? "z-10" : ""
      }`}
    >
      <div className="flex-grow p-6 flex flex-col justify-center">
        <h3 className="text-2xl font-medium text-[#212121] mb-2">
          {employee.name}
        </h3>
        <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
          <span className="px-3 py-1 bg-[#1976D2] text-white text-sm font-medium rounded-full">
            {employee.cpf}
          </span>
          <span className="px-3 py-1 bg-[#1976D2] text-white text-sm font-medium rounded-full">
            {employee.status === "ativo" ? "Ativo" : "Inativo"}
          </span>
          <span className="px-3 py-1 bg-[#1976D2] text-white text-sm font-medium rounded-full">
            {employee.position}
          </span>
        </div>
      </div>

      <div className="bg-[#1976D2] flex items-center justify-center px-4 w-[56px] rounded-r-2xl">
        <button
          onClick={() => onOptionsClick(employee.id)}
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Mais opções"
        >
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {isOptionsOpen && (
        <div className="absolute inset-y-0 right-0 w-[120px] bg-white rounded-2xl shadow-lg border-l border-gray-200 flex flex-col z-20 overflow-hidden">
          <button
            onClick={() => {
              onEdit(employee);
              onOptionsClick(null);
            }}
            className="flex-1 w-full flex items-center justify-center text-sm text-[#757575] hover:bg-gray-100 hover:text-[#1976D2] border-b border-gray-200"
          >
            Alterar
          </button>

          <button
            onClick={() => {
              onDelete(employee.id);
              onOptionsClick(null);
            }}
            className="flex-1 w-full flex items-center justify-center text-sm text-[#757575] hover:bg-gray-100 hover:text-[#1976D2]"
          >
            Excluir
          </button>
        </div>
      )}
    </li>
  );
};

export default EmployeeCard;
