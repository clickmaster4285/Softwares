import { notFound } from 'next/navigation';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  // ... other fields
}

async function getProject(id: string): Promise<Project> {
  const res = await fetch(`http://localhost:5000/api/projects/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  let project;
  try {
    project = await getProject(params.id);
  } catch {
    notFound();
  }

  return (
    <main className="py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{project.title}</h1>
        <img src={project.image} alt={project.title} className="w-full h-96 object-cover rounded-xl mb-8" />
        <p className="text-lg leading-relaxed">{project.description}</p>
      </div>
    </main>
  );
}
