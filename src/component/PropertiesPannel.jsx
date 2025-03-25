import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNode } from "../redux/WorkFlowSlice";

const PropertiesPanel = ({ selectedNode }) => {
    const dispatch = useDispatch();
    const [label, setLabel] = useState(selectedNode?.data?.label || "");

    useEffect(() => {
        setLabel(selectedNode?.data?.label || "");
    }, [selectedNode]);

    const handleSave = () => {
        if (selectedNode) {
            dispatch(updateNode({ id: selectedNode.id, data: { label } }));
        }
    };

    return (
        <div className="properties-panel">
            <h3>Node Properties</h3>
            <label>Label:</label>
            <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default PropertiesPanel;
