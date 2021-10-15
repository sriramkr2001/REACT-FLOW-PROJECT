import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import ColorSelectorNode from './ColorSelectorNode';
import ReactFlow, {
  isEdge,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
} from 'react-flow-renderer';
import { Handle } from 'react-flow-renderer';

import './index.css';

const DummyElement=({data,isConnectable,setValues})=>{
  const [value,setValue]=useState("haha")
  // console.log(data.text,3)

  return(
    <div >
    <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      {/* <h1>Hello There PalZonee</h1>
      <h1>Hello There PalZonee</h1> */}
      <h1 style={{fontSize:"10px",marginTop:"-10px"}}>Enter text</h1>
      <h1 style={{fontSize:"10px",marginTop:"-5px"}}>{value}</h1>
      <input type="text"   style={{width:"70%"}} onChange={(e)=>{

data.setTexty(e.target.value)

        setValue(e.target.value)
        setValues(e.target.value)
      }} />
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: 10, background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position="right"
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  )
}


const DummyElement1=({data,isConnectable})=>{
  const [values,setValues]=useState(data.texty)
console.log(data.text,2)

// const [count,setCount]=useState(1);
  const CustomHandlers=(count)=>
{ let x=[]
  for(let i = 1;i<=5;i++)
  {
      let s=""+i
      
    x.push(<Handle
      type="target"
      id={s}
      position="left"
      style={{top :10+i*10, background: '#555' }}
      onConnect={(params) => console.log('handle onConnect', params)}
      isConnectable={isConnectable}
    />)
   
  }
   return x   
}
  return(
    <div >


      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: 10, background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position="right"
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
      {/* <button onClick={()=>setCount(count+1)}></button> */}
     {CustomHandlers(5).map((elm,idx)=>{
return elm
     })}
     
     <h1 style={{fontSize:"10px",marginTop:"-10px"}}>Enter text</h1>

<h1 style={{fontSize:"10px",marginTop:"-5px"}}>{values}</h1>

{/* <input type="text"   style={{width:"70%"}} onChange={data.setTexty} /> */}
<div style={{height:"0px"}}>{DummyElement(data,isConnectable,setValues)}</div>

    </div>
  )
}





function App() {
  return (
    <div className="App">
 {/* <BasicFlow/> */}
 <CustomNodeFlow/>

    </div>
  );
}
const setyValues=(elm)=>{
  console.log("usususu")
}
const onEdgeMouseMove=(event, edge)=>console.log(event,"uowh")
const onNodeDragStop = (event, node) => console.log('drag stop', node);
const onElementClick = (event, element) => console.log('click', element);
const onNodeMouseMove=(event, node)=>console.log(node);

const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode1: ColorSelectorNode,
  Custominput: DummyElement,
  Customoutput: DummyElement1,
};

const CustomNodeFlow = () => {
 
  const [text,setText]=useState("world")
  console.log(text,1)
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [bgColor, setBgColor] = useState(initBgColor);
 const setTexty=(val)=>{
  //  console.log(val.target.value,"sjsjjs")

   
    setText(val)
    console.log(text)
  }
  useEffect(() => {
    const onChange = (event) => {
      setElements((els) =>
        els.map((e) => {
          if (isEdge(e) || e.id !== '2') {
            return e;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...e,
            data: {
              ...e.data,
              color,
            },
          };
        })
      );
    };

    setElements([
      // {
      //   id: '1',
      //   type: 'input',
      //   data: { label: 'An input node' },
      //   position: { x: 0, y: 50 },
      //   sourcePosition: 'right',
      // },
      {
        id: '2',
        type: 'selectorNode1',
        data: { onChange: onChange, color: initBgColor },
        style: { border: '1px solid #777', padding: 10 },
        position: { x: 300, y: 50 },
      },
      {
        id: '6',
        type: 'Custominput',
        data: {label:'<h1>Hello</h1>',text,setTexty},
        style: { border: '1px solid #777', padding: 10 ,backgroundColor:"white",height:"50px",width:"200px"},
        position: { x: 300, y: 350 },
      },
      {
        id: '5',
        type: 'Customoutput',
        data: {texty:text},
        style: { border: '1px solid #777', padding: 10 ,backgroundColor:"white",height:"50px",width:"200px"},
        position: { x: 700, y: 350 },
      },
      // {
      //   id: '7',
      //   type: 'selectorNode3',
      //   data: { onChange: onChange},
      //   style: { border: '1px solid #777', padding: 10 ,backgroundColor:"white",height:"50px",width:"200px"},
      //   position: { x: 300, y: 50 },
      // },
      // {
      //   id: '5',
      //   type: 'output',
      //   data: { label: 'Output A' },
      //   position: { x: 700, y: 100 },
      //   targetPosition: 'left',
      // },
      {
        id: '3',
        type: 'output',
        data: { label: 'Output A' },
        position: { x: 650, y: 25 },
        targetPosition: 'left',
      },
      {
        id: '4',
        type: 'output',
        data: { label: 'Output B' },
        position: { x: 650, y: 100 },
        targetPosition: 'left',
      },

      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: false,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2a-3',
        source: '2',
        target: '3',
        sourceHandle: 'a',
        animated: false,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2b-4',
        source: '2',
        target: '4',
        sourceHandle: 'b',
        animated: false,
        style: { stroke: '#fff' },
      },
    ]);
  }, []);
  const [receivedElements, setReceivedElements] = useState();


  useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      reactflowInstance.fitView();
    }
    setReceivedElements(elements);
  }, [reactflowInstance, elements.length,elements, setReceivedElements]);

  const onElementsRemove = useCallback(
    (elementsToRemove) =>
      setElements((els) => removeElements(elementsToRemove, els)),
    []
  );
  const onConnect = useCallback(
    (params) =>
      setElements((els) =>
        addEdge({ ...params, animated: false, style: { stroke: '#fff' } }, els)
      ),
    []
  );

  const onLoad = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log('flow loaded:', rfi);
      }
    },
    [reactflowInstance]
  );

  return (
  <div style={{height:"100vh"}}>

<ReactFlow
      elements={elements}
      onElementClick={onElementClick}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
      style={{ background: bgColor }}
      onLoad={onLoad}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      onEdgeMouseMove={onEdgeMouseMove}
      snapGrid={snapGrid}
      // onNodeMouseMove={onNodeMouseMove}
      defaultZoom={1.5}
    >
      {/* <MiniMap
        nodeStrokeColor={(n) => {
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'selectorNode') return bgColor;
          if (n.type === 'output') return '#ff0072';
        }}
        nodeColor={(n) => {
          if (n.type === 'selectorNode') return bgColor;
          return '#fff';
        }}
      /> */}
      <Controls />
    </ReactFlow>
  </div>
   
  );
};


// const BasicFlow = () =>
// { 

//   const [elements, setElements] = useState(initialElements);
//   const onElementsRemove = (elementsToRemove) =>
//     setElements((els) => removeElements(elementsToRemove, els));
//   const onConnect = (params) => setElements((els) => addEdge(params, els));

//   return (
//     <div style={{ height: 300 }}>
//       <ReactFlow
//         elements={elements}
//         onElementsRemove={onElementsRemove}
//         onConnect={onConnect}
//         deleteKeyCode={46} /* 'delete'-key */
//       />
//     </div>
//   );
// }

export default App;
