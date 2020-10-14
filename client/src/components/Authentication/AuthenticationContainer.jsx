import React from 'react';

const AuthenticationContainer = ({ children, direction }) => {
  return (
    <>
      <div className={direction}>
        <div className='content'>{children}</div>
      </div>
    </>
  );
};

export default AuthenticationContainer;
