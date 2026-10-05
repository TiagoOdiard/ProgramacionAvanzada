import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    projectName: '',
    activityType: 'Task',
    status: 'Abierta',
    summary: '',
    description: '',
    priority: 'Media',
    reporter: '',
    assignee: '',
    precondition: '',
    creationDate: new Date().toISOString().split('T')[0],
    closingDate: '',
    sprint: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { ...formData, id: Date.now() };
    setTasks([newTask, ...tasks]);
    e.target.reset();
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleFinish = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: 'Finalizada', closingDate: new Date().toISOString().split('T')[0] } : task
    ));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Gestor de Tareas</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '40px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        <input name="projectName" placeholder="Nombre del Proyecto" onChange={handleChange} required />
        <select name="activityType" onChange={handleChange}>
          <option value="Task">Task</option>
          <option value="Bug">Bug</option>
          <option value="Feature">Feature</option>
        </select>
        <input name="summary" placeholder="Resumen" onChange={handleChange} required />
        <select name="priority" onChange={handleChange}>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
        <textarea name="description" placeholder="Descripción" onChange={handleChange} style={{ gridColumn: 'span 2' }} />
        <input name="reporter" placeholder="Informador" onChange={handleChange} />
        <input name="assignee" placeholder="Persona asignada" onChange={handleChange} />
        <input name="precondition" placeholder="Precondición" onChange={handleChange} style={{ gridColumn: 'span 2' }} />
        <input name="sprint" placeholder="Sprint" onChange={handleChange} />
        <input type="date" name="creationDate" value={formData.creationDate} onChange={handleChange} />
        
        <button type="submit" style={{ gridColumn: 'span 2', padding: '10px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Crear Tarea
        </button>
      </form>

      <h2>Listado de Tareas</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {tasks.map(task => (
          <div key={task.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{task.summary} <span style={{ fontSize: '0.8em', color: '#666' }}>({task.projectName})</span></h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9em' }}>
              <p><strong>Estado:</strong> {task.status}</p>
              <p><strong>Prioridad:</strong> {task.priority}</p>
              <p><strong>Sprint:</strong> {task.sprint}</p>
              <p><strong>Asignado a:</strong> {task.assignee}</p>
              <p><strong>Creación:</strong> {task.creationDate}</p>
              {task.closingDate && <p><strong>Cierre:</strong> {task.closingDate}</p>}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button disabled={task.status === 'Finalizada'} onClick={() => handleFinish(task.id)} style={{ padding: '5px 10px', cursor: 'pointer' }}>Finalizar</button>
              <button onClick={() => handleDelete(task.id)} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>Eliminar</button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && <p>No hay tareas registradas.</p>}
      </div>
    </div>
  );
}

export default App;