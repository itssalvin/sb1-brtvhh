import React from 'react'
import { Task } from '../types'
import { Trash2, Check, TagIcon } from 'lucide-react'

interface TaskListProps {
  tasks: Task[]
  deleteTask: (id: number) => void
  toggleTask: (id: number) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, toggleTask }) => {
  return (
    <ul className="space-y-4">
      {tasks.map(task => (
        <li
          key={task.id}
          className={`flex items-center justify-between p-4 bg-white rounded-lg shadow ${
            task.completed ? 'opacity-50' : ''
          }`}
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                task.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300'
              }`}
            >
              {task.completed && <Check className="w-4 h-4 text-white" />}
            </button>
            <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
          </div>
          <div className="flex items-center space-x-2">
            {task.tags.map(tag => (
              <span
                key={tag}
                className={`px-2 py-1 text-xs rounded-full flex items-center ${
                  tag === 'Work' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}
              >
                <TagIcon className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList