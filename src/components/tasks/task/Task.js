import {FaTimes} from 'react-icons/fa'; 

const Task = ({task, deleteTask, onToggle}) => {
  return (
    <div className={`task ${task.reminder? 'reminder': ''}`}>
      <h3 onDoubleClick={() => onToggle(task.id)}>{task.title} 
        <FaTimes 
          onClick={() => deleteTask(task.id)} 
          style={{color: 'red', cursor: 'pointer'}}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  )
}

export default Task
