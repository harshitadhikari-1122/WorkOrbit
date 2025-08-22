'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar,
  Clock,
  Users,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Pause
} from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  client: string
  startDate: string
  deadline: string
  progress: number
  budget: number
  team: string[]
  tags: string[]
}

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Website Redesign',
    description: 'Complete redesign of the company website with modern UI/UX',
    status: 'in-progress',
    priority: 'high',
    client: 'TechCorp Solutions',
    startDate: '2024-01-01',
    deadline: '2024-02-15',
    progress: 65,
    budget: 15000,
    team: ['John Doe', 'Jane Smith'],
    tags: ['Web Design', 'UI/UX'],
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'iOS and Android app for e-commerce platform',
    status: 'planning',
    priority: 'urgent',
    client: 'E-commerce Plus',
    startDate: '2024-01-15',
    deadline: '2024-04-30',
    progress: 15,
    budget: 25000,
    team: ['Mike Chen', 'Sarah Johnson'],
    tags: ['Mobile', 'E-commerce'],
  },
  {
    id: '3',
    title: 'Marketing Campaign',
    description: 'Digital marketing campaign for product launch',
    status: 'completed',
    priority: 'medium',
    client: 'Marketing Masters',
    startDate: '2023-12-01',
    deadline: '2024-01-31',
    progress: 100,
    budget: 8000,
    team: ['Emma Rodriguez'],
    tags: ['Marketing', 'Digital'],
  },
  {
    id: '4',
    title: 'Database Migration',
    description: 'Migrate legacy database to cloud infrastructure',
    status: 'on-hold',
    priority: 'low',
    client: 'Consulting Group',
    startDate: '2024-01-10',
    deadline: '2024-03-15',
    progress: 30,
    budget: 12000,
    team: ['David Wilson'],
    tags: ['Database', 'Cloud'],
  },
  {
    id: '5',
    title: 'Brand Identity Design',
    description: 'Create new brand identity and guidelines',
    status: 'in-progress',
    priority: 'medium',
    client: 'Design Studio Pro',
    startDate: '2024-01-05',
    deadline: '2024-02-28',
    progress: 45,
    budget: 6000,
    team: ['Lisa Thompson'],
    tags: ['Branding', 'Design'],
  },
]

const columns = {
  planning: {
    title: 'Planning',
    color: 'bg-blue-100 text-blue-800',
    icon: Clock,
  },
  'in-progress': {
    title: 'In Progress',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle,
  },
  'on-hold': {
    title: 'On Hold',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Pause,
  },
  completed: {
    title: 'Completed',
    color: 'bg-gray-100 text-gray-800',
    icon: CheckCircle,
  },
  cancelled: {
    title: 'Cancelled',
    color: 'bg-red-100 text-red-800',
    icon: AlertCircle,
  },
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    client: '',
    status: 'planning',
    priority: 'medium',
    startDate: new Date().toISOString().slice(0,10),
    deadline: new Date().toISOString().slice(0,10),
    progress: 0,
    budget: 0,
    team: [],
    tags: [],
  })

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const groupedProjects = filteredProjects.reduce((acc, project) => {
    if (!acc[project.status]) {
      acc[project.status] = []
    }
    acc[project.status].push(project)
    return acc
  }, {} as Record<string, Project[]>)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result
    const newProjects = [...projects]
    const [movedProject] = newProjects.splice(source.index, 1)
    movedProject.status = destination.droppableId as Project['status']
    newProjects.splice(destination.index, 0, movedProject)

    setProjects(newProjects)
  }

  const ProjectCard = ({ project }: { project: Project }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-gray-900 text-sm">{project.title}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
      
      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{project.description}</p>
      
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[project.priority]}`}>
          {project.priority}
        </span>
        <span className="text-xs text-gray-500">{project.client}</span>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{new Date(project.deadline).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="h-3 w-3 mr-1" />
          <span>${project.budget.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {project.tags.slice(0, 2).map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 2 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
            +{project.tags.length - 2}
          </span>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage and track your project progress.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white border border-gray-300 rounded-md">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-2 text-sm font-medium rounded-l-md ${
                viewMode === 'kanban'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm font-medium rounded-r-md ${
                viewMode === 'list'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              List
            </button>
          </div>
          <button onClick={() => setIsCreateOpen(true)} className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <select className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
            <option value="">All Clients</option>
            <option value="techcorp">TechCorp Solutions</option>
            <option value="ecommerce">E-commerce Plus</option>
            <option value="marketing">Marketing Masters</option>
          </select>

          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      {viewMode === 'kanban' && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {Object.entries(columns).map(([status, column]) => (
              <div key={status} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <column.icon className="h-4 w-4 mr-2" />
                    <h3 className="font-medium text-gray-900">{column.title}</h3>
                  </div>
                  <span className="bg-white text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                    {groupedProjects[status]?.length || 0}
                  </span>
                </div>
                
                <Droppable droppableId={status}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="min-h-[500px]"
                    >
                      {groupedProjects[status]?.map((project, index) => (
                        <Draggable key={project.id} draggableId={project.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ProjectCard project={project} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.title}</div>
                        <div className="text-sm text-gray-500">{project.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${columns[project.status].color}`}>
                        {columns[project.status].title}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(project.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${project.budget.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsCreateOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Project</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  className="input"
                  value={newProject.title || ''}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <input
                  className="input"
                  value={newProject.client || ''}
                  onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                  placeholder="Client name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="input" value={newProject.status} onChange={(e) => setNewProject({ ...newProject, status: e.target.value as Project['status'] })}>
                    <option value="planning">Planning</option>
                    <option value="in-progress">In Progress</option>
                    <option value="on-hold">On Hold</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="input" value={newProject.priority} onChange={(e) => setNewProject({ ...newProject, priority: e.target.value as Project['priority'] })}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                  <input type="date" className="input" value={newProject.deadline} onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget (USD)</label>
                  <input type="number" className="input" value={newProject.budget || 0} onChange={(e) => setNewProject({ ...newProject, budget: Number(e.target.value) })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="input h-24" value={newProject.description || ''} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} placeholder="Short description" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50" onClick={() => setIsCreateOpen(false)}>Cancel</button>
              <button
                className="px-4 py-2 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700"
                onClick={() => {
                  if (!newProject.title || !newProject.client) return;
                  const created: Project = {
                    id: String(Date.now()),
                    title: newProject.title!,
                    description: newProject.description || '',
                    status: (newProject.status || 'planning') as Project['status'],
                    priority: (newProject.priority || 'medium') as Project['priority'],
                    client: newProject.client!,
                    startDate: newProject.startDate || new Date().toISOString().slice(0,10),
                    deadline: newProject.deadline || new Date().toISOString().slice(0,10),
                    progress: newProject.progress ?? 0,
                    budget: newProject.budget ?? 0,
                    team: [],
                    tags: [],
                  }
                  setProjects((prev) => [created, ...prev])
                  setIsCreateOpen(false)
                  setNewProject({ title: '', description: '', client: '', status: 'planning', priority: 'medium', startDate: new Date().toISOString().slice(0,10), deadline: new Date().toISOString().slice(0,10), progress: 0, budget: 0, team: [], tags: [] })
                }}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}



