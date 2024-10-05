import React, { useState } from 'react'
import { Task } from '../types'
import { PlusCircle, TagIcon } from 'lucide-react'

interface TaskFormProps {
  addTask: (task: Task) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      tags,
    }
    addTask(newTask)
    setTitle('')
    setTags([])
  }

  const toggleTag = (tag: string) => {
    setTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => toggleTag('Work')}
          className={`px-3 py-1 rounded-full flex items-center ${
            tags.includes('Work')
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          <TagIcon className="w-4 h-4 mr-1" /> Work
        </button>
        <button
          type="button"
          onClick={() => toggleTag('Study')}
          className={`px-3 py-1 rounded-full flex items-center ${
            tags.includes('Study')
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          <TagIcon className="w-4 h-4 mr-1" /> Study
        </button>
      </div>
    </form>
  )
}

export default TaskForm