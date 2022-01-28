import React, {useState, Fragment, useEffect} from 'react';
import ReactFlow, {addEdge, Background, Controls,updateEdge, MiniMap} from 'react-flow-renderer';

const onLoad = (reactFlowInstance) =>  {
  reactFlowInstance.fitView();
}
function Playground({ initialElement,style }) {
  const initialElements = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Node A' },
      position: { x: 200, y: 0 },
      style: {display:'flex',alignItems:'center',  background: '#cfdcf1;', color: '#000', height: '0px', width: '80px',},
    },
    {
      id: '2',
      data: { label: 'Node B' },
      position: { x: 100, y: 100 },
    },
    {
      id: '3',
      data: { label: 'Node C' },
      position: { x: 300, y: 100 },
    },
    { id: 'e1-2', source: '1', target: '2', label: 'updatable edge' },
  ];
    const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));
    
    const [elements, setElements] = useState(initialElements);

    const onConnect = (params) =>{
        console.log(params);
        setElements(elements => addEdge(params ,elements));
    }
  return (
  <div style={style}>
      <Fragment>
        <ReactFlow
          elements={elements}
          onLoad={onLoad}
          style={{width:'100%'}}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
          connectionLineType = "bezier"
          snapToGrid = {true}
          snapGrid={[16,16]}
        >
          <Background
          color="#0f52ba"
          />
          {/* <MiniMap 
            nodeColor={n=>{
                if(n.type === 'input') return 'blue';
                return '#FFCC00'
            }} /> */}
          <Controls />
        </ReactFlow>
      </Fragment>
  </div>
  );
}

export default Playground;
