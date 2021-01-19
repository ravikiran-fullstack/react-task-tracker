import {useState, useEffect} from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/header/Header';
import Tasks from './components/tasks/Tasks';
import Add from './components/add/Add';
import Footer from './components/footer/Footer';
import About from './components/about/About';

function App() {
// state is immutable
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   title: "Doctor Appointment",
    //   day: "Feb 5th at 12:00am",
    //   reminder: true,
    // },
    // {
    //   id: 2,
    //   title: "Meeting at Office",
    //   day: "Feb 6th at 09:00am",
    //   reminder: true,
    // },
    // {
    //   id: 3,
    //   title: "Grocery Shopping",
    //   day: "Feb 7th at 05:00pm",
    //   reminder: false,
    // },
  ]);

  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks();
      console.log(tasksFromServer);
      setTasks(tasksFromServer);
    }  
    getTasks();
  }, []);

  //Fetch tasks
  const fetchTasks = async() => {
    const response = await fetch('http://localhost:5000/tasks');
    const data = await response.json();
    console.log(data);
    return data;
  }

  //Fetch task
   const fetchTask = async(id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await response.json();
    return data;
  }

  const deleteTask = async (id) => {
    console.log('deleteTask ', id);
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'});
    setTasks(tasks.filter((task) => {
      return task.id !== id;
    }));
  }

  const toggleReminder = async (id) => {
    const task = await fetchTask(id);
    const updatedTask = {...task, reminder: !task.reminder};

    const response = await fetch(
                                  `http://localhost:5000/tasks/${id}`,
                                  { 
                                    method: 'PUT',
                                    headers: {
                                      'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(updatedTask)
                                  })
    const data = await response.json();
    setTasks(tasks.map((task) => {
      if(task.id === id){
        return {...task, reminder: data.reminder}
      } else {
        return task;
      } 
    }))
  }

  const addTask = async (task) => {
    console.log('add task', task);
    const res = await fetch('http://localhost:5000/tasks', 
                  { 
                    method: 'POST', 
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)});
    const data = await res.json();                
    setTasks([...tasks, {...data}]);
  }

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  }
  return (
    // <Router>
      
        <div className="container">
          <Header title="Task Tracker" onShow={toggleAddTask} showAddTask={showAddTask}/>
          {showAddTask? <Add addTask={addTask}></Add>: ''}
                {tasks.length > 0 ? (<Tasks tasks={tasks} deleteTask={deleteTask} onToggle={toggleReminder}></Tasks>): (<p>No more tasks</p>)}
          {/* <Route 
            path="/"
            exact
            render={(props) => {
              <>
                {showAddTask? <Add addTask={addTask}></Add>: ''}
                {tasks.length > 0 ? (<Tasks tasks={tasks} deleteTask={deleteTask} onToggle={toggleReminder}></Tasks>): (<p>No more tasks</p>)}
              </>
            }}
          />
          <Route path="/about" component={About}/> */}
          <Footer/>
        </div>
      
    // </Router>
  );
}

export default App;
