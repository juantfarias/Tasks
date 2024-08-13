import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import './App.css'

export default function App() {

  const inputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState<string[]>([])
  const firstRender = useRef(true);

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

  useEffect(() =>{
    if(firstRender.current){
      firstRender.current = false;
      return;
    }
    localStorage.setItem('@cursoreact', JSON.stringify(tasks))
  }, [tasks]);


  const handleRegister = useCallback(() => {
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
  }, [input, tasks])
  

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

    inputRef.current?.focus();

    setInput(item)
    SetEditTask({
      enable: true,
      task: item
    })
  } 

  const totalTarefas = useMemo(() => {
    return tasks.length
  }, [tasks])

  return (
      <main>
        <header>
          <p className='title'>Lista de tarefas</p>
          <input type="text"
            placeholder={'Digite o nome da tarefa...'}
            value={input}
            onChange={ (e) => setInput(e.target.value)}
            ref={inputRef}
          />
          <button onClick={handleRegister}>{editTask.enable ? 'Atualizar tarefa' : 'Adicionar tarefa'}</button>
          <br />
          <br />
        <strong>Você tem {totalTarefas} tarefas!</strong>
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

