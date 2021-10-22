import React from 'react';
import ReactDOM from 'react-dom';

import './styles/success.module.less';

interface Props {
  text: string,
  isError: boolean,
}

function Success(props: Props) {
  const className = props.isError ? 'm-error' : 'm-success';

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

const div = document.createElement('div');
document.body.appendChild(div);

export function showSuccess(props: Props) {
  ReactDOM.render(<Success {...props} />, div);
}

export function hideSuccess() {
  ReactDOM.unmountComponentAtNode(div);
}
