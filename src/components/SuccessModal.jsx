import React from "react";
import { X } from "lucide-react";

const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl shadow-lg w-[564px] h-[134px] flex flex-col items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#757575] hover:text-[#212121]"
        >
          <X size={24} />
        </button>

        <p className="text-xl font-medium text-[#212121] mb-6">{message}</p>

        <button
          onClick={onClose}
          className="bg-[#1976D2] text-white font-bold text-sm py-2 px-12 rounded-lg hover:bg-blue-800 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
