import React from 'react';
import './styles.scss';
import { ArrowRight } from '@carbon/icons-react';
import Link from 'next/link';

function OptionCard({ icon, title, description, href }) {
  return (
    <Link href={href}>
    <div className='option-card'>
      <div className='option-icon'>{icon}</div>
      <div className='option-info'>
        <div className='option-info-flex'>
          <div className='opt-title'>{title}</div>
          <div className='opt-description'>{description}</div>
        </div>
        <div className='arrow'><ArrowRight size={32} /></div>
      </div>
    </div></Link>
  );
}

export default OptionCard;
