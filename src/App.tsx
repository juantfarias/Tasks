import { useState, useEffect, useRef} from 'react'
import './App.css'

export default function App() {

  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState<string[]>([])

  const [editTask, SetEditTask] = useState({
    enable: false,
    task: ''
  })
  useEffect(() => {
    const tarefasSalva = localStorage.getItem("@cursoreact")

    if(tarefasSalva){
      setTasks(JSON.parse(tarefasSalva));
    }
  }, [])

  function handleRegister(){
    if(!input){
      alert('Preencha o nome da sua tarefa!')
      return;
    }

    if(editTask.enable){
      handleSaveEdit();
      return;
    }

    setTasks(tarefas => [...tarefas, input])
    setInput('')
    localStorage.setItem('@cursoreact', JSON.stringify([...tasks, input]))
  }

  function handleSaveEdit(){
    const findIndexTask = tasks.findIndex(task => task === editTask.task)
    const allTasks = [...tasks];

    allTasks[findIndexTask] = input;
    setTasks(allTasks);


    SetEditTask({
      enable: false,
      task: ''
    })
    setInput('')
    localStorage.setItem('@cursoreact', JSON.stringify(allTasks))
  }

  function handleDelete(item: string){
    const removeTask = tasks.filter( task => task !== item)
    setTasks(removeTask)

    localStorage.setItem("@cursoreact", JSON.stringify(removeTask))
  }

  function handleEdit(item: string){
    setInput(item)
    SetEditTask({
      enable: true,
      task: item
    })
  }

  return (
      <main>
        <header>
          <p className='title'>Lista de tarefas</p>
          <input type="text"
            placeholder={'Digite o nome da tarefa...'}
            value={input}
            onChange={ (e) => setInput(e.target.value)}
          />
          <button onClick={handleRegister}>{editTask.enable ? 'Atualizar tarefa' : 'Adicionar tarefa'}</button>
        </header>
        <section className='tasks'>
          {tasks.map((item, index) => (
            <section key={index}>
              <span>- {item}</span>
              <button onClick={ () => handleEdit(item)}>Editar</button>
              <button onClick={ () => handleDelete(item) }>Excluir</button>
            </section>
          ))}
        </section>
      </main>
  )
}

