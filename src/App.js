import React,{useState,useEffect} from 'react'
import { isEmpty,rest,set,size } from 'lodash'
import shortid from 'shortid'
import { addDocument, deleteDocument, getCollection, updateDocument } from './actions'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editModo, setEditModo] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      const result = await getCollection("task")
      console.log(result);
      if(result.statusResponse){
        setTasks(result.data)
      }
    })()
  }, [])

  const validForm = () =>{
    
    let isValid = true
    setError(null)

    if(isEmpty(task)){
     setError("debes de ingresar una tarea")
     isValid=false
    }

    return isValid
  }

  const addTask =async(e)=>{
    e.preventDefault()

    if (!validForm()){
      return
    }

    const result = await addDocument("task",{name: task})

    if(!result.statusResponse){
      setError(result.error)
      return
    }

    setTasks([...tasks,{id: result.data.id,name: task}])
    setTask("")
  }

  const deleteTask =async (id) =>{
    const result = await deleteDocument("task",id)
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }

  const editTask = (task) =>{
    setTask(task.name)
    setEditModo(true)
    setId(task.id)
  }

  const saveTask =async (e) => {
    e.preventDefault()
    if (!validForm()){
      return
    }

    const result = await updateDocument("task",id,{name:task})

    if(!result.statusResponse){
      setError(result.error)
      return
    }

    const editedTasks = tasks.map(item => item.id === id ? {id, name: task} : item)
    setTasks(editedTasks)
    setEditModo(false)
    setTask("")
    setId("")

  }

  return (
    <div className='container mt-5'>
      <h1>Tareas</h1>
      <hr></hr>
      <div className='row'>
        <div className="col-8">
          <h4 className="text-center">lista de tareas</h4>
           {
             size(tasks) == 0 ? (
              <li className="list-group-item">Aun no hay Tareas.</li>
             ) : (

                <ul className="list-group">
                  {
                    tasks.map((task)=>(

                      <li className="list-group-item" key={task.id}>
                        {task.name}
                        <button 
                          className="btn btn-danger btn-sm float-right mx-2"
                          onClick={()=> deleteTask(task.id)}
                          >
                          Eliminar
                        </button>
                        <button 
                        className="btn btn-warning btn-sm float-right"
                        onClick={()=> editTask(task)}
                        >
                          Editar
                        </button>
                      </li>
                    ))

                  }

                </ul>      
             )
          }
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editModo ? "Modificar tarea" : "Agregar tarea"}
          </h4>
          <form onSubmit={editModo ? saveTask : addTask}>
            {
              error &&<span className="text-danger">{error}</span>
            }
            <input 
              type="text" 
              className="form-control mb-2" 
              placeholder="Ingrese la tarea.."
              onChange={(text)=>setTask(text.target.value)}
              value={task}
            ></input>
            <button 
              className={editModo ? "btn btn-warning btn-block" : "btn btn-dark btn-block" }
              type="submit"
            >
              {editModo ? "Guardar":"Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
