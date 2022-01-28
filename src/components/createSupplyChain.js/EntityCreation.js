import React, {useState,useEffect} from 'react';
import axios from 'axios';
import * as IoIcons from 'react-icons/io'
import * as GrIcons from 'react-icons/gr'
import './EntityCreation.css';
import { AttributeInput } from './AddAttribute';
import Button from '../common/button/Button';

// const AttributeInput = ({initialName, initialType, index, AddFields, RemoveFields, length}) => {
//   const [name, setName] = useState(initialName);
//   const [type, setType] = useState(initialType);

//   const handleAddFields  = () => {
//     AddFields(name, type, index)
//   }

//   const handleRemoveFields = () => {
//     RemoveFields(index)
//   }
//   return(
//     <div className='attributes'>
//       <div className='attributeName'>
//         {console.log('hi' + index)}
//         <h3>Attribute Name</h3>
//         <input type = {'text'} onChange = {e => setName(e.target.value)}></input>
//       </div>
//       <div>
//         <h3>Attribute Type</h3>
//         <select onChange = {e => setType (e.target.value)}>
//           <option value="none" selected disabled hidden>Select an Option</option>
//         </select>
//       </div>
//       <div className='iconDelete'>
//         <GrIcons.GrSubtractCircle disabled={length === 1} onClick={()=>RemoveFields(index)}/>
//       </div>
//       {console.log(index, length)}
//       {index === length - 1?
//       <div className='iconAdd'>
//         <IoIcons.IoIosAddCircleOutline onClick={handleAddFields}/>
//       </div>
//       :null}
//     </div>
//   )
// }

function EntityCreation() {
  let templateId = 0;
  const [formkey, setFormkey] = useState(2);
  const [entityName, setEntityName] = useState('')
  const [entityList, setEntityList] = useState([])
  const [inputFields,setInputFields] = useState([{
    name: '',
    type: '',
  }])
  const [trigger, setTrigger] = useState(false)
  const [template, setTemplate] = useState({options : []})
  const [selectedTemplate, setSelectedTemplate] = useState({id : 0, templateName : '', attributes : []});
  const [tempSelectedTemplate, setTempSelectedTemplate] = useState('');
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

  const handleTemplate = (e) => {
    templateId = e.target.value;
    if (templateId !== 0){
      axios.get(`https://securechain-backend.herokuapp.com/template/${templateId}/`,{
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          }
      }).then((res) => {
        // console.log('api response 🚀', res)
        let attrList = [];
        attrList = res.data.attributes.split(';')
        let finalAttrList = [];
        attrList.map(e => {
          return finalAttrList.push(JSON.parse(e))
        })
        //console.log(finalAttrList);
        setSelectedTemplate({
          id : res.data.id,
          templateName : res.data.template_name,
          attributes : finalAttrList
        });
        // console.log(JSON.stringify(res.data.attributes, null, 4));
      }).catch((error) => {
          console.error(error.response)
      });
      setTempSelectedTemplate(templateId);
    }
  }

  const handleSubmit = (event, entityName, tempSelectedTemplate, inputFields) => {
    //console.log('handleSubmit ke andar');
    console.log(inputFields)
    event.preventDefault();
    let data = {
      entity_name : entityName,
      template_id : tempSelectedTemplate,
      attributes : inputFields
    }
    setEntityList(entityList => ([...entityList, entityName]))
    console.log(entityList);
    axios.post(`https://securechain-backend.herokuapp.com/entity/`, data,
      {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
      }).then((res) => {
        // console.log('api response 🚀', res)
      }).catch((error) => {
          console.error(error.response)
      })
        setEntityName('')
        setInputFields([{
          name: '',
          type: '',
        }])
        setTempSelectedTemplate('');
        setSelectedTemplate({id : 0, templateName : '', attributes : []});
        setFormkey(formkey + 1);
        setInputFields(
          [{name: '', type: ''}]
        )
        setTrigger(false);
        console.log(data);
  }


  return (
    <div className='entityCreationTop'>
      <form className='entityCreation' onSubmit={handleSubmit}>
        <h1>Entity Creation</h1>
        <div className='formTop'>
          <div className='formInput'>
            <h2>Entity Name</h2>
            <input type={'text'} onChange={e=> setEntityName(e.target.value)}></input>
          </div>

          <div className='formDropdown'>
            <h2>Select Template</h2>
            {template.options && <select onChange={handleTemplate} >
            <option value="none" selected disabled hidden>Select an Option</option>
              {
                  template.options.map((x,index)=>{
                  return(
                  <option key={index} value = {x.value}>{x.label}</option>);
                })
              }
            </select>}
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
            {selectedTemplate.attributes && selectedTemplate.attributes.map((value) => {
              return (
                <div className='attributeDetails'>
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
        <Button text = {'Add Entity'} onClick={event => handleSubmit(event, entityName, tempSelectedTemplate, inputFields)}> </Button>
      </div>
    </div>
  );
}

export default EntityCreation;