import React, { useEffect, useState } from 'react'
import getMySupplyChains from '../../APIcalls/getMySupplyChains'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './optimal.scss'
import getEntitiesBySupplyChainId from '../../APIcalls/getEntitiesBySupplyChainId';
import Button from '../common/button/Button';
function OptimalWindow() {
    const [supplychains, setSupplychains] = useState([]);
    const [selectedSupplyChainId, setSelectedSupplyChainId] = useState(0);
    const [entitiesForSelectedSupplyChain, setEntitiesForSelectedSupplyChain] = useState([]);
    const [selectedEntityId, setSelectedEntityId] = useState(0);
    const [entityInstances, setEntityInstances] = useState([]);
    const [selectedEntityInstanceId, setSelectedEntityInstanceId] = useState(0);
    const [operators, setOperators] = useState(['=', '<=']);
    const [selectedOperator, setSelectedOperator] = useState(' ');
    useEffect(() => {
        getMySupplyChains().then(res => {
            console.log(res.data);
            setSupplychains(res.data);
        })
    }, [])
    useEffect(() => {
        if (selectedSupplyChainId !== 0) {
            getEntitiesBySupplyChainId(selectedSupplyChainId).then(res => {
                console.log("entity",res.data);
                setEntitiesForSelectedSupplyChain(res.data);
            })
        }
    }, [selectedSupplyChainId])
  return (
    <div className='optimal-container'>
        <h1>Find Optimam chain path</h1>
        <div className='select-box'>
            <Box sx={{ minWidth: 300 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose Supplychain</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedSupplyChainId}
                        label="Select Supply Chain"
                        onChange={(e) => {
                            setSelectedSupplyChainId(e.target.value)
                        }}
                    >
                        {supplychains?.map(supplyChain => {
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
        {selectedSupplyChainId !== 0 &&
            <div className='select-box'>
            <Box sx={{ minWidth: 300 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose Entity</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedEntityId}
                        label="Select Entity"
                        onChange={(e) => {
                            setSelectedEntityId(e.target.value)
                        }}
                    >
                        {entitiesForSelectedSupplyChain?.map(entity => {
                            return (
                                <MenuItem value={entity.id} key={entity.id}>
                                    {entity.entity_name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
        </div>}
        <div className='optimal-input-container'>
            <div className='optimal-input-box'>
                <label>Goal  : &nbsp; </label>
                <input type='text' placeholder='Enter Goal' />
        </div>
        <Button text='Create Constraint' />
        <div className='select-box'>
            <Box sx={{ minWidth: 300 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose Entity Instance</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedEntityInstanceId}
                        label="Select Entity Instance"
                        onChange={(e) => {
                            setSelectedEntityInstanceId(e.target.value)
                        }}
                    >
                        {entityInstances?.map(entityInstance => {
                            return (
                                <MenuItem value={entityInstance.id} key={entityInstance.id}>
                                    {entityInstance.entity_instance_name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
        </div>
        <input type='text' placeholder='Enter Coefficient' />
        <div className='select-box'>
            <Box sx={{ minWidth: 300 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose Operator</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedOperator}
                        label="Select Operator"
                        onChange={(e) => {
                            setSelectedOperator(e.target.value)
                        }}
                    >
                        {operators?.map(operator => {
                            return (    
                                <MenuItem value={operator} key={operator}>
                                    {operator}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
        </div>
        <input type='text' placeholder='Enter constant' />
        </div>
    </div>
  )
}

export default OptimalWindow