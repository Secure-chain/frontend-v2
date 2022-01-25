import React, {useState,useEffect} from 'react';
import axios from 'axios';
import * as IoIcons from 'react-icons/io'
import * as GrIcons from 'react-icons/gr'
import './EntityCreation.css';
import { AttributeInput } from './AddAttribute';

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
  const [entityName, setEntityName] = useState('')
  let inputFields = [{name: '', type: '' }];
  const [template, setTemplate] = useState({options : []})

  const handleAddFields = (name, type) => {
    inputFields.push({name, type});
    console.log('in handleadd',inputFields)
  }

  const handleRemoveFields = (index) => {
    console.log('in handleremove', inputFields)
    inputFields.splice(index, 1);

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

  useEffect(()=>{
    console.log(inputFields)
  },[inputFields])
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
                  template.options.map((x)=>{
                  return(
                  <option value = {x.value}>{x.label}</option>);
                })
              }
            </select>
          </div>
        </div>

        <div className='formBottom'>
          <div className='addAttributes'>
            <h2>Add Attributes</h2>
            {inputFields.map((a, index) =>{
              console.log(a);
              return (<AttributeInput initialName = {a.name} initialType={a.type} index = {index} AddFields = {handleAddFields}  RemoveFields = {handleRemoveFields} length = {inputFields.length}/>
                )
              })
            }
          </div>

          <div className='defaultAttributes'>
            <h2>Default Attributes</h2>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EntityCreation;
