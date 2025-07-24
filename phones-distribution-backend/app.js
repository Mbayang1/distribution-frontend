require('dotenv').config();
const db = require('./config/db');
const express = require('express');
const app = express();
app.use(express.json());

// Import routes
const agentsRouter = require('./routes/agents');
const distributionsRouter = require('./routes/distributions');
const materialsRouter = require('./routes/materials');
const departmentsRouter = require('./routes/departments');
const type_of_materialsRouter = require('./routes/type_of_materials');
const servicesRouter = require('./routes/services');

// Add more routers as you create them

// Use routes
app.use('/agents', agentsRouter);
app.use('/distributions', distributionsRouter);
app.use('/departments', departmentsRouter);
app.use('/materials', materialsRouter);
app.use('/type_of_materials', type_of_materialsRouter);
app.use('/services', servicesRouter);

// Add more as needed

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});