import React, { Component } from 'react';
import {
  toggleSwitch,
  toggleSwitchCheckbox,
  toggleSwitchLabel,
  toggleSwitchSwitch,
  toggleSwitchTextWrapper,
  toggleSwitchText
} from './styles/toggle-switch.module.less';

const ToggleSwitch = ({name, checked, onChange}) => {
  console.log(name, onChange)
  return (
    <div className={toggleSwitch}>
      <input
        type="checkbox"
        className={toggleSwitchCheckbox}
        name={name}
        id={name}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <label className={toggleSwitchLabel} htmlFor={name}>
        <span className={toggleSwitchTextWrapper}>
          <span className={toggleSwitchText}>Creator</span>
          <span className={toggleSwitchText}>fan</span>
        </span>
        <span className={toggleSwitchSwitch} />
      </label>
    </div>
  );
}

export default ToggleSwitch;