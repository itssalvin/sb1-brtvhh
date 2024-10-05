import React, { useState } from 'react'
import { Inspiration } from '../types'
import { PlusCircle, Trash2, ArrowRight, TagIcon } from 'lucide-react'

interface InspirationAreaProps {
  inspirations: Inspiration[]
  addInspiration: (inspiration: Inspiration) => void
  deleteInspiration: (id: number) => void
  convertInspirationToTask: (inspiration: Inspiration) => void
}

const InspirationArea: React.FC<InspirationAreaProps> = ({
  inspirations,
  addInspiration,
  deleteInspiration,
  convertInspirationToTask,
}) => {
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    const newInspiration: Inspiration = {
      id: Date.now(),
      content: content.trim(),
      tags,
    }
    addInspiration(newInspiration)
    setContent('')
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
    <div>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a new inspiration"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-500 text-white p-2 rounded-r-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
      <ul className="space-y-4">
        {inspirations.map(inspiration => (
          <li
            key={inspiration.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="flex-grow mr-4">
              <p>{inspiration.content}</p>
              <div className="flex mt-2 space-x-2">
                {inspiration.tags.map(tag => (
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
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => convertInspirationToTask(inspiration)}
                className="text-purple-500 hover:text-purple-700"
                title="Convert to Task"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteInspiration(inspiration.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete Inspiration"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InspirationArea