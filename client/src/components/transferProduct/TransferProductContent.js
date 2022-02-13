import React, { useState, useEffect } from 'react'
import TransferProductPhoto from '../../media/transferPhoto.png'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '../common/button/Button'
import Input from '../../components/common/input/Input'
import transferProductContent from './transferProductContent.css';

function TransferProductContent() {

    return (
        <div className='right-window'>
            <div className='create-chain-container'>
                <div className='transfer'>
                    <div className='transfer-picture'>
                        <img src={TransferProductPhoto} alt='' width="350" height="300" />
                    </div>

                    <div className='transfer-content'>

                        <div className='transfer-box'>
                            <Box sx={{ minWidth: 300 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Supply Chain</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value=""
                                        label="Age"
                                        onChange=""
                                    >
                                        <MenuItem value={10}>milk supply chain</MenuItem>
                                        <MenuItem value={20}>milk supply chain</MenuItem>
                                        <MenuItem value={30}>milk supply chain</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <div className='transfer-box'>
                            <Box sx={{ minWidth: 300 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Product</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value=""
                                        label="Age"
                                        onChange=""
                                    >
                                        <MenuItem value={10}>Milk</MenuItem>
                                        <MenuItem value={20}>Glass</MenuItem>
                                        <MenuItem value={30}>Wood</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <div className='transfer-box'>
                            <Box sx={{ minWidth: 300 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Receiver</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value=""
                                        label="Age"
                                        onChange=""
                                    >
                                        <MenuItem value={10}>Krishna</MenuItem>
                                        <MenuItem value={20}>Akshat</MenuItem>
                                        <MenuItem value={30}>Anuj</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <div className='input-box'>
                            <Input placeholder='Product Number' type='number' style={{ width: '300px' }} />
                        </div>

                        <div className='transfer-btn'>
                            <Button text='Request Transfer' style={{ width: '200px' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransferProductContent;