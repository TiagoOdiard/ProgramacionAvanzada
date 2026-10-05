const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de la base de datos (los valores vendrán de Docker luego)
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'taskmanager',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// RUTAS

// 1. Obtener todas las tareas
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Crear una nueva tarea
app.post('/tasks', async (req, res) => {
  const { 
    projectName, activityType, summary, description, 
    priority, reporter, assignee, precondition, sprint 
  } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO tasks 
      (project_name, activity_type, summary, description, priority, reporter, assignee, precondition, sprint) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [projectName, activityType, summary, description, priority, reporter, assignee, precondition, sprint]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Finalizar una tarea
app.patch('/tasks/:id/finish', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE tasks SET status = 'Finalizada', closing_date = CURRENT_DATE WHERE id = $1 RETURNING *`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Eliminar una tarea
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API corriendo en el puerto ${PORT}`);
});