'use client'

import { useEffect, useId, useRef, useState } from 'react'

type DropdownProps = {
  label: string
  name: string
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
}

export default function Dropdown({ label, name, options, value, onChange, placeholder = 'Select', required }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const choose = (v: string) => {
    onChange(v)
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') return setOpen(false)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) return setOpen(true)
      setHighlight((h) => (h + (e.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length)
    }
    if (e.key === 'Enter' && open) {
      e.preventDefault()
      choose(options[highlight])
    }
  }

  return (
    <div ref={root} className="relative">
      <label id={`${id}-label`} className="block text-[11px] uppercase tracking-[0.08em] text-[var(--olyce-muted)] mb-2">
        {label}
        {required ? ' *' : ''}
      </label>
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        onClick={() => {
          setHighlight(Math.max(0, options.indexOf(value)))
          setOpen((o) => !o)
        }}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center justify-between border-b px-0 py-3 text-left text-[16px] transition-colors focus:outline-none ${
          open ? 'border-[var(--gsm-gold)]' : 'border-white/20 hover:border-white/50'
        } ${value ? 'text-[var(--olyce-ink)]' : 'text-[var(--olyce-muted)]'}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <svg viewBox="0 0 12 8" className={`h-2 w-3 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M1 1.5l5 5 5-5" />
        </svg>
      </button>
      <input type="hidden" name={name} value={value} required={required} />

      {open ? (
        <ul
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="absolute z-30 mt-1 max-h-64 w-full overflow-auto border border-white/15 bg-[#0a1614] shadow-2xl"
        >
          {options.map((o, i) => (
            <li
              key={o}
              role="option"
              aria-selected={o === value}
              onMouseEnter={() => setHighlight(i)}
              onMouseDown={(e) => {
                e.preventDefault()
                choose(o)
              }}
              className={`cursor-pointer px-4 py-3 text-[14px] ${
                i === highlight ? 'bg-white/5 text-[var(--gsm-gold)]' : 'text-[var(--olyce-ink)]'
              } ${o === value ? 'font-medium' : ''}`}
            >
              {o}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
