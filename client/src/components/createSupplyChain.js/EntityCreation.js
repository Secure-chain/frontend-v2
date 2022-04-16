import React, {useState,useEffect} from 'react';
import axios from 'axios';
import * as IoIcons from 'react-icons/io'
import * as GrIcons from 'react-icons/gr'
import './EntityCreation.css';
import Playground from '../playground/Playground';
import Button from '../common/button/Button';
import {AttributeInput} from './AddAttribute';
import { postFlowArray } from '../../APIcalls/postFlowArray';
import { initObject } from '../initVariables/initObject';
import { getTemplate } from '../../APIcalls/getTemplate';
import { getTemplateById } from '../../APIcalls/getTemplateById';
import { useHistory } from "react-router-dom";
function EntityCreation({ supplyChain }) {
  const history = useHistory();
  let templateId = 0;
  const [formkey, setFormkey] = useState(2);
  const [entityName, setEntityName] = useState('')
  const [entityList, setEntityList] = useState([])
  const [inputFields,setInputFields] = useState([{
    name: '',
    type: '',
  }])
  const [flow, setFlow] = useState([])
  const [trigger, setTrigger] = useState(false)
  const [template, setTemplate] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState({id : 0, templateName : '', attributes : []});
  const [tempSelectedTemplate, setTempSelectedTemplate] = useState('');
  const [currentAttribute, setCurrentAttribute] = useState({});
  const handleAddFields = (name, type) => {
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
    let newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    triggerRender();
    console.log(newInputFields)
    setInputFields(newInputFields);
  }
 
  

  useEffect(() => {
    getTemplate().then(res => {
      setTemplate(res)
    })
  },[]);

  const handleTemplateChange = (e) => {
    let temp = (e.target.value);
    console.log(temp)
    getTemplateById(temp)
    .then(res => {
      let temp=[];
      res['attributes'].split(';').map(item => temp.push(JSON.parse(item)))
      res['attributes'] = temp;
      setSelectedTemplate(res)
      })
    }
    // to set current att name and type on submission 
    const setCurrAtt = (name, type) => {
      setCurrentAttribute({name, type})
    }

  const [i,setI] = useState(0);
//////////////////////////// handle submit of entity ////////////////////////
  const handleSubmit = (event, entityName) => {
    // include current attribute in the entity
    let temp = inputFields.filter(item => item.name !== ''&& item.type !== '');
    temp.push(currentAttribute);
    let payload = {
      entity_name : entityName,
      template : selectedTemplate.id,
      generic_attributes : temp,
      supply_chain : supplyChain.id
    }
    // axios.post(`https://securechain.pythonanywhere.com/entity/`, payload,
    //   {
    //     headers: {
    //         Authorization: `Token ${initObject().token}`,
    //     }
    //   }).then((res) => {
    //       setEntityList([...entityList, { id : res.data.data.id, entity_name : res.data.data.entity_name}])
    //   }).catch((error) => {
    //       console.error(error.response)
    //   })
      setEntityList([...entityList, { id : i, entity_name : entityName}])
        setEntityName('')
        setInputFields([{
          name: '',
          type: '',
        }])
        setI(i+1);
        setFormkey(formkey + 1);
        setTrigger(!trigger);
  }

  /// callback for edge update of entities ( flow update )
  const handleFlowUpdate = (source, destination) => {
    let temp = [...flow];
    // remove duplicate data from temp
    temp = temp.filter(e => e.source !== source || e.destination !== destination);
    temp.push({source: source, destination: destination});
    setFlow(temp);
  }

/// Submit flow data to backend
const handleSubmitFlow = () => {
  postFlowArray(flow)
  .then(res => {
    console.log(res)
    history.push('/dashboard/ownedsupplychains');
  })
  setFlow([]);
}
useEffect(() => {
  console.log(entityList)
},[entityList])
  return (
    <div className='entityCreationTop'>
      <form className='entityCreation' onSubmit={handleSubmit}>
        <h1>Entity Creation</h1>
        <div className='formTop'>
          <div className='formInput'>
            <h2>Entity Name </h2>
            <input type={'text'} onChange={e=> setEntityName(e.target.value)} value={entityName}></input>
          </div>

          <div className='formDropdown'>
            <h2>Select Template</h2>
            {/* {template.options && <select onChange={handleTemplate} >
            <option value="none" selected disabled hidden>Select an Option</option>
              {
                  template.options.map((x,index)=>{
                  return(
                  <option key={index} value = {x.value}>{x.label}</option>);
                })
              }
            </select>} */}
            {/* template dropdown  */}
            <select onChange={handleTemplateChange} >
              <option value="none" selected disabled hidden>Select an Option</option>
              {
                template?.map((x,index)=>{
                  return(
                    <option key={index} value = {x.id}>{x.template_name}</option>);
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
                <AttributeInput 
                  key={index} 
                  initialName = {a.name} 
                  initialType={a.type} 
                  index = {index} 
                  AddFields = {handleAddFields}  
                  RemoveFields = {handleRemoveFields} 
                  length = {inputFields.length} 
                  trigger={trigger}
                  setCurrAtt={setCurrAtt}
                />
                )
              })
            }
          </div>

          <div className='defaultAttributes'>
            <h2>Default Attributes</h2>
            {selectedTemplate.attributes && selectedTemplate.attributes.map((value, index) => {
              return (
                <div key={index} className='attributeDetails'>
                  <div>
                    <h3>{value.name}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </form>
      <div className='entityCreationBtn'>
        <Button text = {'Add Entity'} onClick={event => handleSubmit(event, entityName, tempSelectedTemplate)}> </Button>
      </div>
      <div className='create-entity-playground'>
        <Playground style={{width:'100%',height:'200px'}}  entityArray={entityList} handleFlowUpdate={handleFlowUpdate}/>
      </div>
      <div className='entityCreationBtn'>
        <Button text={'Save and Finish'} onClick={e => handleSubmitFlow()} />
      </div>
    </div>
  );
}

export default EntityCreation;