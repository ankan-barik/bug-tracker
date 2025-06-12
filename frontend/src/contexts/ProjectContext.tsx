
import React, { createContext, useContext, useState } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  teamMembers: string[];
  createdAt: string;
  owner: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'done';
  assignee?: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface ProjectContextType {
  projects: Project[];
  issues: Issue[];
  createProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  createIssue: (issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  deleteIssue: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
  getIssuesByProject: (projectId: string) => Issue[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Building a modern e-commerce platform with React and Node.js',
      teamMembers: ['john@example.com', 'jane@example.com'],
      createdAt: new Date().toISOString(),
      owner: 'john@example.com'
    },
    {
      id: '2',
      title: 'Mobile App Backend',
      description: 'REST API for mobile application',
      teamMembers: ['alice@example.com', 'bob@example.com'],
      createdAt: new Date().toISOString(),
      owner: 'alice@example.com'
    }
  ]);

  const [issues, setIssues] = useState<Issue[]>([
    {
      id: '1',
      title: 'Login page not responsive on mobile',
      description: 'The login form breaks on screens smaller than 768px',
      priority: 'high',
      status: 'todo',
      assignee: 'jane@example.com',
      projectId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'john@example.com'
    },
    {
      id: '2',
      title: 'Add shopping cart functionality',
      description: 'Users should be able to add items to cart and checkout',
      priority: 'medium',
      status: 'in-progress',
      assignee: 'john@example.com',
      projectId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'jane@example.com'
    },
    {
      id: '3',
      title: 'Database optimization',
      description: 'Optimize database queries for better performance',
      priority: 'low',
      status: 'done',
      assignee: 'bob@example.com',
      projectId: '2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'alice@example.com'
    }
  ]);

  const createProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...project,
      id: Math.random().toString(),
      createdAt: new Date().toISOString()
    };
    setProjects(prev => [...prev, newProject]);
  };

  const createIssue = (issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newIssue: Issue = {
      ...issue,
      id: Math.random().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setIssues(prev => [...prev, newIssue]);
  };

  const updateIssue = (id: string, updates: Partial<Issue>) => {
    setIssues(prev => prev.map(issue => 
      issue.id === id 
        ? { ...issue, ...updates, updatedAt: new Date().toISOString() }
        : issue
    ));
  };

  const deleteIssue = (id: string) => {
    setIssues(prev => prev.filter(issue => issue.id !== id));
  };

  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const getIssuesByProject = (projectId: string) => {
    return issues.filter(issue => issue.projectId === projectId);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      issues,
      createProject,
      createIssue,
      updateIssue,
      deleteIssue,
      getProjectById,
      getIssuesByProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
