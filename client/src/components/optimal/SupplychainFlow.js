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

function SupplychainFlow({instanceForInit, finalCst}) {
    const nodeStyle = { display: 'flex', alignItems: 'center', textAlign: 'center', background: '#cfdcf1', color: '#000', height: '0px', width: 'fit-content' };
    let instances = []
    let values = []
    let temp = instanceForInit?.forEach((instance) => {
        instances.push(Object.keys(instance)[0]);
        values.push(Object.values(instance)[0])
    })
    console.log('instances',instances)
    console.log('values',values)
    
    const initElem = [
        {
            id: '1',
            data: { label: `Total Vaccine Cost (${finalCst})` },
            position: { x: -100, y: 0 },
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
            data: { label: `${instances[0]} (${values[0]}) ` },
            position: { x: -200, y: 100 },
            style: nodeStyle,
            // parentNode: '2',
            // extent: 'parent',
        },

        {
            id: '6',
            data: { label: `${instances[1]} (${values[1]}) ` },
            position: { x: 0, y: 100 },
            style: nodeStyle,
            // parentNode: '2',
            // extent: 'parent',
        },

        { id: 'e1-5', source: '1', target: '5', label: '' },
        { id: 'e1-6', source: '1', target: '6', label: '' }
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
        <div style={{ width: '100%'}}>
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
