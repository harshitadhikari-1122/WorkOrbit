'use client'

import { useMemo, useState } from 'react'
import { Search, Filter, Plus, DollarSign, Eye, Edit } from 'lucide-react'

type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'NEGOTIATION' | 'WON' | 'LOST'

type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH'

interface LeadRow {
	id: string
	name: string
	company?: string
	email?: string
	phone?: string
	status: LeadStatus
	priority: LeadPriority
	value?: number
	source?: string
	createdAt: string
	nextStep?: string
}

const statusColors: Record<LeadStatus, string> = {
	NEW: 'bg-blue-100 text-blue-800',
	CONTACTED: 'bg-indigo-100 text-indigo-800',
	QUALIFIED: 'bg-purple-100 text-purple-800',
	PROPOSAL_SENT: 'bg-yellow-100 text-yellow-800',
	NEGOTIATION: 'bg-orange-100 text-orange-800',
	WON: 'bg-green-100 text-green-800',
	LOST: 'bg-gray-100 text-gray-600',
}

const priorityColors: Record<LeadPriority, string> = {
	HIGH: 'bg-red-100 text-red-800',
	MEDIUM: 'bg-yellow-100 text-yellow-800',
	LOW: 'bg-green-100 text-green-800',
}

const leadsSeed: LeadRow[] = [
	{ id: '1', name: 'David Wilson', company: 'Consulting Group', email: 'david@consultinggroup.com', status: 'CONTACTED', priority: 'MEDIUM', value: 15000, source: 'Website', createdAt: '2024-01-12', nextStep: 'Schedule demo' },
	{ id: '2', name: 'Lisa Thompson', company: 'E-commerce Plus', email: 'lisa@ecommerceplus.com', status: 'QUALIFIED', priority: 'HIGH', value: 30000, source: 'Referral', createdAt: '2024-01-18', nextStep: 'Send proposal' },
	{ id: '3', name: 'Emma Rodriguez', company: 'Marketing Masters', email: 'emma@marketingmasters.com', status: 'NEW', priority: 'HIGH', value: 8000, source: 'Cold Outreach', createdAt: '2024-01-22', nextStep: 'Discovery call' },
	{ id: '4', name: 'Mike Chen', company: 'Design Studio Pro', email: 'mike@designstudio.com', status: 'PROPOSAL_SENT', priority: 'MEDIUM', value: 12000, source: 'Website', createdAt: '2024-01-25', nextStep: 'Follow up' },
]

export default function LeadsPage() {
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState<'ALL' | LeadStatus>('ALL')
	const [priorityFilter, setPriorityFilter] = useState<'ALL' | LeadPriority>('ALL')
	const [leadList, setLeadList] = useState<LeadRow[]>(leadsSeed)
	const [isCreateOpen, setIsCreateOpen] = useState(false)
	const [newLead, setNewLead] = useState<Partial<LeadRow>>({
		name: '',
		company: '',
		email: '',
		status: 'NEW',
		priority: 'MEDIUM',
		value: 0,
		source: 'Website',
		nextStep: '',
	})

	const filtered = useMemo(() => {
		return leadList.filter((lead) => {
			const matchesSearch = [lead.name, lead.company ?? '', lead.email ?? '']
				.join(' ')
				.toLowerCase()
				.includes(search.toLowerCase())
			const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter
			const matchesPriority = priorityFilter === 'ALL' || lead.priority === priorityFilter
			return matchesSearch && matchesStatus && matchesPriority
		})
	}, [search, statusFilter, priorityFilter, leadList])

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Leads</h1>
					<p className="text-gray-600">Capture and manage potential clients across your pipeline.</p>
				</div>
				<button onClick={() => setIsCreateOpen(true)} className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 inline-flex items-center">
					<Plus className="h-4 w-4 mr-2" /> New Lead
				</button>
			</div>

			<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Search className="h-5 w-5 text-gray-400" />
						</div>
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search leads..."
							className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
						/>
					</div>

					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value as any)}
						className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
					>
						<option value="ALL">All Statuses</option>
						{Object.keys(statusColors).map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>

					<select
						value={priorityFilter}
						onChange={(e) => setPriorityFilter(e.target.value as any)}
						className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
					>
						<option value="ALL">All Priorities</option>
						<option value="HIGH">High</option>
						<option value="MEDIUM">Medium</option>
						<option value="LOW">Low</option>
					</select>

					<button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
						<Filter className="h-4 w-4 mr-2" /> More Filters
					</button>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Step</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filtered.map((lead) => (
								<tr key={lead.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="font-medium text-gray-900">{lead.name}</div>
										<div className="text-sm text-gray-500">{lead.email ?? '—'}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.company ?? '—'}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>{lead.status}</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[lead.priority]}`}>{lead.priority}</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										<div className="flex items-center">
											<DollarSign className="h-4 w-4 text-gray-400" />
											{(lead.value ?? 0).toLocaleString()}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(lead.createdAt).toLocaleDateString()}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.nextStep ?? '—'}</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<div className="flex items-center gap-2 justify-end">
											<button className="text-gray-400 hover:text-gray-600"><Eye className="h-4 w-4"/></button>
											<button className="text-gray-400 hover:text-gray-600"><Edit className="h-4 w-4"/></button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{isCreateOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div className="absolute inset-0 bg-black/40" onClick={() => setIsCreateOpen(false)} />
					<div className="relative bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-lg p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Lead</h3>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
								<input className="input" value={newLead.name || ''} onChange={(e)=>setNewLead({...newLead, name:e.target.value})} placeholder="Lead name"/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
									<input className="input" value={newLead.company || ''} onChange={(e)=>setNewLead({...newLead, company:e.target.value})} placeholder="Company"/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
									<input className="input" value={newLead.email || ''} onChange={(e)=>setNewLead({...newLead, email:e.target.value})} placeholder="Email"/>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
									<select className="input" value={newLead.status as any} onChange={(e)=>setNewLead({...newLead, status:e.target.value as LeadStatus})}>
										{Object.keys(statusColors).map(s => (<option key={s} value={s}>{s}</option>))}
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
									<select className="input" value={newLead.priority as any} onChange={(e)=>setNewLead({...newLead, priority:e.target.value as LeadPriority})}>
										<option value="HIGH">High</option>
										<option value="MEDIUM">Medium</option>
										<option value="LOW">Low</option>
									</select>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Value (USD)</label>
									<input type="number" className="input" value={newLead.value || 0} onChange={(e)=>setNewLead({...newLead, value:Number(e.target.value)})} />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
									<input className="input" value={newLead.source || ''} onChange={(e)=>setNewLead({...newLead, source:e.target.value})} placeholder="Source"/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Next Step</label>
								<input className="input" value={newLead.nextStep || ''} onChange={(e)=>setNewLead({...newLead, nextStep:e.target.value})} placeholder="e.g. Schedule demo"/>
							</div>
						</div>
						<div className="mt-6 flex justify-end gap-3">
							<button className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50" onClick={()=>setIsCreateOpen(false)}>Cancel</button>
							<button className="px-4 py-2 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700" onClick={() => {
								if (!newLead.name) return
								const created: LeadRow = {
									id: String(Date.now()),
									name: newLead.name!,
									company: newLead.company,
									email: newLead.email,
									status: (newLead.status as LeadStatus) || 'NEW',
									priority: (newLead.priority as LeadPriority) || 'MEDIUM',
									value: newLead.value || 0,
									source: newLead.source,
									createdAt: new Date().toISOString(),
									nextStep: newLead.nextStep,
								}
								setLeadList([created, ...leadList])
								setIsCreateOpen(false)
								setNewLead({ name: '', company: '', email: '', status: 'NEW', priority: 'MEDIUM', value: 0, source: 'Website', nextStep: '' })
							}}>Create Lead</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
