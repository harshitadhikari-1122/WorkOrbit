'use client'

import { useMemo, useState } from 'react'
import { Calendar as CalendarIcon, Clock, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react'

 interface EventItem {
  id: string
  title: string
  date: string
  time: string
  type: 'MEETING' | 'CALL' | 'DEADLINE' | 'FOLLOW_UP'
  client?: string
 }

 const eventsSeed: EventItem[] = [
  { id: '1', title: 'Kickoff Meeting - Mobile App', date: '2024-02-10', time: '09:00', type: 'MEETING', client: 'E-commerce Plus' },
  { id: '2', title: 'Invoice Due - Marketing Campaign', date: '2024-02-15', time: '17:00', type: 'DEADLINE', client: 'Marketing Masters' },
  { id: '3', title: 'Follow up with Mike', date: '2024-02-20', time: '10:00', type: 'FOLLOW_UP', client: 'Design Studio Pro' },
  { id: '4', title: 'Client Call - Progress Review', date: '2024-02-22', time: '14:00', type: 'CALL', client: 'TechCorp Solutions' },
 ]

 function monthLabel(date: Date) {
  return date.toLocaleString('default', { month: 'long', year: 'numeric' })
 }

 export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthEvents = useMemo(() => {
    const y = currentMonth.getFullYear()
    const m = currentMonth.getMonth()
    return eventsSeed.filter(e => {
      const d = new Date(e.date)
      return d.getFullYear() === y && d.getMonth() === m
    }).sort((a,b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
  }, [currentMonth])

  const changeMonth = (delta: number) => {
    const next = new Date(currentMonth)
    next.setMonth(currentMonth.getMonth() + delta)
    setCurrentMonth(next)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Your events, deadlines, meetings, and follow-ups.</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 inline-flex items-center">
          <Plus className="h-4 w-4 mr-2" /> New Event
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => changeMonth(-1)} className="p-2 rounded-md hover:bg-gray-50"><ChevronLeft className="h-5 w-5"/></button>
          <div className="font-medium">{monthLabel(currentMonth)}</div>
          <button onClick={() => changeMonth(1)} className="p-2 rounded-md hover:bg-gray-50"><ChevronRight className="h-5 w-5"/></button>
        </div>
        <div className="text-gray-500 text-sm flex items-center gap-2">
          <CalendarIcon className="h-4 w-4"/> Month view
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 font-medium">Upcoming in {monthLabel(currentMonth)}</div>
        <div className="divide-y divide-gray-200">
          {monthEvents.length === 0 && (
            <div className="p-6 text-gray-500 text-sm">No events this month.</div>
          )}
          {monthEvents.map(evt => (
            <div key={evt.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div>
                <div className="font-medium text-gray-900">{evt.title}</div>
                <div className="text-sm text-gray-600">{evt.client ?? 'General'} • {evt.type}</div>
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-3">
                <div className="flex items-center"><CalendarIcon className="h-4 w-4 mr-1"/>{new Date(evt.date).toLocaleDateString()}</div>
                <div className="flex items-center"><Clock className="h-4 w-4 mr-1"/>{evt.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
 }
