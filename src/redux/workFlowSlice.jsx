import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nodes: [],  
    edges: []
};

const workFlowSlice = createSlice({
    name: "workflow",
    initialState,
    reducers: {
        setNodes: (state, action) => {
            state.nodes = action.payload || [];
        },
        setEdges: (state, action) => {
            state.edges = action.payload || [];
        },
        addNode: (state, action) => {
            state.nodes.push(action.payload);
        },
        // ✅ New Function to Update Node Properties
        updateNode: (state, action) => {
            const { id, data } = action.payload;
            const nodeIndex = state.nodes.findIndex((node) => node.id === id);
            if (nodeIndex !== -1) {
                state.nodes[nodeIndex] = {
                    ...state.nodes[nodeIndex], 
                    data: { ...state.nodes[nodeIndex].data, ...data }
                };
            }
        }
    }
});

export const { setNodes, setEdges, addNode, updateNode } = workFlowSlice.actions;
export default workFlowSlice.reducer;