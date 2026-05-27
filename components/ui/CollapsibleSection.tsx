'use client'

import { useState, ReactNode } from 'react'

interface CollapsibleSectionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="mb-6 border rounded-xl overflow-x-auto">
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          px-4
          py-3
          flex
          justify-between
          items-center
          bg-gray-100
          hover:bg-gray-200
          transition
        "
      >
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <span className="text-2xl">
          {open ? '−' : '+'}
        </span>
      </button>

      {open && (
        <div className="p-4">
          {children}
        </div>
      )}
    </section>
  )
}