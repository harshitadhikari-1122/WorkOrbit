'use client'

import { useMemo, useState } from 'react'
import { Search, Filter, Mail, Phone, MessageSquare, Calendar, Clock, Plus } from 'lucide-react'

type CommunicationType = 'EMAIL' | 'CALL' | 'MEETING' | 'MESSAGE'
 type Direction = 'INBOUND' | 'OUTBOUND'

 interface CommunicationRow {
	id: string
	type: CommunicationType
	subject: string
	client: string
	direction: Direction
	status: 'DRAFT' | 'SCHEDULED' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED'
	time: string
	notes?: string
 }

 const typeIcon: Record<CommunicationType, any> = {
	EMAIL: Mail,
	CALL: Phone,
	MEETING: Calendar,
	MESSAGE: MessageSquare,
 }

 const communicationsSeed: CommunicationRow[] = [
	{ id: '1', type: 'EMAIL', subject: 'Project Update - Website Redesign', client: 'TechCorp Solutions', direction: 'OUTBOUND', status: 'SENT', time: '2024-01-18T10:00:00Z', notes: 'Client happy with progress' },
	{ id: '2', type: 'CALL', subject: 'Kickoff Call - Mobile App', client: 'E-commerce Plus', direction: 'INBOUND', status: 'SENT', time: '2024-01-15T14:30:00Z', notes: 'Need proposal by end of week' },
	{ id: '3', type: 'MEETING', subject: 'Roadmap Planning', client: 'Marketing Masters', direction: 'OUTBOUND', status: 'SCHEDULED', time: '2024-02-10T09:00:00Z' },
	{ id: '4', type: 'MESSAGE', subject: 'Design Feedback', client: 'Design Studio Pro', direction: 'INBOUND', status: 'READ', time: '2024-02-05T12:15:00Z' },
 ]

 export default function CommunicationsPage() {
	const [search, setSearch] = useState('')
	const [typeFilter, setTypeFilter] = useState<'ALL' | CommunicationType>('ALL')
	const [items, setItems] = useState<CommunicationRow[]>(communicationsSeed)
	const [isCreateOpen, setIsCreateOpen] = useState(false)
	const [form, setForm] = useState<Partial<CommunicationRow>>({ type: 'EMAIL', direction: 'OUTBOUND', status: 'DRAFT', subject: '', client: '', time: new Date().toISOString() })

	const filtered = useMemo(() => {
		return items.filter((c) => {
			const matchesSearch = [c.subject, c.client].join(' ').toLowerCase().includes(search.toLowerCase())
			const matchesType = typeFilter === 'ALL' || c.type === typeFilter
			return matchesSearch && matchesType
		})
	}, [search, typeFilter, items])

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Communications</h1>
					<p className="text-gray-600">Log and track emails, calls, messages, and meetings.</p>
				</div>
				<button onClick={() => setIsCreateOpen(true)} className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 inline-flex items-center">
					<Plus className="h-4 w-4 mr-2" /> New Communication
				</button>
			</div>

			<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Search className="h-5 w-5 text-gray-400" />
						</div>
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search communications..."
							className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
						/>
					</div>
					<select
						value={typeFilter}
						onChange={(e) => setTypeFilter(e.target.value as any)}
						className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
					>
						<option value="ALL">All Types</option>
						<option value="EMAIL">Email</option>
						<option value="CALL">Call</option>
						<option value="MEETING">Meeting</option>
						<option value="MESSAGE">Message</option>
					</select>
					<button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
						<Filter className="h-4 w-4 mr-2" /> More Filters
					</button>
				</div>
			</div>

			<div className="space-y-4">
				{filtered.map((c) => {
					const Icon = typeIcon[c.type]
					return (
						<div key={c.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
							<div className="flex items-start justify-between">
								<div className="flex items-start gap-3">
									<div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
										<Icon className="h-5 w-5 text-primary-600" />
									</div>
									<div>
										<div className="font-medium text-gray-900">{c.subject}</div>
										<div className="text-sm text-gray-600">{c.client} • {c.type} • {c.direction}</div>
										<div className="text-xs text-gray-500 mt-1 flex items-center"><Clock className="h-3 w-3 mr-1"/>{new Date(c.time).toLocaleString()}</div>
										{c.notes && <div className="text-sm text-gray-700 mt-2">{c.notes}</div>}
									</div>
								</div>
								<div>
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{c.status}</span>
								</div>
							</div>
						</div>
					)
				})}
			</div>

			{isCreateOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div className="absolute inset-0 bg-black/40" onClick={() => setIsCreateOpen(false)} />
					<div className="relative bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-lg p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Log Communication</h3>
						<div className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
									<select className="input" value={form.type as any} onChange={(e)=>setForm({...form, type:e.target.value as CommunicationType})}>
										<option value="EMAIL">Email</option>
										<option value="CALL">Call</option>
										<option value="MEETING">Meeting</option>
										<option value="MESSAGE">Message</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
									<select className="input" value={form.direction as any} onChange={(e)=>setForm({...form, direction:e.target.value as Direction})}>
										<option value="OUTBOUND">Outbound</option>
										<option value="INBOUND">Inbound</option>
									</select>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
								<input className="input" value={form.client || ''} onChange={(e)=>setForm({...form, client:e.target.value})} placeholder="Client name"/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
								<input className="input" value={form.subject || ''} onChange={(e)=>setForm({...form, subject:e.target.value})} placeholder="Subject"/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">When</label>
								<input type="datetime-local" className="input" value={new Date(form.time || '').toISOString().slice(0,16)} onChange={(e)=>setForm({...form, time:new Date(e.target.value).toISOString()})}/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
								<textarea className="input h-24" value={form.notes || ''} onChange={(e)=>setForm({...form, notes:e.target.value})} placeholder="Optional notes"/>
							</div>
						</div>
						<div className="mt-6 flex justify-end gap-3">
							<button className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50" onClick={()=>setIsCreateOpen(false)}>Cancel</button>
							<button className="px-4 py-2 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700" onClick={()=>{
								if (!form.client || !form.subject) return
								const created: CommunicationRow = {
									id: String(Date.now()),
									type: (form.type as CommunicationType) || 'EMAIL',
									subject: form.subject!,
									client: form.client!,
									direction: (form.direction as Direction) || 'OUTBOUND',
									status: (form.status as any) || 'DRAFT',
									time: form.time || new Date().toISOString(),
									notes: form.notes,
								}
								setItems([created, ...items])
								setIsCreateOpen(false)
								setForm({ type: 'EMAIL', direction: 'OUTBOUND', status: 'DRAFT', subject: '', client: '', time: new Date().toISOString() })
							}}>Log</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
 }
