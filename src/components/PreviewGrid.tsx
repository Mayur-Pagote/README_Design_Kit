import ComponentCard from './ComponentCard';
import { componentsData } from "../data/componentsData";
import CustomTreeGenerator from './CustomTreeGenerator';


interface PreviewGridProps {
  selectedCategory: string;
  username: string;
  repo: string;
}

const PreviewGrid = ({ selectedCategory, username, repo }: PreviewGridProps) => {
  const components = componentsData[selectedCategory as keyof typeof componentsData] || componentsData.graphs;

  return (
    <div className="flex-1 p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCategory === 'projectStructure' && <CustomTreeGenerator />}
          {components.map((component, index) => (
            <ComponentCard
              key={`${selectedCategory}-${index}`}
              title={component.title}
              description={component.description}
              imageUrl={component.imageUrl.replace(/{username}/g, username).replace(/{repo}/g, repo)}
              codeSnippet={component.codeSnippet.replace(/{username}/g, username).replace(/{repo}/g, repo)}
              username={username}
              repo={repo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewGrid;