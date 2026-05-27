'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchForm() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    if (!query.trim()) return

    router.push(
      `/search?q=${encodeURIComponent(query)}`
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2"
    >
      <input
        type="text"
        placeholder="Search venues..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="
          border
          rounded-lg
          px-3
          py-2
          text-sm
          w-48
        "
      />

      <button
        type="submit"
        className="
          px-3
          py-2
          rounded-lg
          bg-blue-600
          text-white
          hover:bg-blue-700
        "
      >
        Search
      </button>
    </form>
  )
}