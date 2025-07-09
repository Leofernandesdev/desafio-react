import React from "react";
import "semantic-ui-css/semantic.min.css";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <div className="w-full overflow-x-auto">
        <div className="flex items-start justify-start min-w-max px-4">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center text-center flex-shrink-0 w-24">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 mb-2
                      ${
                        isCurrent || isCompleted
                          ? "bg-[#1976D2]"
                          : "bg-[#E0E0E0]"
                      }
                      ${
                        isCurrent
                          ? "border-2 border-[#212121]"
                          : "border-2 border-transparent"
                      }`}
                  >
                    <i
                      className={`building icon ${
                        isCurrent || isCompleted
                          ? "text-white"
                          : "text-[#757575]"
                      } text-2xl m-0`}
                    />
                  </div>

                  <div className="flex flex-col justify-start h-10">
                    <span
                      className={`text-xs transition-colors duration-300 whitespace-nowrap
                        ${
                          isCurrent
                            ? "text-[#1976D2] font-bold"
                            : "text-[#757575]"
                        }`}
                    >
                      {step.name}
                    </span>

                    {isCompleted && (
                      <span className="font-sans text-sm font-medium text-[#757575]">
                        Concluído
                      </span>
                    )}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-auto h-0.5 mx-2 mt-7">
                    <div
                      className={`w-full h-full border-t-2 border-dashed ${
                        isCompleted ? "border-[#1976D2]" : "border-[#E0E0E0]"
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
