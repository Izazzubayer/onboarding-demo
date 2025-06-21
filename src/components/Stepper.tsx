import React from "react";

interface StepperProps {
  currentStep: number;
}

const steps = [
  { label: "Basic Info", sub: "Contact details" },
  { label: "Creative Needs", sub: "Project Requirements" },
  { label: "Confirmation", sub: "Book Consultation" },
];

const Stepper: React.FC<StepperProps> = ({ currentStep }) => (
  <div className="w-full flex flex-col items-center my-6 sm:my-12 px-1 sm:px-0">
    {/* Steps */}
    <div className="flex justify-between w-full max-w-xs sm:max-w-2xl gap-1 sm:gap-0 mb-6 sm:mb-8">
      {steps.map((step, idx) => (
        <div key={step.label} className="flex flex-col items-center w-1/3">
          <div className={`w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg font-bold text-base sm:text-lg mb-1 sm:mb-2
            ${currentStep === idx + 1 ? 'bg-green-600 text-white' : idx < currentStep - 1 ? 'bg-green-600/20 text-white/80' : 'bg-gray-200 text-gray-400'}`}
          >
            {idx + 1}
          </div>
          <div className={`text-center text-xs sm:text-base font-semibold ${currentStep === idx + 1 ? 'text-black' : 'text-black/20'}`}>{step.label}</div>
          <div className={`text-center text-[10px] sm:text-xs ${currentStep === idx + 1 ? 'text-black' : 'text-black/20'}`}>{step.sub}</div>
        </div>
      ))}
    </div>
    {/* Progress Bar */}
    <div className="w-full max-w-xs sm:max-w-2xl h-2 sm:h-3 bg-gray-200 rounded-full relative">
      <div
        className="h-2 sm:h-3 bg-green-600 rounded-full transition-all"
        style={{ width: `${(currentStep / steps.length) * 100}%` }}
      />
    </div>
  </div>
);

export default Stepper; 