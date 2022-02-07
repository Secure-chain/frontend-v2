import React, {useState, Fragment, useEffect} from 'react';
import ReactFlow, {addEdge, Background, Controls,updateEdge, MiniMap} from 'react-flow-renderer';

const onLoad = (reactFlowInstance) =>  {
  reactFlowInstance.fitView();
}
const nodeStyle = {display:'flex',alignItems:'center', textAlign:'center', background: '#cfdcf1', color: '#000', height: '0px', width: '80px'};

function Playground({ entityArray,style, handleFlowUpdate}) {
  // const initialElements = [
  //   {
  //     id: '1',
  //     type: 'input',
  //     data: { label: 'Node A' },
  //     position: { x: 200, y: 0 },
  //     style: nodeStyle,
  //   },
  //   {
  //     id: '2',
  //     data: { label: 'Node B' },
  //     position: { x: 100, y: 100 },
  //     style: nodeStyle,
  //   },
  //   {
  //     id: '3',
  //     data: { label: 'Node C' },
  //     position: { x: 300, y: 100 },
  //     style: nodeStyle,
  //   },
  //   { id: 'e1-2', source: '1', target: '2', label: 'updatable edge' },
  // ];
  const initialElements = [];
  const [elements, setElements] = useState(initialElements);
 
  let x = 100,y=100;
    useEffect(() => {
      if(entityArray.length>0){
        entityArray.forEach((element,index) => {
          initialElements.push({
            id: String(index+1),
            data: { label: element},
            position: { x:x , y:y  },
            style: nodeStyle,
          });
          x+=150;
        });
        setElements(initialElements);
      }
    }, [entityArray]);

// when the edge is updated, update the edge data
    const onEdgeUpdate = (oldEdge, newConnection) =>{
      setElements((els) => updateEdge(oldEdge, newConnection, els));
    }
    
   
// when one node is connected to another node, add an edge
    const onConnect = (params) =>{
      let temp = addEdge(params ,elements)
      console.log('onConnect', temp);
      setElements(temp);
      updateEdgeColor(temp);
      handleFlowUpdate(params.source,params.target);
    }
    const updateEdgeColor = (edgeElement) =>{
      let temp = [...edgeElement];
      temp.forEach((element,index) => {
        if(element.id.includes('edge')){
          console.log("element",element);
          // add a key style in this element
          temp[index].style = {
            stroke:'#0f52ba' 
          }
          // #0f52ba
        }
      })
      setElements(temp);
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
