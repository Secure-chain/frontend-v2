import React, { useEffect, useState } from 'react'
import getMySupplyChains from '../../APIcalls/getMySupplyChains'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './optimal.scss'
import getEntitiesBySupplyChainId from '../../APIcalls/getEntitiesBySupplyChainId';
function OptimalWindow() {
    const [supplychains, setSupplychains] = useState([]);
    const [selectedSupplyChainId, setSelectedSupplyChainId] = useState(0);
    const [entitiesForSelectedSupplyChain, setEntitiesForSelectedSupplyChain] = useState([]);
    const [selectedEntityId, setSelectedEntityId] = useState(0);
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
    </div>
  )
}

export default OptimalWindow