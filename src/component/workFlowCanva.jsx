import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";

// Backend API URL
const API_URL = "http://localhost:5000";

// Initial Nodes
const initialNodes = [{ id: "1", position: { x: 250, y: 5 }, data: { label: "Start" }, type: "default" }];

// Initial Edges
const initialEdges = [];

const WorkFlowCanva = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // 🔹 Handle Edge Connection
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // 🔹 Handle Drop from Sidebar
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData("application/reactflow");

      if (!nodeType) return;

      const position = {
        x: event.clientX - event.target.getBoundingClientRect().left,
        y: event.clientY - event.target.getBoundingClientRect().top,
      };

      const newNode = {
        id: `${+new Date()}`,
        type: nodeType,
        position,
        data: { label: `${nodeType} Node` },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  // 🔹 Handle Drag Over
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // 🔹 Save Workflow (API)
  const saveWorkflow = async () => {
    try {
      const title = prompt("Enter workflow title:");
      if (!title) return;

      await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, nodes, edges }),
      });
      alert("✅ Workflow Saved");
    } catch (error) {
      console.error("❌ Error saving workflow", error);
    }
  };

  // 🔹 Load Workflow (API)
  const loadWorkflow = async () => {
    try {
      const res = await fetch(`${API_URL}/workflows`);
      const data = await res.json();
      const workflow = data[0];

      if (workflow) {
        setNodes(workflow.nodes);
        setEdges(workflow.edges);
        alert("✅ Workflow Loaded");
      } else {
        alert("⚠️ No workflows found");
      }
    } catch (error) {
      console.error("❌ Error loading workflow", error);
    }
  };

  // 🔹 Delete All Workflows (API)
  const deleteAllWorkflows = async () => {
    try {
      await fetch(`${API_URL}/deleteAll`, { method: "DELETE" });
      alert("✅ All workflows deleted");
      setNodes(initialNodes);
      setEdges([]);
    } catch (error) {
      console.error("❌ Error deleting workflows", error);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Canvas */}
      <div
        style={{ flex: 1, height: "100vh", border: "2px dashed #ccc" }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        {/* Buttons */}
        <div style={{ marginBottom: "10px", padding: "10px", background: "#eee" }}>
          <button onClick={saveWorkflow}>💾 Save Workflow</button>
          <button onClick={loadWorkflow}>📂 Load Workflow</button>
          <button onClick={deleteAllWorkflows}>🗑️ Delete All Workflows</button>
        </div>

        {/* React Flow Canvas */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkFlowCanva;