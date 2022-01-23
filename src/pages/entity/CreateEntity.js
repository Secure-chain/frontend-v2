import React from 'react';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Button from '../../components/common/button/Button';
function createEntity() {
  return (
  <div>
    <Header title='Create Entity' />
    <Content />
    {/* <Button text='Create Entity' onClick={() => {}} style={{marginTop: '20px'}} /> */}
  </div>
  );
}

export default createEntity;
