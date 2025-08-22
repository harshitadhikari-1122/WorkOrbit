import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@freelancercrm.com' },
    update: {},
    create: {
      email: 'demo@freelancercrm.com',
      name: 'John Doe',
      password: hashedPassword,
      company: 'Freelance Studio',
      phone: '+1 (555) 123-4567',
      timezone: 'America/New_York',
      currency: 'USD',
      hourlyRate: 75,
      bio: 'Full-stack developer with 5+ years of experience in web and mobile development.',
      skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
      website: 'https://johndoe.dev',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
      },
      settings: {
        theme: 'light',
        notifications: {
          email: true,
          push: true,
          sms: false
        }
      }
    },
  })

  console.log('✅ User created:', user.email)

  // Create sample clients
  const clients = await Promise.all([
    prisma.client.create({
      data: {
        name: 'Sarah Johnson',
        email: 'sarah@techcorp.com',
        phone: '+1 (555) 123-4567',
        company: 'TechCorp Solutions',
        website: 'https://techcorp.com',
        address: '123 Business St',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        postalCode: '94105',
        industry: 'Technology',
        source: 'Referral',
        status: 'ACTIVE',
        priority: 'HIGH',
        notes: 'Great client, always pays on time. Interested in long-term projects.',
        tags: ['Technology', 'Enterprise', 'Long-term'],
        avatar: null,
        socialLinks: {
          linkedin: 'https://linkedin.com/in/sarahjohnson'
        },
        customFields: {
          annualRevenue: 5000000,
          employeeCount: 50,
          preferredContact: 'email'
        },
        userId: user.id
      }
    }),
    prisma.client.create({
      data: {
        name: 'Mike Chen',
        email: 'mike@designstudio.com',
        phone: '+1 (555) 234-5678',
        company: 'Design Studio Pro',
        website: 'https://designstudiopro.com',
        address: '456 Creative Ave',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postalCode: '10001',
        industry: 'Design',
        source: 'Website',
        status: 'ACTIVE',
        priority: 'MEDIUM',
        notes: 'Creative agency, needs regular design work. Good communication.',
        tags: ['Design', 'Creative', 'Agency'],
        avatar: null,
        socialLinks: {
          instagram: 'https://instagram.com/designstudiopro'
        },
        customFields: {
          annualRevenue: 2000000,
          employeeCount: 15,
          preferredContact: 'phone'
        },
        userId: user.id
      }
    }),
    prisma.client.create({
      data: {
        name: 'Emma Rodriguez',
        email: 'emma@marketingmasters.com',
        phone: '+1 (555) 345-6789',
        company: 'Marketing Masters',
        website: 'https://marketingmasters.com',
        address: '789 Marketing Blvd',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        postalCode: '90210',
        industry: 'Marketing',
        source: 'Cold Outreach',
        status: 'PROSPECT',
        priority: 'HIGH',
        notes: 'Startup company, looking for affordable solutions. High potential.',
        tags: ['Marketing', 'Startup', 'High Potential'],
        avatar: null,
        socialLinks: {
          twitter: 'https://twitter.com/marketingmasters'
        },
        customFields: {
          annualRevenue: 500000,
          employeeCount: 8,
          preferredContact: 'email'
        },
        userId: user.id
      }
    })
  ])

  console.log('✅ Clients created:', clients.length)

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'Website Redesign',
        description: 'Complete redesign of the company website with modern UI/UX, responsive design, and improved user experience.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-02-15'),
        deadline: new Date('2024-02-15'),
        budget: 15000,
        hourlyRate: 75,
        totalHours: 120,
        progress: 65,
        tags: ['Web Design', 'UI/UX', 'Responsive'],
        customFields: {
          technologies: ['React', 'Next.js', 'Tailwind CSS'],
          deliverables: ['Design mockups', 'Frontend code', 'Documentation']
        },
        userId: user.id,
        clientId: clients[0].id
      }
    }),
    prisma.project.create({
      data: {
        title: 'Mobile App Development',
        description: 'iOS and Android app for e-commerce platform with payment integration and user management.',
        status: 'PLANNING',
        priority: 'URGENT',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-04-30'),
        deadline: new Date('2024-04-30'),
        budget: 25000,
        hourlyRate: 85,
        totalHours: 200,
        progress: 15,
        tags: ['Mobile', 'E-commerce', 'React Native'],
        customFields: {
          technologies: ['React Native', 'Node.js', 'Stripe'],
          deliverables: ['iOS app', 'Android app', 'Backend API']
        },
        userId: user.id,
        clientId: clients[1].id
      }
    }),
    prisma.project.create({
      data: {
        title: 'Marketing Campaign',
        description: 'Digital marketing campaign for product launch including social media, email marketing, and PPC.',
        status: 'COMPLETED',
        priority: 'MEDIUM',
        startDate: new Date('2023-12-01'),
        endDate: new Date('2024-01-31'),
        deadline: new Date('2024-01-31'),
        budget: 8000,
        hourlyRate: 60,
        totalHours: 80,
        progress: 100,
        tags: ['Marketing', 'Digital', 'Campaign'],
        customFields: {
          platforms: ['Facebook', 'Instagram', 'Google Ads'],
          deliverables: ['Campaign strategy', 'Creative assets', 'Performance report']
        },
        userId: user.id,
        clientId: clients[2].id
      }
    })
  ])

  console.log('✅ Projects created:', projects.length)

  // Create sample tasks
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        title: 'Design Homepage Mockup',
        description: 'Create wireframes and design mockups for the homepage',
        status: 'COMPLETED',
        priority: 'HIGH',
        dueDate: new Date('2024-01-20'),
        estimatedHours: 8,
        actualHours: 7.5,
        order: 1,
        tags: ['Design', 'UI/UX'],
        userId: user.id,
        projectId: projects[0].id
      }
    }),
    prisma.task.create({
      data: {
        title: 'Implement Responsive Navigation',
        description: 'Build responsive navigation component with mobile menu',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        dueDate: new Date('2024-01-25'),
        estimatedHours: 6,
        actualHours: 3,
        order: 2,
        tags: ['Development', 'Frontend'],
        userId: user.id,
        projectId: projects[0].id
      }
    }),
    prisma.task.create({
      data: {
        title: 'Set up React Native Environment',
        description: 'Configure development environment for React Native app',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: new Date('2024-01-30'),
        estimatedHours: 4,
        actualHours: null,
        order: 1,
        tags: ['Setup', 'Mobile'],
        userId: user.id,
        projectId: projects[1].id
      }
    })
  ])

  console.log('✅ Tasks created:', tasks.length)

  // Create sample communications
  const communications = await Promise.all([
    prisma.communication.create({
      data: {
        type: 'EMAIL',
        subject: 'Project Update - Website Redesign',
        content: 'Hi Sarah, I wanted to update you on the progress of the website redesign project. We have completed the homepage mockups and are now working on the responsive navigation. Everything is on track for the February 15th deadline.',
        direction: 'OUTBOUND',
        status: 'SENT',
        sentAt: new Date('2024-01-18T10:00:00Z'),
        notes: 'Client was happy with the progress update',
        attachments: ['mockup-homepage.pdf'],
        userId: user.id,
        clientId: clients[0].id,
        projectId: projects[0].id
      }
    }),
    prisma.communication.create({
      data: {
        type: 'CALL',
        subject: 'Project Kickoff Call',
        content: 'Discussed project requirements, timeline, and deliverables for the mobile app development project.',
        direction: 'INBOUND',
        status: 'SENT',
        sentAt: new Date('2024-01-15T14:30:00Z'),
        duration: 45,
        notes: 'Client is excited about the project. Need to send proposal by end of week.',
        userId: user.id,
        clientId: clients[1].id,
        projectId: projects[1].id
      }
    })
  ])

  console.log('✅ Communications created:', communications.length)

  // Create sample invoices
  const invoices = await Promise.all([
    prisma.invoice.create({
      data: {
        invoiceNumber: 'INV-2024-001',
        title: 'Website Redesign - Phase 1',
        description: 'Payment for homepage design and initial development work',
        amount: 7500,
        tax: 600,
        total: 8100,
        currency: 'USD',
        status: 'PAID',
        dueDate: new Date('2024-01-31'),
        sentAt: new Date('2024-01-15T09:00:00Z'),
        paidAt: new Date('2024-01-20T15:30:00Z'),
        paymentMethod: 'Bank Transfer',
        notes: 'Payment received on time. Client was satisfied with the work.',
        items: [
          { description: 'Homepage Design', quantity: 1, rate: 5000, amount: 5000 },
          { description: 'Responsive Navigation', quantity: 1, rate: 2500, amount: 2500 }
        ],
        customFields: {
          paymentTerms: 'Net 15',
          lateFees: '2% per month'
        },
        userId: user.id,
        clientId: clients[0].id,
        projectId: projects[0].id
      }
    }),
    prisma.invoice.create({
      data: {
        invoiceNumber: 'INV-2024-002',
        title: 'Marketing Campaign - Final Payment',
        description: 'Final payment for completed marketing campaign',
        amount: 4000,
        tax: 320,
        total: 4320,
        currency: 'USD',
        status: 'SENT',
        dueDate: new Date('2024-02-15'),
        sentAt: new Date('2024-02-01T11:00:00Z'),
        paidAt: null,
        paymentMethod: null,
        notes: 'Campaign completed successfully. Awaiting payment.',
        items: [
          { description: 'Campaign Management', quantity: 1, rate: 3000, amount: 3000 },
          { description: 'Performance Report', quantity: 1, rate: 1000, amount: 1000 }
        ],
        customFields: {
          paymentTerms: 'Net 30',
          lateFees: '1.5% per month'
        },
        userId: user.id,
        clientId: clients[2].id,
        projectId: projects[2].id
      }
    })
  ])

  console.log('✅ Invoices created:', invoices.length)

  // Create sample leads
  const leads = await Promise.all([
    prisma.lead.create({
      data: {
        name: 'David Wilson',
        email: 'david@consultinggroup.com',
        phone: '+1 (555) 456-7890',
        company: 'Consulting Group',
        source: 'Website Contact Form',
        status: 'CONTACTED',
        priority: 'MEDIUM',
        value: 15000,
        notes: 'Interested in database migration project. Has legacy system that needs modernization.',
        tags: ['Consulting', 'Database', 'Legacy'],
        customFields: {
          companySize: '25 employees',
          industry: 'Consulting',
          timeline: '3-6 months'
        },
        userId: user.id
      }
    }),
    prisma.lead.create({
      data: {
        name: 'Lisa Thompson',
        email: 'lisa@ecommerceplus.com',
        phone: '+1 (555) 567-8901',
        company: 'E-commerce Plus',
        source: 'Referral',
        status: 'QUALIFIED',
        priority: 'HIGH',
        value: 30000,
        notes: 'Referred by Sarah Johnson. Looking for e-commerce platform development.',
        tags: ['E-commerce', 'Referral', 'High Value'],
        customFields: {
          companySize: '50 employees',
          industry: 'E-commerce',
          timeline: '6-12 months'
        },
        userId: user.id
      }
    })
  ])

  console.log('✅ Leads created:', leads.length)

  // Create sample opportunities
  const opportunities = await Promise.all([
    prisma.opportunity.create({
      data: {
        title: 'Database Migration Project',
        description: 'Migrate legacy database system to modern cloud infrastructure',
        value: 15000,
        probability: 75,
        status: 'PROPOSAL',
        expectedCloseDate: new Date('2024-03-15'),
        notes: 'Client is evaluating proposals. Decision expected in 2 weeks.',
        tags: ['Database', 'Migration', 'Cloud'],
        customFields: {
          competitors: ['TechCorp', 'DataFlow'],
          decisionMaker: 'David Wilson',
          budget: '15000-20000'
        },
        userId: user.id,
        leadId: leads[0].id
      }
    })
  ])

  console.log('✅ Opportunities created:', opportunities.length)

  // Create sample notes
  const notes = await Promise.all([
    prisma.note.create({
      data: {
        title: 'Client Meeting Notes',
        content: 'Met with Sarah to discuss the website redesign project. She was very happy with the initial mockups and provided good feedback. Need to incorporate the new branding guidelines she shared.',
        type: 'CLIENT',
        isPrivate: false,
        tags: ['Meeting', 'Feedback', 'Branding'],
        userId: user.id,
        clientId: clients[0].id,
        projectId: projects[0].id
      }
    }),
    prisma.note.create({
      data: {
        title: 'Project Ideas',
        content: 'Potential project ideas for future development: 1) Mobile app for inventory management, 2) Customer portal with analytics, 3) Integration with third-party services',
        type: 'GENERAL',
        isPrivate: true,
        tags: ['Ideas', 'Planning', 'Future'],
        userId: user.id
      }
    })
  ])

  console.log('✅ Notes created:', notes.length)

  // Create sample tags
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: 'High Priority',
        color: '#EF4444',
        userId: user.id
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Web Development',
        color: '#3B82F6',
        userId: user.id
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Design',
        color: '#10B981',
        userId: user.id
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Marketing',
        color: '#F59E0B',
        userId: user.id
      }
    })
  ])

  console.log('✅ Tags created:', tags.length)

  // Create sample reminders
  const reminders = await Promise.all([
    prisma.reminder.create({
      data: {
        title: 'Follow up with Mike Chen',
        description: 'Check on the mobile app project proposal status',
        dueDate: new Date('2024-01-25T10:00:00Z'),
        type: 'FOLLOW_UP',
        priority: 'HIGH',
        isCompleted: false,
        userId: user.id,
        clientId: clients[1].id
      }
    }),
    prisma.reminder.create({
      data: {
        title: 'Send invoice reminder',
        description: 'Send payment reminder for Marketing Campaign invoice',
        dueDate: new Date('2024-02-20T09:00:00Z'),
        type: 'INVOICE',
        priority: 'MEDIUM',
        isCompleted: false,
        userId: user.id,
        clientId: clients[2].id
      }
    })
  ])

  console.log('✅ Reminders created:', reminders.length)

  console.log('🎉 Database seeding completed successfully!')
  console.log('📧 Demo user email: demo@freelancercrm.com')
  console.log('🔑 Demo user password: password123')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



