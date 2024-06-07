import React from 'react';
import './styles.scss';
import BackButton from '../../../components/Button/back';
import TitlePanel from '../../../components/TitlePanel';

function MedicationHub({ handleBackToDashboard }) {
  return (
    <div className='medications-hub'>
      <TitlePanel>
        <BackButton onClick={handleBackToDashboard} />
      </TitlePanel>
      <div>
        <h2>Your Medication</h2>
        <p>Here is the detailed information about your medication...</p>
      </div>
    </div>
  );
}

export default MedicationHub;
