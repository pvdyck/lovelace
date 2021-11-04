import React, { useState } from "react";
import SocialShare from "./SocialShare";
import Share from '../assets/svg/share.svg';
import {
  socialWrapper,
  chevron
} from "./styles/social-share.module.less"

const StickyShare = () => {  
  return (
    <div className={socialWrapper}>
      <SocialShare />
    </div>
  );
}

export default StickyShare as any;