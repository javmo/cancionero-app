import React, { useState } from 'react';
import TitleStep from './TitleStep';
import LyricsStep from './LyricsStep';
import PreviewStep from './PreviewStep';
import ProgressBar from './ProgressBar';

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

  const goNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const goPrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const handleDataChange = (newData) => setSongData({ ...songData, ...newData });

  const CurrentStepComponent = steps[currentStep];

  return (
    <div className="wizard-container mx-auto my-10 p-4 bg-white shadow-lg rounded-lg max-w-4xl">
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
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
