
import { useParams } from "react-router-dom";
import { useProject } from "@/contexts/ProjectContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const KanbanBoard = () => {
  const { id } = useParams<{ id: string }>();
  const { getProjectById, getIssuesByProject } = useProject();
  
  const project = getProjectById(id!);
  const issues = getIssuesByProject(id!);

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Project not found</h1>
          <p className="text-gray-600 mt-2">The project you're looking for doesn't exist.</p>
        </div>
      </DashboardLayout>
    );
  }

  const todoIssues = issues.filter(issue => issue.status === 'todo');
  const inProgressIssues = issues.filter(issue => issue.status === 'in-progress');
  const doneIssues = issues.filter(issue => issue.status === 'done');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const KanbanColumn = ({ title, issues, status }: { title: string; issues: any[]; status: string }) => (
    <div className="flex-1 min-w-80">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <Badge variant="secondary">{issues.length}</Badge>
        </div>
        
        <div className="space-y-3 min-h-96">
          {issues.map((issue) => (
            <Card key={issue.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 mb-2">{issue.title}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{issue.description}</p>
                
                <div className="flex items-center justify-between">
                  <Badge className={getPriorityColor(issue.priority)}>
                    {issue.priority}
                  </Badge>
                  {issue.assignee && (
                    <span className="text-xs text-gray-500 truncate max-w-24">
                      {issue.assignee.split('@')[0]}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button variant="ghost" className="w-full border-2 border-dashed border-gray-300 hover:border-gray-400 h-12">
            <Plus className="w-4 h-4 mr-2" />
            Add Issue
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to={`/project/${id}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Project
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.title} - Kanban Board</h1>
              <p className="text-gray-600">Drag and drop issues to update their status</p>
            </div>
          </div>
          
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Issue
          </Button>
        </div>

        {/* Kanban Board */}
        <div className="flex space-x-6 overflow-x-auto pb-4">
          <KanbanColumn 
            title="To Do" 
            issues={todoIssues} 
            status="todo"
          />
          <KanbanColumn 
            title="In Progress" 
            issues={inProgressIssues} 
            status="in-progress"
          />
          <KanbanColumn 
            title="Done" 
            issues={doneIssues} 
            status="done"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KanbanBoard;
