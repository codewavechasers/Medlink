import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from '@carbon/icons-react';
import './styles.scss';

function Faqs({ question, description }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='faq'>
      <div className='faq-header' onClick={toggleOpen}>
        <span>{question}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {isOpen && (
        <div className='faq-body'>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}

export default Faqs;
