import React from 'react';
import Tree from 'react-d3-tree';
import styles from './OrgChartTree.module.css'


const renderNodeWithCustomEvents = ({
  nodeDatum
}) => (
  <g>
    <circle r="15"/>
    <text fill="black" strokeWidth="1" y="-50" x="-30">
      {nodeDatum.name}
    </text>
    {nodeDatum.attributes?.similarity_perecentage && (
      <text fill="black" x="40" dy="-20" strokeWidth="0" fontWeight="bold">
      similarity_perecentage: {nodeDatum.attributes?.similarity_perecentage}
      </text>
    )}
    {nodeDatum.attributes?.id_article && (
      <text  fill="black" x="40" dy="0" strokeWidth="0" fontWeight="bold">
      id_article: {nodeDatum.attributes?.id_article}
      </text>
    )}

    {nodeDatum.attributes?.date_add && (
      <text fill="black" x="40" dy="20" strokeWidth="0" fontWeight="bold">
      date_add: {nodeDatum.attributes?.date_add}
      </text>
    )}
  </g>
);

export default function OrgChartTree({orgChart}) {
  const nodeSize = { x: 600, y: 200 };
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={
      { width: "100%", height: '80vh', border: "2px solid black", marginTop: "20px", marginBottom: '20px', borderRadius: "15px"}
      }>
      <Tree
        data={orgChart}
        orientation="horizontal" 
        nodeSize={nodeSize} 
    
        renderCustomNodeElement={(rd3tProps) =>
          renderNodeWithCustomEvents({ ...rd3tProps})
        }
        />
    </div>
  );
}