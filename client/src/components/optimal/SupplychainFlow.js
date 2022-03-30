import React, { useState, Fragment } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'react-flow-renderer';

const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
}

const rfStyle = {
    backgroundColor: '#B8CEFF',
    width: '900px',
    height: '450px',
    alignItems: 'center'
};

function SupplychainFlow() {
    const nodeStyle = { display: 'flex', alignItems: 'center', textAlign: 'center', background: '#cfdcf1', color: '#000', height: '0px', width: 'fit-content' };


    const initElem = [
        {
            id: '1',
            data: { label: '10L Doses of Covaxin' },
            position: { x: 0, y: 0 },
            style: nodeStyle,
        },

        // {
        //     id: '2',
        //     type: 'group',
        //     data: { label: 'Manufacturers' },
        //     position: { x: 100, y: 100 },
        //     style: nodeStyle,
        // },

        // {
        //     id: '3',
        //     data: { label: 'Transporters' },
        //     position: { x: 300, y: 100 },
        //     style: nodeStyle,
        // },

        // {
        //     id: '4',
        //     data: { label: 'Distributors' },
        //     position: { x: 500, y: 100 },
        //     style: nodeStyle,
        // },

        {
            id: '5',
            data: { label: 'Bharat Biotech (5L)' },
            position: { x: -200, y: 100 },
            style: nodeStyle,
            // parentNode: '2',
            // extent: 'parent',
        },

        {
            id: '6',
            data: { label: 'Serum Institute of India (3L)' },
            position: { x: 0, y: 100 },
            style: nodeStyle,
            // parentNode: '2',
            // extent: 'parent',
        },

        {
            id: '7',
            data: { label: 'Zydus Cadila (2L)' },
            position: { x: 200, y: 100 },
            style: nodeStyle,
            // parentNode: '2',
            // extent: 'parent',
        },

        { id: 'e1-5', source: '1', target: '5', label: '' },
        { id: 'e1-6', source: '1', target: '6', label: '' },
        { id: 'e1-7', source: '1', target: '7', label: '' }
    ];
    // const initialNodes = [
    //     {
    //         id: '1',
    //         type: 'input',
    //         data: { label: 'Input Node' },
    //         position: { x: 250, y: 25 },
    //     },

    //     {
    //         id: '2',
    //         // you can also pass a React component as a label
    //         data: { label: <div>Default Node</div> },
    //         position: { x: 100, y: 125 },
    //     },
    //     {
    //         id: '3',
    //         type: 'output',
    //         data: { label: 'Output Node' },
    //         position: { x: 250, y: 250 },
    //     },
    // ];

    // const initialEdges = [
    //     { id: 'e1-2', source: '1', target: '2' },
    //     { id: 'e2-3', source: '2', target: '3', animated: true },
    // ];
    // const [nodes, setNodes] = useState(initialNodes);
    // const [edges, setEdges] = useState(initialEdges);

    return (
        <div style={{ width: '100%', marginLeft: '400px'}}>
            <Fragment>
                <ReactFlow
                    elements={initElem}
                    style={rfStyle}
                    onLoad={onLoad}
                    connectionLineType="bezier"

                >
                    {/* <MiniMap /> */}
                    <Background
                        color="#0f52ba"
                    />
                    <Controls />
                </ReactFlow>
            </Fragment>
        </div>
    );
}

export default SupplychainFlow;
