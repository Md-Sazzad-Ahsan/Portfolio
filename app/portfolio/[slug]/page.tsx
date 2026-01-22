import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = params;
  // Fetch the project via API to centralize access logic
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/projects?slug=${encodeURIComponent(slug)}`.replace(/^\//, '/'), {
    cache: 'no-store',
  });
  if (res.status === 404) {
    notFound();
  }
  if (!res.ok) {
    throw new Error(`Failed to load project: ${res.status}`);
  }
  const json = await res.json();
  const project = json?.data;
  if (!project) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-5xl px-5 md:px-0 py-24">
      <div className="mb-8">
        <Link href="/portfolio" className="text-cyan-600 hover:underline">
          ← Back to Portfolio
        </Link>
      </div>

      <article className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        {project.thumbnail && (
          <div className="w-full h-64 md:h-96 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.thumbnail}
              alt={project.title || project.slug}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
            {project.subTitle && (
              <p className="text-gray-600 dark:text-gray-300 text-lg">{project.subTitle}</p>
            )}
          </header>

          {project.features && project.features.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Features</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                {project.features.map((feat: string, idx: number) => (
                  <li key={`${feat}-${idx}`}>{feat}</li>
                ))}
              </ul>
            </section>
          )}

          {project.description && (
            <section className="prose dark:prose-invert max-w-none">
              <p>{project.description}</p>
            </section>
          )}

          {(project.gitHub || project.web) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.gitHub && (
                <Link
                  href={project.gitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-700 dark:to-blue-700 text-white px-5 py-2.5 rounded-lg hover:from-cyan-700 hover:to-blue-700 dark:hover:from-cyan-800 dark:hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  View on GitHub
                </Link>
              )}
              {project.web && (
                <Link
                  href={project.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-200 dark:to-gray-300 text-white dark:text-gray-800 px-5 py-2.5 rounded-lg hover:from-gray-800 hover:to-gray-600 dark:hover:from-white dark:hover:to-gray-100 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Visit Website
                </Link>
              )}
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
