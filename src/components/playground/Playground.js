import React, {useState, Fragment, useEffect} from 'react';
import ReactFlow, {addEdge, Background, Controls, MiniMap} from 'react-flow-renderer';

const onLoad = (reactFlowInstance) =>  {
  reactFlowInstance.fitView();
}
function Playground({ initialElement }) {
    let initialElements = [
        {
          id: '1', 
          data:{label: 'Mind Node'},
          style: {border: '1px solid black', backgroundColor: 'red',width: 'max-content', height: '20px',fontSize:'14px'},
          position: {x:0,y:0},
          connectable:'true',
        },
        {
          id: '2',
          data:{label: 'Mind Node'},
          style: {border: '1px solid black', backgroundColor: 'red',width: 'max-content', height: '20px'},
          position: {x:100,y:0},
          connectable:'true',
        }
    ]
    
    console.log("initialElements",initialElements);
    const [elements, setElements] = useState(initialElements);

    const onConnect = (params) =>{
        console.log(params);
        setElements(elements => addEdge(params ,elements));
    }
    useEffect(() => {
        setElements(initialElements);
        console.log("elements",elements);
    }, [initialElements])
  return (
  <div style={{width:'500px',height:'500px', margin:"100px", marginLeft:'25%'}}>
      <Fragment>
        <ReactFlow
          elements={elements}
          onLoad={onLoad}
          style={{width:'100%'}}
          onConnect={onConnect}
          connectionLineStyle={{stroke: "red", strokeWidth: 1}}
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
