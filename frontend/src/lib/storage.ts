export interface Category {
  _id: string;
  name: string;
  description?: string;
}

export interface Project {
  _id?: string;
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: string | Category; // Can be string (ID) or populated Category object
  tags: string[];
  status: 'live' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  email: string;
  passwordHash: string;
}

const PROJECTS_KEY = 'devportal_projects';
const ADMIN_KEY = 'devportal_admin';
const SESSION_KEY = 'devportal_session';
const defaultProjects: Project[] = [];

// Simple hash function for demo purposes (not secure for production)
const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
};


// Projects CRUD
export const getProjects = (): Project[] => {
  const stored = localStorage.getItem(PROJECTS_KEY);
  if (!stored) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(defaultProjects));
    return defaultProjects;
  }
  return JSON.parse(stored);
};

export const getProject = (id: string): Project | undefined => {
  const projects = getProjects();
  return projects.find(p => p.id === id);
};

export const createProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  projects.push(newProject);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return newProject;
};

export const updateProject = (id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>): Project | null => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  projects[index] = {
    ...projects[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return projects[index];
};

export const deleteProject = (id: string): boolean => {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  if (filtered.length === projects.length) return false;
  
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(filtered));
  return true;
};

// Admin auth
export const getAdmin = (): Admin | null => {
  const stored = localStorage.getItem(ADMIN_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const registerAdmin = (email: string, password: string): boolean => {
  const existing = getAdmin();
  if (existing) return false;
  
  const admin: Admin = {
    email,
    passwordHash: hashPassword(password),
  };
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
  return true;
};

export const loginAdmin = (email: string, password: string): boolean => {
  const admin = getAdmin();
  if (!admin) return false;
  
  if (admin.email === email && admin.passwordHash === hashPassword(password)) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email, loggedIn: true }));
    return true;
  }
  return false;
};

export const logoutAdmin = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

export const isAdminLoggedIn = (): boolean => {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return false;
  return JSON.parse(session).loggedIn === true;
};

export const getAdminEmail = (): string | null => {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return null;
  return JSON.parse(session).email;
};
