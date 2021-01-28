import { useState } from "react";
import Task from "./Task";

export default function TaskList() {
  // Irá guardar uma lista de tarefas inseridas no input
  // Formato de itens { id, tarefa, concluida }
  const [tasks, setTasks] = useState([]);
  // Guarda lista de tarefas que será renderizada na tela
  // Sofrerá alteração com pesquisa do usuário
  const [rendTasks, setRendTasks] = useState([]);
  // Guarda o valor do input de nova tarefa
  const [newTask, setNewTask] = useState("");
  // Guarda valor de pesquisa
  const [search, setSearch] = useState("");

  // Irá chamar renderização
  const [rendTrigger, setRendTrigger] = useState(false);

  function handleSubmit(e) {
    // Removendo comportamento padrão de redirecionamento de formulário
    e.preventDefault();
    // Permite inserir no status apenas tarefas não vazias
    if (newTask && !!newTask.trim()) {
      let updateTask = tasks;
      updateTask.push({
        id: updateTask.length,
        tarefa: newTask,
        concluida: false
      });
      setTasks(updateTask);
      setRendTasks(updateTask);
      setNewTask("");
    }
  }

  // Função para marcar/desmarcar item da lista de tarefas
  function checkItem(id) {
    let updateTask = tasks;
    let index = updateTask.findIndex(item => item.id === id);
    if (index !== -1) {
      updateTask[index].concluida = !updateTask[index].concluida;
    }
    setTasks(updateTask);
    setRendTrigger(!rendTrigger);
  }

  // Função auxiliar para retorno do número de tareas concluídas
  function countCheckTasks() {
    let total = 0;
    rendTasks.forEach(item => {
      if (item.concluida) total++;
    });
    return total;
  }

  // Pesquisa valores sobre lista de tarefas renderizadas sempre que o input muda
  function handleSearch(e) {
    const value = e.target.value;
    const filtered = tasks.filter(item => item.tarefa.toLowerCase().includes(value.toLowerCase()));
    setRendTasks(filtered);
    setSearch(value);
  }

  return (
    <main>
      <form onSubmit={handleSubmit} >
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} />
        <button type="submit" > Inserir </button>
      </form>
      {
        rendTasks.map((item, index) => {
          return (
            <Task
              key={index}
              data={item}
              index={index + 1}
              onCheck={() => checkItem(item.id)}
            />)
        })
      }
      <hr style={{ width: '100%' }} />
      <form onSubmit={handleSubmit} >
        <p> Tarefas Pendentes: {countCheckTasks()}/{rendTasks.length} </p>
        <input
          value={search}
          onChange={handleSearch} />
      </form>
    </main>
  )

}