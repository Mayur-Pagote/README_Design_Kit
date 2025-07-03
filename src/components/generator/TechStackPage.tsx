
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Code, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GeneratorState } from '@/pages/Index';
import ProgressIndicator from './ProgressIndicator';

interface TechStackPageProps {
  state: GeneratorState;
  setState: (state: GeneratorState) => void;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

const TechStackPage = ({ state, setState, currentPage, totalPages, nextPage, prevPage }: TechStackPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const techCategories = {
    languages: {
      title: 'LANGUAGES',
      color: 'from-blue-500 to-purple-500',
      items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Swift', 'Kotlin', 'PHP', 'Ruby', 'Scala', 'R', 'MATLAB', 'Dart', 'HTML5', 'CSS3']
    },
    hosting: {
      title: 'HOSTING/SAAS',
      color: 'from-green-500 to-emerald-500',
      items: ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Netlify', 'Firebase', 'Heroku', 'DigitalOcean', 'Railway', 'PlanetScale', 'Supabase', 'Cloudflare']
    },
    frameworks: {
      title: 'FRAMEWORKS & LIBRARIES',
      color: 'from-purple-500 to-pink-500',
      items: ['React', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel', 'TailwindCSS', 'Bootstrap', 'Three.js', 'Electron']
    },
    servers: {
      title: 'SERVERS',
      color: 'from-orange-500 to-red-500',
      items: ['Apache', 'Nginx', 'Jenkins', 'Docker', 'Kubernetes', 'GraphQL', 'Socket.IO']
    },
    databases: {
      title: 'DATABASES / ORM',
      color: 'from-yellow-500 to-orange-500',
      items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Redis', 'SQLite', 'Prisma', 'Sequelize', 'Mongoose', 'Supabase']
    },
    design: {
      title: 'DESIGN',
      color: 'from-pink-500 to-rose-500',
      items: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Blender', 'Sketch', 'Adobe XD', 'Canva', 'Framer']
    },
    ml: {
      title: 'ML/DL',
      color: 'from-indigo-500 to-blue-500',
      items: ['TensorFlow', 'PyTorch', 'Keras', 'NumPy', 'Pandas', 'Scikit-learn', 'OpenCV', 'Matplotlib']
    },
    cicd: {
      title: 'CI/CD & VCS',
      color: 'from-slate-500 to-gray-500',
      items: ['GitHub Actions', 'GitLab CI', 'Docker', 'Kubernetes', 'Git', 'GitHub', 'GitLab', 'Bitbucket']
    },
    other: {
      title: 'OTHER',
      color: 'from-teal-500 to-cyan-500',
      items: ['Linux', 'Postman', 'Insomnia', 'Vim', 'VS Code', 'IntelliJ', 'Selenium', 'Jest', 'Cypress', 'Webpack', 'Vite', 'Babel']
    }
  };

  const toggleTech = (category: keyof typeof state.techStack, tech: string) => {
    const currentTechs = state.techStack[category];
    const updatedTechs = currentTechs.includes(tech)
      ? currentTechs.filter(t => t !== tech)
      : [...currentTechs, tech];

    setState({
      ...state,
      techStack: {
        ...state.techStack,
        [category]: updatedTechs,
      },
    });
  };

  const isSelected = (category: keyof typeof state.techStack, tech: string) => {
    return state.techStack[category].includes(tech);
  };

  const filteredCategories = Object.entries(techCategories).map(([key, category]) => ({
    key: key as keyof typeof state.techStack,
    ...category,
    items: category.items.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const getTotalSelected = () => {
    return Object.values(state.techStack).reduce((total, techs) => total + techs.length, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <ProgressIndicator current={currentPage} total={totalPages - 1} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-4 text-sm font-medium">
              <Code className="w-4 h-4" />
              Tech Stack
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Add Tech that you use
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-6">
              Showcase your technical skills and the technologies you work with.
            </p>
            
            <div className="relative max-w-md mx-auto mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search tech..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              />
            </div>

            <div className="text-sm text-slate-400">
              {getTotalSelected()} technologies selected
            </div>
          </motion.div>

          <div className="space-y-8 mb-12">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 bg-gradient-to-r ${category.color} rounded-full`}></div>
                  <h3 className="font-bold text-white text-lg">{category.title}</h3>
                  <span className="text-sm text-slate-400">
                    ({state.techStack[category.key].length} selected)
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.items.map((tech) => (
                    <Badge
                      key={tech}
                      variant={isSelected(category.key, tech) ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                        isSelected(category.key, tech)
                          ? `bg-gradient-to-r ${category.color} hover:opacity-80 text-white border-0`
                          : 'border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-700/50'
                      }`}
                      onClick={() => toggleTech(category.key, tech)}
                    >
                      {tech}
                      {isSelected(category.key, tech) && (
                        <X className="w-3 h-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={prevPage}
              variant="outline"
              className="flex items-center gap-2 border-slate-600 text-slate-300 hover:text-white hover:border-slate-500"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>

            <Button
              onClick={nextPage}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackPage;
