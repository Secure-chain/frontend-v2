import React, {useState,useEffect} from 'react';
import axios from 'axios';
import * as IoIcons from 'react-icons/io'
import * as GrIcons from 'react-icons/gr'
import './EntityCreation.css';
import Playground from '../playground/Playground';
import Button from '../common/button/Button';
import {AttributeInput} from './AddAttribute';
function EntityCreation() {
  const [entityName, setEntityName] = useState('')
  const [entityList, setEntityList] = useState([])
  const [inputFields,setInputFields] = useState([{
    name: '',
    type: '',
  }])
  const [trigger, setTrigger] = useState(false)
  const [template, setTemplate] = useState({options : []})
  const handleAddFields = (name, type) => {
    // inputFields.push({name:name, type:type});
    let temp = [...inputFields];
    temp[temp.length - 1].name = name;
    temp[temp.length - 1].type = type;
    temp.push({name: '', type: ''});
    setInputFields(temp);
  }
  const triggerRender = () => {
    setTrigger(!trigger)
  }
  const handleRemoveFields = (index) => {
    // console.log('in handleremove', inputFields)
    let newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    triggerRender();
    console.log(newInputFields)
    setInputFields(newInputFields);
  }
  useEffect(() => {
    let token = localStorage.getItem("token")
    axios.get("https://securechain-backend.herokuapp.com/template/",{
        headers: {
            Authorization: `Token ${token}`,
        }
    }).then((res) => {
        // console.log('api response 🚀', res)
        setTemplate({
            options:res.data.map(d => ({
                "value" : d.id,
                "label" : d.template_name,
                "attributes" : d.attributes
              }))
        })
        // console.log(JSON.stringify(res.data.attributes, null, 4));
    })
    .catch((error) => {
        console.error(error.response)
    });
  },[]);

  const handleSubmit = () => {
    setEntityList(entityList => 
      [...entityList,entityName]);
    console.log(entityList);
  }


  return (
    <div className='entityCreationTop'>
      <form className='entityCreation'>
        <h1>Entity Creation</h1>
        <div className='formTop'>
          <div className='formInput'>
            <h2>Entity Name</h2>
            <input type={'text'} onChange={e=> setEntityName(e.target.value)}></input>
          </div>

          <div className='formDropdown'>
            <h2>Select Template</h2>
            <select>
            <option value="none" selected disabled hidden>Select an Option</option>
              {
                  template.options.map((x,index)=>{
                  return(
                  <option key={index} value = {x.value}>{x.label}</option>);
                })
              }
            </select>
          </div>
        </div>

        <div className='formBottom'>
          <div className='addAttributes'>
            <h2>Add Attributes</h2>
            {inputFields.map((a, index) =>{
              return (
                <AttributeInput key={index} initialName = {a.name} initialType={a.type} index = {index} AddFields = {handleAddFields}  RemoveFields = {handleRemoveFields} length = {inputFields.length} trigger={trigger}/>
                )
              })
            }
          </div>

          <div className='defaultAttributes'>
            <h2>Default Attributes</h2>
          </div>
        </div>
      </form>
      <div className='entityCreationBtn'>
        <Button text = {'Add Entity'} onClick={handleSubmit}> </Button>
      </div>
      <div className='create-entity-playground'>
          <Playground style={{width:'100%',height:'200px'}}/>
        </div>
      
    </div>
  );
}

export default EntityCreation;
