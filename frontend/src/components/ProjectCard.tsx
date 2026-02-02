import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/storage';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { resolveImageUrl } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const statusColors = {
  'live': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'in-progress': 'bg-amber-100 text-amber-700 border-amber-200',
  'completed': 'bg-primary/10 text-primary border-primary/20',
};

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const projectId = project._id || project.id;
  const detailLink = projectId ? `/projects/${projectId}` : project.url;
  const imageUrl = resolveImageUrl(project.thumbnail);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link
        to={detailLink}
        className="block"
        {...(projectId ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        <div className="bg-card rounded-2xl overflow-hidden border border-border/70 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
          {/* Thumbnail */}
          <div className="relative h-48 bg-secondary/60 overflow-hidden">
            <img
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
            
            {/* Status badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
                {project.status === 'in-progress' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>

            {/* Hover icon */}
            <motion.div
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <ExternalLink className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-secondary/50 text-muted-foreground border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
