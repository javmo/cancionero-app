import React, { useState } from 'react';
import TitleStep from './TitleStep'; // Asegúrate de que estas rutas sean correctas
import LyricsStep from './LyricsStep';
import PreviewStep from './PreviewStep';

const steps = [
  TitleStep,
  LyricsStep,
  PreviewStep,
];

const SongCreationWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [songData, setSongData] = useState({
    title: '',
    lyrics: '',
  });

  const goNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataChange = (newData) => {
    setSongData({ ...songData, ...newData });
  };

  // Asegúrate de que obtienes el componente actual basado en el paso en que te encuentras
  const CurrentStepComponent = steps[currentStep];

  return (
    <div className="wizard-container">
      <CurrentStepComponent 
        data={songData}
        onDataChange={handleDataChange}
        goNextStep={goNextStep}
        goPrevStep={goPrevStep}
      />
    </div>
  );
};

export default SongCreationWizard;
