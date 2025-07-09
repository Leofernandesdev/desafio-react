import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Upload, Plus, Paperclip, Trash2 } from "lucide-react";

const AddEmployeeModal = ({ onClose, onSave, employeeToEdit }) => {
  const getInitialState = () => ({
    name: "",
    cpf: "",
    rg: "",
    birthDate: "",
    gender: "masculino",
    position: "",
    status: "ativo",
    useEpi: false,
    activities: [
      {
        id: Date.now(),
        activityName: "Atividade 1",
        epi: "Calçado de segurança",
        caNumber: "9356",
      },
    ],
  });
  const [formData, setFormData] = useState(getInitialState());
  const [healthCertificateFile, setHealthCertificateFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (employeeToEdit) {
      setFormData({ ...getInitialState(), ...employeeToEdit });
    }
  }, [employeeToEdit]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleStatusToggle = (e) => {
    const newStatus = e.target.checked ? "ativo" : "inativo";
    setFormData((prev) => ({ ...prev, status: newStatus }));
  };
  const handleActivityChange = (id, event) => {
    const { name, value } = event.target;
    const updatedActivities = formData.activities.map((activity) => {
      if (activity.id === id) {
        return { ...activity, [name]: value };
      }
      return activity;
    });
    setFormData((prev) => ({ ...prev, activities: updatedActivities }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHealthCertificateFile(file);
    }
  };
  const addActivity = () => {
    setFormData((prev) => ({
      ...prev,
      activities: [
        ...(prev.activities || []),
        { id: Date.now(), activityName: "", epi: "", caNumber: "" },
      ],
    }));
  };
  const removeActivity = (id) => {
    if (formData.activities.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.filter((activity) => activity.id !== id),
    }));
  };
  const handleSave = () => {
    onSave(formData);
  };

  const bluishBorder =
    "border border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/50";
  const actionButton = `w-full p-2 rounded-lg font-sans text-sm transition-colors ${bluishBorder} bg-white text-[#1976D2] hover:bg-[#1976D2] hover:text-white`;

  return (
    <main className="w-full lg:flex-grow flex flex-col h-full">
      <section className="bg-white rounded-lg shadow-lg overflow-hidden flex-grow flex flex-col">
        <div className="bg-[#1976D2] text-white p-4 flex items-center gap-3">
          <button
            onClick={onClose}
            className="hover:bg-black/10 p-1 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-medium">
            {employeeToEdit ? "Alterar Funcionário" : "Adicionar Funcionário"}
          </h2>
        </div>
        <div className="p-6 space-y-6 overflow-y-auto">
          <div className={`p-6 rounded-lg ${bluishBorder}`}>
            <div className="flex justify-between items-center h-[44px]">
              <span className="font-roboto font-medium text-base text-[#757575]">
                O trabalhador está ativo ou inativo?
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.status === "ativo"}
                  onChange={handleStatusToggle}
                  className="sr-only peer"
                />
                <div className="w-20 h-8 bg-[#E0E0E0] rounded-full flex items-center justify-between px-2 text-xs font-bold peer-checked:bg-[#E0E0E0] transition-colors">
                  <span
                    className={
                      formData.status === "ativo"
                        ? "text-transparent"
                        : "text-[#212121]"
                    }
                  >
                    Inativo
                  </span>
                  <span
                    className={
                      formData.status === "ativo"
                        ? "text-[#212121]"
                        : "text-transparent"
                    }
                  >
                    Ativo
                  </span>
                </div>
                <div
                  className={`absolute top-1 w-6 h-6 bg-[#1976D2] rounded-full shadow-md transition-transform ${
                    formData.status === "ativo" ? "translate-x-12" : "left-1"
                  }`}
                ></div>
              </label>
            </div>
          </div>

          <div className={`p-6 space-y-4 rounded-lg ${bluishBorder}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block font-roboto font-medium text-base text-[#757575] mb-1">
                  Nome
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded-md font-roboto text-base ${bluishBorder}`}
                  placeholder="Nome"
                />
              </div>
              <div>
                <label className="block font-roboto font-medium text-base text-[#757575] mb-1">
                  Sexo
                </label>
                <div className="flex gap-6 h-full items-center font-roboto text-base text-[#212121]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="feminino"
                      checked={formData.gender === "feminino"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Feminino
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="masculino"
                      checked={formData.gender === "masculino"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Masculino
                  </label>
                </div>
              </div>
              <div>
                <label className="block font-roboto font-medium text-base text-[#757575] mb-1">
                  CPF
                </label>
                <input
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded-md font-roboto text-base ${bluishBorder}`}
                  placeholder="Nome"
                />
              </div>
              <div>
                <label className="block font-roboto font-medium text-base text-[#757575] mb-1">
                  Data de Nascimento
                </label>
                <input
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded-md font-roboto text-base ${bluishBorder}`}
                  placeholder="Nome"
                />
              </div>
              <div>
                <label className="block font-roboto font-medium text-base text-[#757575] mb-1">
                  RG
                </label>
                <input
                  name="rg"
                  value={formData.rg}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded-md font-roboto text-base ${bluishBorder}`}
                  placeholder="Nome"
                />
              </div>
              <div>
                <label className="block font-roboto font-medium text-base text-[#757575] mb-1">
                  Cargo
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded-md font-roboto text-base ${bluishBorder} bg-white`}
                >
                  <option value="">Selecione um cargo</option>
                  <option value="Cargo 1">Cargo 1</option>
                  <option value="Cargo 2">Cargo 2</option>
                </select>
              </div>
            </div>
          </div>

          <div className={`p-6 space-y-4 rounded-lg ${bluishBorder}`}>
            <h3 className="font-medium text-lg text-[#212121]">
              Quais EPIs o trabalhador usa na atividade?
            </h3>
            <label className="flex items-center text-[#212121]">
              <input
                type="checkbox"
                name="useEpi"
                checked={formData.useEpi}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 rounded border-[#1976D2] text-[#1976D2] focus:ring-blue-300"
              />
              O trabalhador não usa EPI.
            </label>
            {!formData.useEpi && (
              <div className="space-y-4">
                {(formData.activities || []).map((activity) => (
                  <div
                    key={activity.id}
                    className={`p-4 space-y-4 rounded-lg ${bluishBorder}`}
                  >
                    <label className="block font-roboto font-medium text-base text-[#757575]">
                      Selecione a atividade:
                    </label>
                    <select
                      name="activityName"
                      value={activity.activityName}
                      onChange={(e) => handleActivityChange(activity.id, e)}
                      className={`w-full p-2 rounded-md font-roboto text-base ${bluishBorder} bg-white`}
                    >
                      <option value="">Selecione</option>
                      <option value="Atividade 1">Atividade 1</option>
                    </select>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-roboto font-medium text-base text-[#757575]">
                          Selecione o EPI:
                        </label>
                        <select
                          name="epi"
                          value={activity.epi}
                          onChange={(e) => handleActivityChange(activity.id, e)}
                          className={`w-full p-2 rounded-md font-roboto text-base ${bluishBorder} bg-white`}
                        >
                          <option value="">Selecione</option>
                          <option value="Calçado de segurança">
                            Calçado de segurança
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-roboto font-medium text-base text-[#757575]">
                          Informe o número do CA:
                        </label>
                        <input
                          name="caNumber"
                          value={activity.caNumber}
                          onChange={(e) => handleActivityChange(activity.id, e)}
                          className={`w-full p-2 rounded-md font-roboto text-base ${bluishBorder}`}
                        />
                      </div>
                      <div className="flex items-end">
                        <button type="button" className={actionButton}>
                          Adicionar EPI
                        </button>
                      </div>
                    </div>
                    {formData.activities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeActivity(activity.id)}
                        className={`${actionButton} text-red-500 border-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center gap-2`}
                      >
                        <Trash2 className="w-4 h-4" /> Excluir atividade
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addActivity}
                  className={`${actionButton} flex items-center justify-center gap-2`}
                >
                  <Plus className="w-4 h-4" /> Adicionar outra atividade
                </button>
              </div>
            )}
          </div>
          <div className={`p-6 space-y-4 rounded-lg ${bluishBorder}`}>
            <h3 className="font-medium text-lg text-[#212121]">
              Adicione Atestado de Saúde (opcional):
            </h3>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              className={`w-full p-3 flex items-center justify-between rounded-lg ${bluishBorder} bg-[#F5F5F5]}`}
            >
              <span className="text-[#757575] truncate pr-2">
                {healthCertificateFile
                  ? healthCertificateFile.name
                  : "Documento 1.png"}
              </span>
              <Paperclip className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className={`${actionButton} flex items-center justify-center gap-2`}
            >
              <Upload className="w-4 h-4" />
              {healthCertificateFile ? "Alterar arquivo" : "Selecionar arquivo"}
            </button>
          </div>
          <div className="pt-6">
            <button onClick={handleSave} className={actionButton}>
              Salvar
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddEmployeeModal;
