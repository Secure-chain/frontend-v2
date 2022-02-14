import React, { useState, useEffect } from 'react'
import SupplyChainPhoto from '../../media/form2.png'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '../common/button/Button'
import selectSupplyChain from './selectSupplyChain.css';
import getSupplyChains from '../../APIcalls/CreateSupplyChain/getSupplyChains';

function SelectSupplyChain({ handleTabChange, handleSupplyChainSelection, changeTab }) {
    const [supplyChainList, setSupplyChainList] = useState([]);
    const [selectedSupplyChain, setSelectedSupplyChain] = useState({
        id: 0,
        name:'Select Supply Chain',
    });
    const [selectedSupplyChainId, setSelectedSupplyChainId] = useState();
    useEffect(() => {
        getSupplyChains().then(res => {
            setSupplyChainList(res.data);
        })
    },[]);

    return(
        <div className='supply-chain'>
            <div className='picture'>
                <img src={SupplyChainPhoto} alt='' width="350" height="200"/>
            </div>
            <div className='content'>
                <div className='select-text'>
                    Choose from the following existing supply chains
                </div>
                <div className='select-box'>
                    <Box sx={{ minWidth: 300 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Choose</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedSupplyChain.id}
                                label="Select Supply Chain"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setSelectedSupplyChainId(e.target.value)
                                    handleSupplyChainSelection(e.target.value)
                                    setSelectedSupplyChain(supplyChainList.filter(supplyChain => supplyChain.id === e.target.value)[0])
                                }}
                                >
                                {supplyChainList?.map(supplyChain => {
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
                <div className="select-btn">
                    <Button text='Continue' onClick={(e)=>handleTabChange(2)} />
                </div>
            </div>
        </div>
    );
}

export default SelectSupplyChain;