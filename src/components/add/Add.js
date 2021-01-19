import {useState} from 'react';

const Add = ({addTask}) => {
  const [title, setTitle] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);
  const clearForm = () => {
    setTitle('');
    setDay('');
    setReminder(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if(!title){
      alert('Please add a task');
      return;
    }
    addTask({title, day, reminder}); 
    clearForm();
  }

  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="form-control">
        <label>Task</label>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="add task title"/>
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input 
          type="time" 
          value={day}
          onChange={(e) => setDay(e.target.value)}
          placeholder="add day and time"/>
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input 
          name="reminder" 
          type="checkbox"
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
          />
      </div>

      <input type="submit" className="btn btn-block" value="Save Task"/>
    </form>
  )
}
export default Add;
