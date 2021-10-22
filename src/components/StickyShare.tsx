import React, { useState } from "react";
import SocialShare from "./SocialShare";
import Share from '../assets/svg/share.svg';
import {
  socialWrapper,
  backgroundToggle,
  chevron,
  open
} from "./styles/social-share.module.less"

const StickyShare = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={[socialWrapper, isOpen ? open : []].join(' ')}
      >
        {isOpen && (
          <div className={backgroundToggle} onClick={() => setIsOpen(!isOpen)}></div>
        )}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={chevron}
      >
        {isOpen && (
          <SocialShare />
        )}
      </div>
    </div>
  );
}

export default StickyShare as any;