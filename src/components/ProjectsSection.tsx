import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';

const ProjectsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory] = useState<string>('All Projects');
  const [submittedProjects] = useState<Array<any>>(() => {
    const savedProjects = localStorage.getItem("submittedProjects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  const filteredProjects = useMemo(() => {
    let filtered = Array.isArray(submittedProjects) ? [...submittedProjects] : []; 

    if (activeCategory !== 'All Projects') {
      filtered = filtered.filter(project => project.category === activeCategory);
    }

    if (searchTerm.trim().length > 0) { 
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(project.tags) ? project.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())) : false)
      );
    }

    return filtered;
  }, [searchTerm, activeCategory, submittedProjects]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explore Projects</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Find the perfect inspiration for your next project</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects, technologies, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm text-lg text-gray-900"
          />
        </div>

        {/* If No Projects Exist, Show Submit Button */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects added yet</h3>
            <p className="text-gray-600">Be the first to showcase your work!</p>
            <Link to="/submit">
              <button className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
                Submit Your Project
              </button>
            </Link>
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id || index} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
