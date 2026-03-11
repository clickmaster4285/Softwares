import ProjectDetails from "@/src/pages/ProjectDetails";

interface Props {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: Props) {
  return <ProjectDetails />;
}
