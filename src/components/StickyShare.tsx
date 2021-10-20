import React, { useState } from "react";
import SocialShare from "./SocialShare";
import Share from '../assets/svg/share.svg';
import "./styles/Share.less"

const StickyShare = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`socialWrapper ${isOpen ? 'open' : ''}`}
      >
        {isOpen && (
          <div className="backgroundToggle" onClick={() => setIsOpen(!isOpen)}></div>
        )}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='chevron'
      >
        {isOpen && (
          <SocialShare />
        )}
      </div>
    </div>
  );
}

export default StickyShare as any;