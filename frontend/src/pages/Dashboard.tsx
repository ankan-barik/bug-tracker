
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users, Bug, Calendar, MoreVertical, Sparkles, Zap } from "lucide-react";
import { useProject } from "@/contexts/ProjectContext";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CreateProjectDialog from "@/components/dialogs/CreateProjectDialog";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { projects, getIssuesByProject } = useProject();
  const { user } = useAuth();

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProjectStats = (projectId: string) => {
    const issues = getIssuesByProject(projectId);
    return {
      total: issues.length,
      todo: issues.filter(i => i.status === 'todo').length,
      inProgress: issues.filter(i => i.status === 'in-progress').length,
      done: issues.filter(i => i.status === 'done').length
    };
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur"></div>
            <div className="relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-6 rounded-lg border border-white/20 dark:border-slate-700/50">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
                Manage your projects and track issues efficiently
              </p>
            </div>
          </div>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)} 
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-50"></div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 dark:border-slate-700/50"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Total Projects",
              value: projects.length,
              icon: Bug,
              description: "Active projects in your workspace",
              gradient: "from-blue-500/10 to-cyan-500/10",
              iconColor: "text-blue-500"
            },
            {
              title: "Open Issues",
              value: projects.reduce((acc, p) => {
                const stats = getProjectStats(p.id);
                return acc + stats.todo + stats.inProgress;
              }, 0),
              icon: Calendar,
              description: "Issues pending completion",
              gradient: "from-orange-500/10 to-red-500/10",
              iconColor: "text-orange-500"
            },
            {
              title: "Team Members",
              value: new Set(projects.flatMap(p => p.teamMembers)).size,
              icon: Users,
              description: "Unique collaborators",
              gradient: "from-green-500/10 to-emerald-500/10",
              iconColor: "text-green-500"
            }
          ].map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-50 group-hover:opacity-100 transition-all duration-300"></div>
              <Card className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-white/20 dark:border-slate-700/50 transform transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                    <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Your Projects
            </h2>
            <Zap className="h-5 w-5 text-yellow-500" />
          </div>
          
          {filteredProjects.length === 0 ? (
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-50"></div>
              <Card className="relative p-12 text-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-white/20 dark:border-slate-700/50">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    <Bug className="h-12 w-12 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">No projects found</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {searchTerm ? "Try adjusting your search criteria" : "Create your first project to get started"}
                    </p>
                  </div>
                  {!searchTerm && (
                    <Button 
                      onClick={() => setIsCreateDialogOpen(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const stats = getProjectStats(project.id);
                return (
                  <div key={project.id} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-50 group-hover:opacity-100 transition-all duration-300"></div>
                    <Card className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-white/20 dark:border-slate-700/50 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                              {project.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                              {project.description}
                            </CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover:bg-blue-500/10">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-white/20 dark:border-slate-700/50">
                              <DropdownMenuItem asChild>
                                <Link to={`/project/${project.id}`}>View Details</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link to={`/project/${project.id}/kanban`}>Kanban Board</Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Issue Stats */}
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-xs bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                              {stats.total} total
                            </Badge>
                            <Badge variant="outline" className="text-xs border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400">
                              {stats.todo} todo
                            </Badge>
                            <Badge variant="outline" className="text-xs border-yellow-200 text-yellow-600 dark:border-yellow-800 dark:text-yellow-400">
                              {stats.inProgress} in progress
                            </Badge>
                            <Badge variant="outline" className="text-xs border-green-200 text-green-600 dark:border-green-800 dark:text-green-400">
                              {stats.done} done
                            </Badge>
                          </div>

                          {/* Team Members */}
                          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {project.teamMembers.length} members
                            </div>
                            <span className="text-xs">
                              {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-2">
                            <Button asChild size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                              <Link to={`/project/${project.id}/kanban`}>
                                Open Board
                              </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="flex-1 border-white/20 hover:bg-blue-500/10">
                              <Link to={`/project/${project.id}`}>
                                Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <CreateProjectDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </DashboardLayout>
  );
};

export default Dashboard;
