import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import SupplyChainPhoto from '../../media/form2.png'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import Button from '../common/button/Button'
import Input from '../../components/common/input/Input'
import requestParticipation from './requestParticipation.css';
import getEntitiesBySupplyChainId  from '../../APIcalls/CreateSupplyChain/getEntitiesBySupplyChainId';
import getEntityData  from '../../APIcalls/CreateSupplyChain/getEntityData';
import getMySupplyChains from '../../APIcalls/CreateSupplyChain/getMySupplyChains';
import enrollRequest from '../../APIcalls/CreateSupplyChain/enrollRequest';

function RequestParticipation({selectedSupplyChain}) {
    let history = useHistory();
    const [ethAdd, setEthAdd] = useState('');
    const [entityId, setEntityId] = useState('');
    const [selectedEntityId, setSelectedEntityId] = useState({
        id: 0,
        name:'Select Entity'
    });
    const [entities, setEntities] = useState([]);
    const [entityData, setEntityData] = useState([]);
    const [inputField, setInputField] = useState({});
    const [mySupplyChains, setMySupplyChains] = useState([]);
    const [mySelectedSupplyChainId, setMySelectedSupplyChainId] = useState('');
    const [mySelectedSupplyChain ,setMySelectedSupplyChain] = useState({
        id: 0
    })
    const [mySupplyChainEntities, setMySupplyChainEntities] = useState([]);
    const [mySelectedEntityId, setMySelectedEntityId] = useState('')
    const [mySelectedEntity, setMySelectedEntity] = useState({
        id: 0
    })
    
    useEffect(() => {
        getEntitiesBySupplyChainId(selectedSupplyChain).then(res => {
            setEntities(res.data);
        })
    },[])

    useEffect(() => {
        console.log(entityId);
        getEntityData(entityId).then(res => {
            setEntityData(res.data);
        })
    },[selectedEntityId])

    useEffect(() => {
        getMySupplyChains().then(res => {
            setMySupplyChains(res.data);
        })
    },[])

    useEffect(() => {
        console.log(mySelectedSupplyChainId);
        getEntitiesBySupplyChainId(mySelectedSupplyChainId).then(res => {
            setMySupplyChainEntities(res.data);
        })
    } ,[mySelectedSupplyChain])

    const handleInput = (e, id, index) => {
        e.preventDefault();
        setInputField({...inputField, [id]: e.target.value});
    }

    const handleChange = (event) => {
        setEntityId(event.target.value);  
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("eth_add", ethAdd);
        let finalEntityData = [];
        Object.entries(inputField).map(([key, value]) => {
                        return(
                            finalEntityData.push({data: value, generic_attribute: key})
                        )
        })
        let sendData = {
            ethereum_address: ethAdd,
            generic_attribute_data: finalEntityData,
            name: selectedEntityId.entity_name,
            entity: selectedEntityId.id,
            connected_supply_chain: mySelectedSupplyChain.id,
            connecting_entity: mySelectedEntity.id
        }

        console.log(sendData);
        enrollRequest(sendData).then(res => {
            if(!res){
                alert("Enter all details");
            }
            else{
                history.push('/dashboard/enrolledsupplychains'); 
            }
        })
    }

    return (
        <div className='supply-chain'>
            <div className='picture'>
                <img src={SupplyChainPhoto} alt='' width="350" height="200" />
            </div>
            <div className='content'>
                
                <div className='input-text'>
                <Box sx={{ minWidth: 300 }}>
                    <FormControl fullWidth>
                        <TextField
                            required
                            label='Ethereum Address' 
                            style={{ width: '300px'}} 
                            id="outlined-required"
                            onChange={e => setEthAdd(e.target.value)}
                        />
                    </FormControl>
                </Box>  
                </div>

                <div className='select-box'>
                    <Box sx={{ minWidth: 300 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                            <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="role"
                                value={selectedEntityId.id}
                                label="Select Role"
                                onChange={(e)=>{
                                    handleChange(e);
                                    setSelectedEntityId(entities.filter(entity => entity.id === e.target.value)[0]);
                                }}
                                >
                                {entities.map(entity => {
                                    return (
                                        <MenuItem value={entity.id} key={entity.id}>
                                            {entity.entity_name}
                                        </MenuItem>
                                    )     
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </div>

                {entityData.generic_attributes && entityData.generic_attributes.map((attribute, index) => {
                    return(
                        <div className="enroll__formgroup" key={attribute.id}>
                        <TextField
                            required
                            name={attribute.name}
                            label={attribute.name}
                            className="enroll__input"
                            placeholder={attribute.name}
                            onChange={(e) => {
                                handleInput(e, attribute.id, index);
                            }}
                        />
                    </div>
                    )
                })}
                <div className='select-box'>
                    <Box sx={{ minWidth: 300 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select your supply chain to connect</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={mySelectedSupplyChain.id}
                                label="Select your supply chain to connect"
                                onChange={(e)=>{
                                    setMySelectedSupplyChainId(e.target.value);
                                    setMySelectedSupplyChain(mySupplyChains.filter(supplyChain => supplyChain.id === e.target.value)[0])    
                                }}
                            >
                            {mySupplyChains.map(supplyChain => {
                                return (
                                    <MenuItem value={supplyChain.id} key={supplyChain.id}>
                                        {supplyChain.name}
                                    </MenuItem>
                                )     
                            })} 
                            </Select>
                        </FormControl>
                    </Box>
                </div>

                <div className='select-box'>
                    <Box sx={{ minWidth: 300 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select the entity to connect</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={mySelectedEntity.id}
                                label="Select the entity to connect"
                                onChange={(e)=>{
                                    setMySelectedEntityId(e.target.value);
                                    setMySelectedEntity(mySupplyChainEntities.filter(entity => entity.id === e.target.value)[0])
                                }}
                            >
                                {mySupplyChainEntities.map(entity => {
                                    return (
                                        <MenuItem value={entity.id} key={entity.id}>
                                            {entity.entity_name}
                                        </MenuItem>
                                    )     
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className='select-btn'>
                    <Button text='Request Participation' onClick = {handleSubmit} style={{width: '200px'}} />
                </div>
            </div>
        </div>
    );
}

export default RequestParticipation;