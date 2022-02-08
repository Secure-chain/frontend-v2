import React, { useState, useEffect } from 'react'
//import SupplyChainPhoto from '../../../public/media/form2.png'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import selectSupplyChain from './selectSupplyChain.css';

function SelectSupplyChain({ handleTabChange }) {
    return(
        <div className='supply-chain'>
            <div className='picture'>
                <img src='../../../public/media/form2.png' alt='' />
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
                                value=""
                                label="Age"
                                onChange=""
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default SelectSupplyChain;