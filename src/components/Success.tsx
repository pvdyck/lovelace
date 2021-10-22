import React from 'react';
import ReactDOM from 'react-dom';

import {
  mSuccess,
  mError
} from './styles/success.module.less';

interface Props {
  text: string,
  isError: boolean,
}

function Success(props: Props) {
  const className = props.isError ? mError : mSuccess;

  return (
    <div
      className={className}
      onClick={() => {
        ReactDOM.unmountComponentAtNode(div);
      }}
    >
      <div className={className + '__body'}>
        <p className={className + '__text'}>{props.text}</p>
      </div>
    </div>
  );
}
let div: any;
export function showSuccess(props: Props) {
  div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<Success {...props} />, div);
}

export function hideSuccess() {
  ReactDOM.unmountComponentAtNode(div);
}
