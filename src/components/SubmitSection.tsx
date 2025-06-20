import React, { useState } from 'react';
import { Rocket, Upload, Tag, User, Mail, MessageSquare } from 'lucide-react';

const SubmitSection: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    githubUrl: '',
    liveUrl: '',
    tags: '',
    authorName: '',
    authorEmail: '',
    authorGithub: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Web Apps',
    'Mobile',
    'Desktop',
    'Libraries',
    'AI/ML',
    'DevTools',
    'Games',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: '',
        category: '',
        description: '',
        githubUrl: '',
        liveUrl: '',
        tags: '',
        authorName: '',
        authorEmail: '',
        authorGithub: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const commonInputClasses = `
    w-full px-4 py-3 
    rounded-lg
    bg-background/10
    border border-border/10
    text-foreground
    placeholder:text-muted-foreground
    hover:bg-background/20
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
    transition-all duration-200
  `;

  const buttonClasses = `
    w-full px-6 py-3
    bg-primary hover:bg-primary/90
    text-primary-foreground font-semibold
    rounded-lg
    transition-all duration-200
    focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
  `;

  if (submitted) {
    return (
      <section className="py-20 bg-white dark:bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Rocket className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-4">Project Submitted Successfully!</h2>
          <p className="text-lg text-gray-600 dark:text-muted-foreground">
            Thank you for sharing your project with the community. We'll review it and get back to you soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Submit Your Project
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your amazing work with the community and get featured in our showcase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Benefits */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto lg:mx-0 mb-6 flex items-center justify-center">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Get Featured</h3>
              <p className="text-muted-foreground text-lg">
                Outstanding projects get featured on our homepage and social media platforms, 
                giving you maximum exposure to the developer community.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                  <Tag className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Quality Curated</h4>
                <p className="text-sm text-muted-foreground">Only the best projects make it to our showcase</p>
              </div>

              <div className="bg-card rounded-xl p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Community Feedback</h4>
                <p className="text-sm text-muted-foreground">Get valuable feedback from fellow developers</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold text-primary mb-6">Project Information</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Project Title *
                  </label>
                  <div className="border border-border rounded-lg">
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="Give your project a catchy name"
                      className={`${commonInputClasses} rounded-lg -m-px`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category *
                  </label>
                  <div className="border border-border rounded-lg">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className={`${commonInputClasses} bg-card text-foreground appearance-none rounded-lg -m-px`}
                      style={{
                        WebkitAppearance: 'none',
                        MozAppearance: 'none'
                      }}
                    >
                      <option value="" className="bg-card text-muted-foreground">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}
                          className="bg-card text-foreground">{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <div className="border border-border rounded-lg">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe what your project does and what makes it special..."
                    className={`${commonInputClasses} rounded-lg -m-px`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tags
                </label>
                <div className="border border-border rounded-lg">
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="React, TypeScript, Node.js, MongoDB (separate with commas)"
                    className={`${commonInputClasses} rounded-lg -m-px`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name *
                  </label>
                  <div className="border border-border rounded-lg">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <input
                        type="text"
                        name="authorName"
                        value={formData.authorName}
                        onChange={handleChange}
                        required
                        placeholder="Mayur Pagote"
                        className={`${commonInputClasses} pl-10 rounded-lg -m-px`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <div className="border border-border rounded-lg">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <input
                        type="email"
                        name="authorEmail"
                        value={formData.authorEmail}
                        onChange={handleChange}
                        required
                        placeholder="mayur@example.com"
                        className={`${commonInputClasses} pl-10 rounded-lg -m-px`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={buttonClasses}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Submit Project
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubmitSection;