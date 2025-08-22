'use client'

import { useMemo, useState } from 'react'
import { Search, Filter, Plus, Calendar, DollarSign, Eye, Edit, Send } from 'lucide-react'

type InvoiceStatus = 'DRAFT' | 'SENT' | 'VIEWED' | 'PAID' | 'OVERDUE' | 'CANCELLED'

interface InvoiceRow {
	id: string
	invoiceNumber: string
	title: string
	client: string
	amount: number
	tax: number
	total: number
	status: InvoiceStatus
	dueDate: string
	sentAt?: string
}

const statusColors: Record<InvoiceStatus, string> = {
	DRAFT: 'bg-gray-100 text-gray-800',
	SENT: 'bg-blue-100 text-blue-800',
	VIEWED: 'bg-purple-100 text-purple-800',
	PAID: 'bg-green-100 text-green-800',
	OVERDUE: 'bg-red-100 text-red-800',
	CANCELLED: 'bg-gray-100 text-gray-600',
}

const invoicesSeed: InvoiceRow[] = [
	{ id: '1', invoiceNumber: 'INV-2024-001', title: 'Website Redesign - Phase 1', client: 'TechCorp Solutions', amount: 7500, tax: 600, total: 8100, status: 'PAID', dueDate: '2024-01-31', sentAt: '2024-01-15' },
	{ id: '2', invoiceNumber: 'INV-2024-002', title: 'Marketing Campaign - Final Payment', client: 'Marketing Masters', amount: 4000, tax: 320, total: 4320, status: 'SENT', dueDate: '2024-02-15', sentAt: '2024-02-01' },
	{ id: '3', invoiceNumber: 'INV-2024-003', title: 'Mobile App - Milestone 1', client: 'E-commerce Plus', amount: 9000, tax: 720, total: 9720, status: 'VIEWED', dueDate: '2024-03-05', sentAt: '2024-02-27' },
	{ id: '4', invoiceNumber: 'INV-2024-004', title: 'Consulting - January', client: 'Consulting Group', amount: 2000, tax: 0, total: 2000, status: 'OVERDUE', dueDate: '2024-01-20', sentAt: '2024-01-10' },
	{ id: '5', invoiceNumber: 'INV-2024-005', title: 'Design Sprint', client: 'Design Studio Pro', amount: 3200, tax: 256, total: 3456, status: 'DRAFT', dueDate: '2024-03-20' },
]

export default function InvoicesPage() {
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState<'ALL' | InvoiceStatus>('ALL')
	const [invoiceList, setInvoiceList] = useState<InvoiceRow[]>(invoicesSeed)
	const [isCreateOpen, setIsCreateOpen] = useState(false)
	const [newInvoice, setNewInvoice] = useState<Partial<InvoiceRow>>({
		invoiceNumber: '',
		title: '',
		client: '',
		amount: 0,
		tax: 0,
		total: 0,
		status: 'DRAFT',
		dueDate: new Date().toISOString().slice(0, 10),
	})

	const filtered = useMemo(() => {
		return invoiceList.filter((inv) => {
			const matchesSearch = [inv.invoiceNumber, inv.title, inv.client]
				.join(' ')
				.toLowerCase()
				.includes(search.toLowerCase())
			const matchesStatus = statusFilter === 'ALL' || inv.status === statusFilter
			return matchesSearch && matchesStatus
		})
	}, [search, statusFilter, invoiceList])

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
					<p className="text-gray-600">Create, send, and track client invoices.</p>
				</div>
				<button onClick={() => setIsCreateOpen(true)} className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 inline-flex items-center">
					<Plus className="h-4 w-4 mr-2" /> New Invoice
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
							placeholder="Search by number, title, or client..."
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
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filtered.map((inv) => (
								<tr key={inv.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="font-medium text-gray-900">{inv.invoiceNumber}</div>
										<div className="text-gray-500 text-sm">{inv.title}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inv.client}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										<div className="flex items-center">
											<DollarSign className="h-4 w-4 text-gray-400" />
											{inv.total.toLocaleString()}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[inv.status]}`}>{inv.status}</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										<div className="flex items-center">
											<Calendar className="h-4 w-4 text-gray-400 mr-2" />
											{new Date(inv.dueDate).toLocaleDateString()}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<div className="flex items-center gap-2 justify-end">
											<button className="text-gray-400 hover:text-gray-600"><Eye className="h-4 w-4"/></button>
											<button className="text-gray-400 hover:text-gray-600"><Edit className="h-4 w-4"/></button>
											<button className="text-gray-400 hover:text-primary-600"><Send className="h-4 w-4"/></button>
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
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Create Invoice</h3>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
								<input className="input" value={newInvoice.invoiceNumber || ''} onChange={(e)=>setNewInvoice({...newInvoice, invoiceNumber:e.target.value})} placeholder="INV-2024-006"/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
								<input className="input" value={newInvoice.title || ''} onChange={(e)=>setNewInvoice({...newInvoice, title:e.target.value})} placeholder="Work description"/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
								<input className="input" value={newInvoice.client || ''} onChange={(e)=>setNewInvoice({...newInvoice, client:e.target.value})} placeholder="Client name"/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
									<input type="number" className="input" value={newInvoice.amount || 0} onChange={(e)=>{
										const amount = Number(e.target.value)
										setNewInvoice({...newInvoice, amount, total: (amount + (newInvoice.tax||0))})
									}}/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Tax</label>
									<input type="number" className="input" value={newInvoice.tax || 0} onChange={(e)=>{
										const tax = Number(e.target.value)
										setNewInvoice({...newInvoice, tax, total: (tax + (newInvoice.amount||0))})
									}}/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
									<input type="number" className="input" value={newInvoice.total || 0} onChange={(e)=>setNewInvoice({...newInvoice, total:Number(e.target.value)})}/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
								<input type="date" className="input" value={newInvoice.dueDate as any} onChange={(e)=>setNewInvoice({...newInvoice, dueDate:e.target.value})}/>
							</div>
						</div>
						<div className="mt-6 flex justify-end gap-3">
							<button className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50" onClick={()=>setIsCreateOpen(false)}>Cancel</button>
							<button className="px-4 py-2 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700" onClick={()=>{
								if (!newInvoice.invoiceNumber || !newInvoice.title || !newInvoice.client) return
								const created: InvoiceRow = {
									id: String(Date.now()),
									invoiceNumber: newInvoice.invoiceNumber!,
									title: newInvoice.title!,
									client: newInvoice.client!,
									amount: newInvoice.amount || 0,
									tax: newInvoice.tax || 0,
									total: newInvoice.total || 0,
									status: (newInvoice.status || 'DRAFT') as InvoiceStatus,
									dueDate: (newInvoice.dueDate as string) || new Date().toISOString().slice(0,10),
									sentAt: undefined,
								}
								setInvoiceList([created, ...invoiceList])
								setIsCreateOpen(false)
								setNewInvoice({ invoiceNumber: '', title: '', client: '', amount: 0, tax: 0, total: 0, status: 'DRAFT', dueDate: new Date().toISOString().slice(0,10) })
							}}>Create Invoice</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
