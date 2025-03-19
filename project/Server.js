const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Schema & Model
const workflowSchema = new mongoose.Schema({
  title: String,
  nodes: Array,
  edges: Array,
  createdAt: { type: Date, default: Date.now }
});

const Workflow = mongoose.model('Workflow', workflowSchema);

// Routes

// 🔹 Save Workflow
app.post('/save', async (req, res) => {
  try {
    const { title, nodes, edges } = req.body;
    const newWorkflow = new Workflow({ title, nodes, edges });
    await newWorkflow.save();
    res.status(201).json({ message: '✅ Workflow saved successfully', workflow: newWorkflow });
  } catch (error) {
    res.status(500).json({ error: '❌ Error saving workflow' });
  }
});

// 🔹 Load Workflow by ID
app.get('/load/:id', async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id);
    if (!workflow) return res.status(404).json({ message: '⚠️ No workflow found' });
    res.json(workflow);
  } catch (error) {
    res.status(500).json({ error: '❌ Error loading workflow' });
  }
});

// 🔹 Get All Workflows
app.get('/workflows', async (req, res) => {
  try {
    const workflows = await Workflow.find().sort({ createdAt: -1 });
    res.json(workflows);
  } catch (error) {
    res.status(500).json({ error: '❌ Error fetching workflows' });
  }
});

// 🔹 Delete Specific Workflow
app.delete('/delete/:id', async (req, res) => {
  try {
    await Workflow.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ Workflow deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: '❌ Error deleting workflow' });
  }
});

// 🔹 Delete All Workflows
app.delete('/deleteAll', async (req, res) => {
  try {
    await Workflow.deleteMany({});
    res.json({ message: '✅ All workflows deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: '❌ Error deleting workflows' });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
