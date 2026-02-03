import { motion } from 'framer-motion';
import { FolderOpen, TrendingUp, Clock, CheckCircle, Zap, Eye, Tag, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@/lib/storage';

const AdminDashboard = () => {
  // Fetch projects from backend
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { apiFetch } = await import('../lib/api');
      const res = await apiFetch('/api/projects', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch projects');
      return res.json();
    },
  });

  // Calculate stats
  const liveCount = projects.filter(p => p.status === 'live').length;
  const inProgressCount = projects.filter(p => p.status === 'in-progress').length;
  const completedCount = projects.filter(p => p.status === 'completed').length;
  const totalProjects = projects.length;

  // Get categories and their counts
  const categories = Array.from(new Set(projects.map(p => p.category)));
  const categoryStats = categories.map(cat => ({
    name: cat,
    count: projects.filter(p => p.category === cat).length,
    live: projects.filter(p => p.category === cat && p.status === 'live').length,
  })).sort((a, b) => b.count - a.count);

  // Get recent projects
  const recentProjects = projects.sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 5);

  // Calculate completion percentage
  const completionPercentage = totalProjects > 0 
    ? Math.round((completedCount / totalProjects) * 100) 
    : 0;

  // Get stats array
  const stats = [
    {
      title: 'Total Projects',
      value: totalProjects,
      icon: FolderOpen,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      trend: '+0%',
    },
    {
      title: 'Live Projects',
      value: liveCount,
      icon: Zap,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      trend: `${totalProjects > 0 ? Math.round((liveCount / totalProjects) * 100) : 0}%`,
    },
    {
      title: 'In Progress',
      value: inProgressCount,
      icon: Clock,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      trend: `${totalProjects > 0 ? Math.round((inProgressCount / totalProjects) * 100) : 0}%`,
    },
    {
      title: 'Completed',
      value: completedCount,
      icon: CheckCircle,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      trend: `${completionPercentage}%`,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Dashboard
              </h2>
              <p className="text-muted-foreground mt-2">Welcome back! Here's your portfolio overview.</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              className="group"
            >
              <Card className="glass-card border-border/50 overflow-hidden relative hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                      <p className="text-xs text-muted-foreground mt-1">of total</p>
                    </div>
                    <div className={`text-right`}>
                      <div className={`text-lg font-semibold ${stat.color}`}>{stat.trend}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Recent Activity */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="glass-card border-border/50 h-full">
              <CardHeader className="border-b border-border/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {recentProjects.length} projects
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : recentProjects.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No projects yet. Create your first project!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentProjects.map((project, index) => (
                      <motion.div
                        key={project._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                              {project.title}
                            </p>
                            <Badge className="text-xs bg-primary/20 text-primary border-primary/30 shrink-0">
                              {project.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(project.updatedAt).toLocaleDateString()} at {new Date(project.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap shrink-0 ${
                            project.status === 'live'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : project.status === 'in-progress'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-primary/20 text-primary'
                          }`}
                        >
                          {project.status === 'in-progress' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-border/50 h-full">
              <CardHeader className="border-b border-border/30">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : categoryStats.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground text-sm">No categories yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {categoryStats.map((cat, index) => (
                      <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-foreground text-sm">{cat.name}</p>
                            <Badge variant="secondary" className="text-xs">
                              {cat.count}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-primary to-primary/70"
                                initial={{ width: 0 }}
                                animate={{ width: `${(cat.count / totalProjects) * 100}%` }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-8 text-right">
                              {totalProjects > 0 ? Math.round((cat.count / totalProjects) * 100) : 0}%
                            </span>
                          </div>
                          {cat.live > 0 && (
                            <p className="text-xs text-emerald-400">
                              <Zap className="h-3 w-3 inline mr-1" />
                              {cat.live} live
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Completion Overview */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-border/50 overflow-hidden">
            <CardHeader className="border-b border-border/30">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Project Status Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Completion bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">Overall Completion</p>
                    <span className="text-lg font-bold text-primary">{completionPercentage}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {completedCount} of {totalProjects} projects completed
                  </p>
                </div>

                {/* Status breakdown */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <div className="text-2xl font-bold text-emerald-400">{liveCount}</div>
                    <p className="text-xs text-muted-foreground mt-1">Live</p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                    <div className="text-2xl font-bold text-amber-400">{inProgressCount}</div>
                    <p className="text-xs text-muted-foreground mt-1">In Progress</p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                    <div className="text-2xl font-bold text-primary">{completedCount}</div>
                    <p className="text-xs text-muted-foreground mt-1">Completed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
