import React, { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import InspirationArea from './components/InspirationArea'
import { Task, Inspiration } from './types'
import { TagIcon } from 'lucide-react'

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [inspirations, setInspirations] = useState<Inspiration[]>(() => {
    const savedInspirations = localStorage.getItem('inspirations')
    return savedInspirations ? JSON.parse(savedInspirations) : []
  })
  const [activeTag, setActiveTag] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('inspirations', JSON.stringify(inspirations))
  }, [inspirations])

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const addInspiration = (inspiration: Inspiration) => {
    setInspirations([...inspirations, inspiration])
  }

  const deleteInspiration = (id: number) => {
    setInspirations(inspirations.filter(insp => insp.id !== id))
  }

  const convertInspirationToTask = (inspiration: Inspiration) => {
    const newTask: Task = {
      id: Date.now(),
      title: inspiration.content,
      completed: false,
      tags: inspiration.tags,
    }
    addTask(newTask)
    deleteInspiration(inspiration.id)
  }

  const filteredTasks = activeTag
    ? tasks.filter(task => task.tags.includes(activeTag))
    : tasks

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Yes！Bro！树树 Todo-List</h1>
        <div className="mb-6 flex justify-center space-x-4">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-4 py-2 rounded ${
              activeTag === null ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTag('Work')}
            className={`px-4 py-2 rounded flex items-center ${
              activeTag === 'Work' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <TagIcon className="w-4 h-4 mr-2" /> Work
          </button>
          <button
            onClick={() => setActiveTag('Study')}
            className={`px-4 py-2 rounded flex items-center ${
              activeTag === 'Study' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <TagIcon className="w-4 h-4 mr-2" /> Study
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Tasks</h2>
            <TaskForm addTask={addTask} />
            <TaskList
              tasks={filteredTasks}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Inspiration Area</h2>
            <InspirationArea
              inspirations={inspirations}
              addInspiration={addInspiration}
              deleteInspiration={deleteInspiration}
              convertInspirationToTask={convertInspirationToTask}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App