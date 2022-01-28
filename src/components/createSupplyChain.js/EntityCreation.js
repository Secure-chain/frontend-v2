import React from 'react';
import './EntityCreation.css';
import Playground from '../playground/Playground';
function EntityCreation() {
  return (
    <div className='entityCreationTop'>
      <form className='entityCreation'>
        <h1>Entity Creation</h1>
        <div className='formTop'>
          <div className='formInput'>
            <h2>Entity Name</h2>
            <input type={'text'}></input>
          </div>

          <div className='formDropdown'>
            <h2>Select Template</h2>
            <select>
            <option value="none" selected disabled hidden>Select an Option</option>
              {/* {
                  template.options.map((x)=>{
                  return(
                  <option value = {x.value}>{x.label}</option>);
                })
              } */}
            </select>
          </div>
        </div>

        <div className='formBottom'>
          <div className='addAttributes'>
            <h2>Add Attributes</h2>
            <div className='attributes'>
              <div className='attributeName'>
                <h3>Attribute Name</h3>
                <input type = {'text'}></input>
              </div>
              <div>
                <h3>Attribute Type</h3>
                <select>
                  <option value="none" selected disabled hidden>Select an Option</option>
                </select>
              </div>
            </div>
          </div>

          <div className='defaultAttributes'>
            <h2>Default Attributes</h2>
          </div>
        </div>
      </form>
      <div className='create-entity-playground'>
          <Playground style={{width:'80%',height:'200px'}}/>
        </div>
    </div>
  );
}

export default EntityCreation;
