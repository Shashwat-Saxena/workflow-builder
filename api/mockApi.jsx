export const saveWorkflow = (workflow) => {
    localStorage.setItem("workflow", JSON.stringify(workflow));
  };
  
  export const loadWorkflow = () => {
    const data = localStorage.getItem("workflow");
    return data ? JSON.parse(data) : { nodes: [], edges: [] };
  };
  