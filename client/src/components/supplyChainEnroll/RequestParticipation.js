import React, { useState, useEffect } from 'react'
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
import { getEntitiesBySupplyChainId } from '../../APIcalls/CreateSupplyChain/getEntitiesBySupplyChainId';
import { getEntityData } from '../../APIcalls/CreateSupplyChain/getEntityData';

function RequestParticipation({selectedSupplyChain}) {
    const [ethAdd, setEthAdd] = useState('');
    const [entityId, setEntityId] = useState('');
    const [entities, setEntities] = useState([]);
    const [entityData, setEntityData] = useState([]);
    const [inputField, setInputField] = useState({});

    useEffect(() => {
        getEntitiesBySupplyChainId(selectedSupplyChain).then(res => {
            setEntities(res.data);
        })
    },[])

    // useState(() => {
    //     getEntityData(entityId).then(res => {
    //         setEntityData(res.data);
    //     })
    // },[])



    const handleInput = (e, id, index) => {
        e.preventDefault();
        setInputField({...inputField, [id]: e.target.value});
    }

    const handleChange = (event) => {
        setEntityId(event.target.value);  
    }

    return (
        <div className='supply-chain'>
            <div className='picture'>
                <img src={SupplyChainPhoto} alt='' width="350" height="200" />
            </div>
            <div className='content'>

                <div className='input-text'>
                    <Input 
                        placeholder='Ethereum Address' 
                        style={{ width: '300px'}} 
                        required
                        onChange={e => setEthAdd(e.target.value)}/>
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
                                value=""
                                label="Role"
                                onChange={(e)=>handleChange(e)}
                            >
                                <MenuItem value="Choose">Choose</MenuItem>
                                {entities?.map(entity => {console.log('entity',entity);
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

                {/* {entityData.generic_attributes && entityData.generic_attributes.map((attribute, index) => {
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
                })} */}
                <div className='select-box'>
                    <Box sx={{ minWidth: 300 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select your supply chain to connect</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value=""
                                label="Age"
                                onChange={(e)=>handleChange(e)}
                            >
                                <MenuItem value={10}>Krishna Supply Chain</MenuItem>
                                <MenuItem value={20}>Akshat Supply Chain</MenuItem>
                                <MenuItem value={30}>Anuj Supply Chain</MenuItem>
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
                                value=""
                                label="Age"
                                onChange={(e)=>handleChange(e)}
                            >
                                <MenuItem value={10}>Krishna</MenuItem>
                                <MenuItem value={20}>Akshat</MenuItem>
                                <MenuItem value={30}>Anuj</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className='select-btn'>
                    <Button text='Request Participation' style={{width: '200px'}} />
                </div>
            </div>
        </div>
    );
}

export default RequestParticipation;