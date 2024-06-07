import React from 'react';
import './styles.scss';
import BackButton from '../../../components/Button/back';
import TitlePanel from '../../../components/TitlePanel';

function NextAppointments({ handleBackToDashboard }) {
  return (
    <div className='appointments-hub'>
      <TitlePanel>
        <BackButton onClick={handleBackToDashboard} />
      </TitlePanel>
      <div>
        <h2>Next Appointment</h2>
        <p>Here are the details of your next appointment...</p>
      </div>
    </div>
  );
}

export default NextAppointments;
