import { Job } from '../types';

export const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $180,000',
    description: 'We are looking for a Senior Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies. The ideal candidate has strong experience with Node.js, React, and cloud services.',
    requirements: [
      '5+ years of experience in full-stack development',
      'Proficiency in Node.js, Express.js, and React',
      'Experience with PostgreSQL and MongoDB',
      'Knowledge of AWS or GCP',
      'Strong problem-solving skills'
    ],
    skills: ['Node.js', 'React', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
    posted: '2 days ago',
    category: 'Engineering',
    logo: '🏢',
    applicants: 45
  },
  {
    id: '2',
    title: 'AI/ML Engineer',
    company: 'DataMinds AI',
    location: 'Remote',
    type: 'Remote',
    salary: '$140,000 - $200,000',
    description: 'Join our AI team to build cutting-edge machine learning models and deploy them at scale. You will work on natural language processing, computer vision, and predictive analytics projects.',
    requirements: [
      'MS/PhD in Computer Science or related field',
      '3+ years of experience in ML/AI',
      'Strong Python skills with TensorFlow/PyTorch',
      'Experience with LLMs and generative AI',
      'Published research is a plus'
    ],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision', 'MLOps'],
    posted: '1 day ago',
    category: 'AI/ML',
    logo: '🤖',
    applicants: 78
  },
  {
    id: '3',
    title: 'Backend Developer (Node.js)',
    company: 'StartupHub',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$100,000 - $140,000',
    description: 'We need a talented Backend Developer to build scalable APIs and microservices. You will work with Express.js, implement authentication with JWT and Passport.js, and manage databases with Prisma.',
    requirements: [
      '3+ years of Node.js experience',
      'Expert knowledge of Express.js framework',
      'Experience with REST APIs and GraphQL',
      'Database design with PostgreSQL/MongoDB',
      'Understanding of microservices architecture'
    ],
    skills: ['Node.js', 'Express.js', 'Prisma', 'JWT', 'MongoDB', 'Socket.io'],
    posted: '3 days ago',
    category: 'Engineering',
    logo: '🚀',
    applicants: 32
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudScale Inc',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$130,000 - $170,000',
    description: 'Looking for a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. Experience with Kubernetes, Docker, and cloud platforms is essential.',
    requirements: [
      '4+ years of DevOps experience',
      'Expertise in AWS/GCP/Azure',
      'Strong Kubernetes and Docker skills',
      'Experience with Terraform and Ansible',
      'CI/CD pipeline management'
    ],
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Linux'],
    posted: '5 days ago',
    category: 'DevOps',
    logo: '☁️',
    applicants: 28
  },
  {
    id: '5',
    title: 'Frontend Developer (React)',
    company: 'DesignFirst Studio',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$90,000 - $130,000',
    description: 'Join our creative team to build beautiful and performant user interfaces. You will work closely with designers to implement pixel-perfect designs using React and modern CSS.',
    requirements: [
      '3+ years of React experience',
      'Strong CSS/Tailwind skills',
      'Experience with TypeScript',
      'Knowledge of state management (Redux/Zustand)',
      'Eye for design and UX'
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Figma', 'Jest'],
    posted: '1 week ago',
    category: 'Engineering',
    logo: '🎨',
    applicants: 56
  },
  {
    id: '6',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$110,000 - $150,000',
    description: 'We are seeking a Product Manager to lead our product development initiatives. You will work with engineering, design, and business teams to deliver exceptional products.',
    requirements: [
      '5+ years of product management experience',
      'Technical background preferred',
      'Experience with agile methodologies',
      'Strong analytical and communication skills',
      'Track record of successful product launches'
    ],
    skills: ['Product Strategy', 'Agile', 'Roadmapping', 'User Research', 'Analytics', 'Jira'],
    posted: '4 days ago',
    category: 'Product',
    logo: '📊',
    applicants: 41
  },
  {
    id: '7',
    title: 'Junior Web Developer',
    company: 'CodeAcademy Pro',
    location: 'Chicago, IL',
    type: 'Internship',
    salary: '$50,000 - $70,000',
    description: 'Great opportunity for recent graduates to start their career in web development. You will learn modern web technologies including Node.js, Express, and React while working on real projects.',
    requirements: [
      'Bachelor\'s degree in CS or related field',
      'Basic knowledge of HTML, CSS, JavaScript',
      'Familiarity with React or Vue',
      'Eagerness to learn',
      'Good communication skills'
    ],
    skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Git', 'Node.js'],
    posted: '2 days ago',
    category: 'Engineering',
    logo: '📚',
    applicants: 89
  },
  {
    id: '8',
    title: 'Data Scientist',
    company: 'AnalyticsPro',
    location: 'Denver, CO',
    type: 'Full-time',
    salary: '$115,000 - $160,000',
    description: 'Join our data science team to extract insights from large datasets. You will build predictive models, create dashboards, and communicate findings to stakeholders.',
    requirements: [
      'MS in Statistics, Math, or CS',
      '3+ years of data science experience',
      'Strong Python and SQL skills',
      'Experience with data visualization',
      'Knowledge of statistical modeling'
    ],
    skills: ['Python', 'SQL', 'Pandas', 'Scikit-learn', 'Tableau', 'Statistics'],
    posted: '6 days ago',
    category: 'Data Science',
    logo: '📈',
    applicants: 37
  },
  {
    id: '9',
    title: 'Mobile App Developer',
    company: 'AppWorks',
    location: 'Los Angeles, CA',
    type: 'Contract',
    salary: '$80/hour',
    description: 'Looking for a skilled mobile developer to build cross-platform applications using React Native. Experience with native iOS/Android development is a plus.',
    requirements: [
      '3+ years of mobile development',
      'Strong React Native experience',
      'Knowledge of iOS and Android ecosystems',
      'Experience with app store deployment',
      'UI/UX sensibility'
    ],
    skills: ['React Native', 'iOS', 'Android', 'TypeScript', 'Firebase', 'Redux'],
    posted: '3 days ago',
    category: 'Mobile',
    logo: '📱',
    applicants: 24
  },
  {
    id: '10',
    title: 'Security Engineer',
    company: 'SecureNet',
    location: 'Washington, DC',
    type: 'Full-time',
    salary: '$125,000 - $175,000',
    description: 'We need a Security Engineer to protect our systems and data. You will conduct security audits, implement security measures, and respond to security incidents.',
    requirements: [
      '5+ years of security experience',
      'CISSP or similar certification',
      'Experience with penetration testing',
      'Knowledge of compliance frameworks',
      'Incident response experience'
    ],
    skills: ['Security', 'Penetration Testing', 'AWS Security', 'SIEM', 'Compliance', 'Python'],
    posted: '1 week ago',
    category: 'Security',
    logo: '🔒',
    applicants: 19
  }
];

export const categories = [
  { name: 'Engineering', icon: '💻', count: 156 },
  { name: 'AI/ML', icon: '🤖', count: 89 },
  { name: 'Data Science', icon: '📊', count: 67 },
  { name: 'DevOps', icon: '☁️', count: 45 },
  { name: 'Product', icon: '📦', count: 78 },
  { name: 'Design', icon: '🎨', count: 56 },
  { name: 'Mobile', icon: '📱', count: 34 },
  { name: 'Security', icon: '🔒', count: 28 }
];
