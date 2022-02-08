import styled from 'styled-components'
import React from 'react';
import SideNavItem from './SideNavItem';
import SideNavSubclass from './SideNavSubclass';

function SideNav() {

  const SideBarNav = styled.nav`
    background: #ffffff;
    width: 25%;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    transition: 350ms;
    z-index: 10;
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 33px;
    font-color: #0F52BA;
    box-shadow: 5px 1px 12px -8px rgba(114,114,114,0.80);
    padding-top:51px;
    ${'' /* margin-top:55px; */}
  `;

  const SideBarWrap = styled.div`
    width : 100%;
    color: #0F52BA;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  `;
  
  return <>
    <SideBarNav>
      <SideBarWrap>
        {SideNavItem.map((item, index)=>{
          return <SideNavSubclass item = {item} key = {index} />
        })}
      </SideBarWrap>
    </SideBarNav>
  </>;
}

export default SideNav;
