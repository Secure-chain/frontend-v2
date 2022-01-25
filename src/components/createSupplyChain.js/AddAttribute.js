import React, {useState,useEffect} from 'react';
import axios from 'axios';
import * as IoIcons from 'react-icons/io'
import * as GrIcons from 'react-icons/gr'
import './EntityCreation.css';

export const AttributeInput = ({initialName, initialType, index, AddFields, RemoveFields, length, trigger}) => {
    const [name, setName] = useState(initialName);
    const [type, setType] = useState(initialType);
  
    const handleAddFields  = () => {
      AddFields(name, type, index)
    }
    useEffect(() => {
      setName(initialName)
      setType(initialType)
    },[trigger])

    return(
      <div className='attributes'>
        <div className='attributeName'>
          <h3>Attribute Name</h3>
          <input value={name} type = {'text'} onChange = {e => setName(e.target.value)}></input>
        </div>
        <div>
          <h3>Attribute Type</h3>
          <select onChange = {e => setType (e.target.value)}>
            <option value="none" selected disabled hidden>Select an Option</option>
          </select>
        </div>
        <div className='icons'>
          <div className='iconDelete'>
            <GrIcons.GrSubtractCircle disabled={length === 1} onClick={()=>RemoveFields(index)}/>
          </div>
          {index === length - 1?
          <div className='iconAdd'>
            <IoIcons.IoIosAddCircleOutline onClick={handleAddFields}/>
          </div>
          :null}
        </div>
      </div>
    )
  }