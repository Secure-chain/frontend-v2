import React, { useState, useEffect } from 'react'
import SupplyChainPhoto from '../../media/form2.png'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '../common/button/Button'
import selectSupplyChain from './selectSupplyChain.css';

function SelectSupplyChain({ handleTabChange }) {
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
                                value=""
                                label="Age"
                                onChange=""
                            >
                                <MenuItem value={10}>Krishna Supply Chain</MenuItem>
                                <MenuItem value={20}>Akshat Supply Chain</MenuItem>
                                <MenuItem value={30}>Anuj Supply Chain</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className="select-btn">
                    <Button text='Continue' />
                </div>
            </div>
        </div>
    );
}

export default SelectSupplyChain;