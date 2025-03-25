import React from "react";

const nodeTypes = [
  { type: "start", label: "Start Node" },
  { type: "process", label: "Process Node" },
  { type: "decision", label: "Decision Node" },
];

const Sidebar = () => {
  // ✅ Ensure `onDragStart` is correctly set
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="sidebar">
      <h3>Drag Nodes</h3>
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          className="node"
          draggable
          onDragStart={(event) => onDragStart(event, node.type)}
        >
          {node.label}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;