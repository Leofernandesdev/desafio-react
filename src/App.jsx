import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import EmployeeList from './components/EmployeeList.jsx';
import AddEmployeeModal from './components/AddEmployeeModal.jsx';
import PlaceholderPage from './components/PlaceholderPage.jsx';
import Stepper from './components/Stepper.jsx';
import SuccessModal from './components/SuccessModal.jsx';

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('users');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [employees, setEmployees] = useState([
    { id: '1', name: 'Daniel Alves da Silva', cpf: '000.000.000-99', status: 'ativo', position: 'Cargo 1' },
    { id: '2', name: 'Giselle Torres Lopes', cpf: '000.000.000-88', status: 'inativo', position: 'Cargo 2' },
    { id: '3', name: 'Ana Bispo dos Santos', cpf: '000.000.000-99', status: 'inativo', position: 'Cargo 1' },
    { id: '4', name: 'Regina Elisa Souza', cpf: '000.000.000-99', status: 'ativo', position: 'Cargo 3' },
  ]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const stepperSteps = [
    { id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }, { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' }, { id: 5, name: 'Item 5' }, { id: 6, 'name': 'Item 6' },
    { id: 7, name: 'Item 7' }, { id: 8, name: 'Item 8' }, { id: 9, name: 'Item 9' },
  ];
  const [currentStep, setCurrentStep] = useState(1);

  const handleSaveEmployee = (employeeData) => {
    if (editingEmployee) {
      setEmployees(prev => prev.map(emp => emp.id === editingEmployee.id ? { ...emp, ...employeeData } : emp));
      setEditingEmployee(null);
    } else {
      const newEmployee = { ...employeeData, id: Date.now().toString() };
      setEmployees((prev) => [...prev, newEmployee]);
    }
    setShowAddModal(false);
    // Avança o passo apenas se estiver salvando um NOVO funcionário,
    // para não pular um passo ao simplesmente editar.
    if (!editingEmployee) {
      setIsStepCompleted(true);
      setCurrentStep(2);
    }
  };

  const handleDeleteEmployee = (employeeIdToDelete) => {
    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== employeeIdToDelete));
    setShowSuccessModal(true);
  };

  const handleEditClick = (employeeToEdit) => {
    setEditingEmployee(employeeToEdit);
    setShowAddModal(true);
  };
  
  const handleNextStep = () => { 
    if (currentStep < stepperSteps.length) { 
      if(currentStep === 1) {
        setIsStepCompleted(true);
      }
      setCurrentStep(currentStep + 1); 
    } 
  };
  
  const handlePreviousStep = () => { 
    if (currentStep > 1) { 
      setCurrentStep(currentStep - 1); 
    } 
  };


  const renderContent = () => {
    if (activeMenuItem !== 'users') {
      return <PlaceholderPage />;
    }

    if (currentStep > 1) {
      return <PlaceholderPage />;
    }

   
    if (showAddModal) {
      return (
        <AddEmployeeModal 
          key={editingEmployee ? editingEmployee.id : 'new'}
          onClose={() => { setShowAddModal(false); setEditingEmployee(null); }} 
          onSave={handleSaveEmployee}
          employeeToEdit={editingEmployee}
        />
      );
    }
    
    
    return (
      <EmployeeList
        employees={employees}
        onAddEmployeeClick={() => { setEditingEmployee(null); setShowAddModal(true); }}
        onEditEmployee={handleEditClick}
        onDeleteEmployee={handleDeleteEmployee}
        isStepCompleted={isStepCompleted}
        onToggleStepCompleted={setIsStepCompleted}
      />
    );
  };

  const isNextButtonDisabled = currentStep === 1 && !isStepCompleted;

  return (
    <div className="min-h-screen font-sans flex bg-[#F5F5F5]">
      <Sidebar activeItem={activeMenuItem} onItemClick={setActiveMenuItem} />
      {showSuccessModal && <SuccessModal message="Usuário excluído com sucesso!" onClose={() => setShowSuccessModal(false)}/>}
      <main className="flex-1 flex flex-col p-6 gap-6 overflow-hidden page-background">
        {activeMenuItem === 'users' && (<Stepper steps={stepperSteps} currentStep={currentStep} />)}
        
        <div className="flex flex-col lg:flex-row gap-8 flex-grow min-h-0">
          {activeMenuItem === 'users' && currentStep === 1 && <ProfileCard />}
          {renderContent()}
        </div>

        {activeMenuItem === 'users' && (
          <div className="w-full flex justify-between mt-auto pt-4">
            {currentStep > 1 ? (
              <button onClick={handlePreviousStep} className="bg-[#1976D2] text-white font-roboto font-bold text-sm w-[194px] h-[32px] flex items-center justify-center rounded-xl hover:bg-blue-800 transition-colors">
                Passo anterior
              </button>
            ) : ( <div></div> )}
            
            {currentStep < stepperSteps.length && (
               <button 
                 onClick={handleNextStep}
                 disabled={isNextButtonDisabled}
                 className={`w-[194px] h-[32px] flex items-center justify-center font-roboto font-bold text-sm rounded-xl transition-colors ${ isNextButtonDisabled ? 'bg-[#E0E0E0] text-[#757575] cursor-not-allowed' : 'bg-[#1976D2] hover:bg-blue-800 text-white' }`}
               >
                 Próximo passo
               </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;