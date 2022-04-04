import React, { useEffect, useState } from 'react'
import getMySupplyChains from '../../APIcalls/getMySupplyChains'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './optimal.scss'
import getEntitiesBySupplyChainId from '../../APIcalls/getEntitiesBySupplyChainId';
import getInstanceOfEntity from '../../APIcalls/getInstanceOfEntity';
import postFindPathData from '../../APIcalls/postOptimalPath';
import Button from '../common/button/Button';
import Input from '../common/input/Input';
import { useHistory } from 'react-router';
import SupplychainFlow from './SupplychainFlow';
function OptimalWindow() {
    const [supplychains, setSupplychains] = useState([]);
    
const [instanceToValues, setInstanceToValues] = useState([]);
const [finalCost, setFinalCost] = useState(0);
    const [selectedSupplyChainId, setSelectedSupplyChainId] = useState(0);
    const [entitiesForSelectedSupplyChain, setEntitiesForSelectedSupplyChain] = useState([]);
    const [selectedEntityId, setSelectedEntityId] = useState(0);
    const [entityInstances, setEntityInstances] = useState([
        {
            id:1,
            entity_instance_name:'Bharat Biotech'
        },
        {
            id:2,
            entity_instance_name:'Serum Institute'
        }
    ]);
    const [selectedEntityInstanceId, setSelectedEntityInstanceId] = useState(0);
    const [operators, setOperators] = useState(['=', '<=']);
    const [selectedOperator, setSelectedOperator] = useState(' ');
    const [goal,setGoal] = useState("");
    const [constant, setConstant] = useState(0);
    const [coefficient, setCoefficient] = useState(0);
    const [showGraph , setShowGraph] = useState(true);
    let history = useHistory();


    // creating findPathData 
    const postFindPathDataUtil = () => {
        const data = {
            goal : goal,
            constraints : [
                {
                    operator : selectedOperator,
                    constant : constant,
                    parameters : [
                        {
                            variable : selectedEntityInstanceId,
                            coefficient : coefficient
                        }
                    ]
                }
            ]
        }
        console.log("data to be sent in find path", data);
        postFindPathData(selectedSupplyChainId,selectedEntityId, data).then(res=> {
                setInstanceToValues(res.data.vars);
                setFinalCost(res.data.objective_value)
                setShowGraph(true);

        })
    }



    useEffect(() => {
        getMySupplyChains().then(res => {
            setSupplychains(res?.data);
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
    useEffect(() => {
        if (selectedSupplyChainId !== 0) {
            getInstanceOfEntity(selectedEntityId).then(res => {
                console.log("Instances",res.data)
                setEntityInstances(res.data)
            })
        }
    }, [selectedEntityId])
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
            <Input 
                type='text'
                placeholder='Enter Goal'
                style={{ paddingLeft: '20px', margin: 'auto'}}
                onChange = {(e)=>{
                    setGoal(e.target.value);
                }}
                value={goal}
            />
        <br/>
        <div className='optimal-btn'>
        <h3>
            Create Constraints
        </h3>
        
        </div>
        <div className='constraint-container'>
            <Input className='coeff-input' type='text' placeholder='Enter Coefficient' value={coefficient} onChange={(e) => setCoefficient(e.target.value)}/>
            <div className='select-box entity-select'>
                <Box sx={{ minWidth: 350 }}>
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
                                        {entityInstance.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className='select-box'>
                <Box sx={{ minWidth: 100 }}>
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
            <Input 
                type='text'
                placeholder='Enter constant'
                value={constant}
                onChange={(e)=>{
                    setConstant(e.target.value)
                }}
            />
        </div>
        <Button 
            text='Add Constraint' 
            style={{width: '150px'}}
            onClick={(e)=>{
                history.push('/graph');
            }}
        />
        <Button 
            text='Find Path' 
            onClick={(e) => {
                postFindPathDataUtil()
            }}
            style={{marginTop:'20px',marginBottom:'20px',width: '150px'}}
        />
        <SupplychainFlow 
          instanceForInit={instanceToValues}
          finalCst={finalCost}
        />
    </div>
  )
}

export default OptimalWindow