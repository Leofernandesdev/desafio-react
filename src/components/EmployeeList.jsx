import React, { useState, useEffect, useRef } from "react"; // Importado useEffect e useRef
import { Plus } from "lucide-react";
import EmployeeCard from "./EmployeeCard";

// Adicionado as props onEditEmployee e onDeleteEmployee de volta
const EmployeeList = ({
  employees,
  onAddEmployeeClick,
  onEditEmployee,
  onDeleteEmployee,
  isStepCompleted,
  onToggleStepCompleted,
}) => {
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  // =============================================================
  // LÓGICA DO POP-UP RESTAURADA
  // =============================================================
  const [activeOptionsId, setActiveOptionsId] = useState(null);
  const listContainerRef = useRef(null);

  const validEmployees = Array.isArray(employees) ? employees : [];

  const filteredEmployees = showActiveOnly
    ? validEmployees.filter((emp) => emp && emp.status === "ativo")
    : validEmployees;

  const activeCount = validEmployees.filter(
    (emp) => emp && emp.status === "ativo"
  ).length;
  const totalCount = validEmployees.length;

  const handleOptionsClick = (employeeId) => {
    setActiveOptionsId((prevId) => (prevId === employeeId ? null : employeeId));
  };

  // Efeito para fechar o pop-up ao clicar fora da lista
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeOptionsId !== null &&
        listContainerRef.current &&
        !listContainerRef.current.contains(event.target)
      ) {
        setActiveOptionsId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeOptionsId]);

  return (
    <div className="w-full lg:flex-grow flex flex-col h-full rounded-2xl">
      <section className="bg-white rounded-2xl flex flex-col flex-grow card-shadow">
        <header className="bg-[#1976D2] p-5 rounded-t-2xl">
          <h1 className="text-2xl font-bold text-white">Funcionário(s)</h1>
        </header>

        <div className="flex-grow p-6">
          <button
            onClick={onAddEmployeeClick}
            className="w-full h-[56px] bg-white border border-[#1976D2] text-[#1976D2] text-base font-medium rounded-xl hover:bg-[#1976D2]/10 transition-colors flex items-center justify-center gap-2 mb-8"
          >
            <Plus className="w-4 h-4" />
            Adicionar Funcionário
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowActiveOnly(true)}
                className={`h-[48px] px-6 font-medium text-sm rounded-xl transition-colors flex items-center ${
                  !showActiveOnly
                    ? "bg-white border border-[#1976D2] text-[#1976D2] hover:bg-[#1976D2]/10"
                    : "bg-white border border-[#E0E0E0] text-[#757575] hover:bg-[#F5F5F5]"
                }`}
              >
                Ver apenas ativos
              </button>
              <button
                onClick={() => setShowActiveOnly(false)}
                className={`h-[48px] px-6 font-medium text-sm rounded-xl transition-colors flex items-center ${
                  showActiveOnly
                    ? "bg-white border border-[#1976D2] text-[#1976D2] hover:bg-[#1976D2]/10"
                    : "bg-white border border-[#E0E0E0] text-[#757575] hover:bg-[#F5F5F5]"
                }`}
              >
                Limpar filtros
              </button>
            </div>
            <span className="text-sm font-medium text-[#212121]">
              Ativos {activeCount}/{totalCount}
            </span>
          </div>

          {/* A ref foi adicionada aqui para a lógica de clicar fora */}
          <ul ref={listContainerRef} className="space-y-4 pt-4">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onOptionsClick={handleOptionsClick}
                isOptionsOpen={activeOptionsId === employee.id}
                onDelete={onDeleteEmployee}
                onEdit={onEditEmployee}
              />
            ))}
          </ul>
        </div>

        <div className="p-6  flex items-center justify-end rounded-b-2xl">
          <div className="flex items-center gap-4">
            <span className="font-sans text-[#757575] font-medium">
              A etapa está concluída?
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isStepCompleted}
                onChange={(e) => onToggleStepCompleted(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-20 h-8 bg-[#E0E0E0] rounded-full flex items-center justify-between px-2 text-xs font-bold peer-checked:bg-[#E0E0E0] transition-colors">
                <span
                  className={
                    isStepCompleted ? "text-[#212121]" : "text-transparent"
                  }
                >
                  Sim
                </span>
                <span
                  className={
                    !isStepCompleted ? "text-[#212121]" : "text-transparent"
                  }
                >
                  Não
                </span>
              </div>
              <div className="absolute top-1 left-1 w-6 h-6 bg-[#1976D2] rounded-full shadow-md transition-transform peer-checked:translate-x-12"></div>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeList;
