import React from 'react';
import './styles/Display.css';

const Display = ({ expression }) => {
  return (
    <div className="display-screen">
      <div className='formulaScreen'>
        {expression}
      </div>
      <div className='outputScreen'>
        {expression || "0"}
      </div>
    </div>
  );
};

export default Display;