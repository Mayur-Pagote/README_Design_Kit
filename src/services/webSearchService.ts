import { GoogleGenerativeAI } from '@google/generative-ai';

export interface UserProfileData {
  username: string;
  github?: {
    repositories?: any[];
    bio?: string;
    followers?: number;
    following?: number;
    location?: string;
    company?: string;
    website?: string;
  };
  linkedin?: {
    headline?: string;
    summary?: string;
    experience?: any[];
    skills?: string[];
  };
  portfolio?: {
    projects?: any[];
    skills?: string[];
    bio?: string;
  };
  social?: {
    twitter?: string;
    website?: string;
    blog?: string;
  };
}

class WebSearchService {
  private genAI: GoogleGenerativeAI | null = null;
  private apiKey: string | null = null;

  constructor() {
    this.loadApiKeyFromStorage();
  }

  private loadApiKeyFromStorage() {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      this.setApiKey(storedKey);
    }
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  isConfigured(): boolean {
    return this.apiKey !== null && this.genAI !== null;
  }

  async searchUserProfile(username: string, platforms: string[] = ['github', 'linkedin', 'portfolio']): Promise<UserProfileData> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured');
    }

    try {
      const model = this.genAI!.getGenerativeModel({ 
        model: 'gemini-2.0-flash-lite',
        generationConfig: {
          temperature: 0.3,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 4096,
        }
      });

      const searchPrompt = `Search for professional information about user "${username}" across these platforms: ${platforms.join(', ')}.

Please find and compile the following information:

For GitHub:
- Profile bio and description
- Number of followers/following
- Location and company
- Popular repositories and projects
- Programming languages used
- Contribution activity
- Personal website from profile

For LinkedIn:
- Professional headline
- Current job title and company
- Work experience summary
- Key skills and endorsements
- Education background
- Professional summary

For Portfolio/Personal websites:
- Personal projects and descriptions
- Technical skills and technologies
- Professional bio
- Contact information
- Blog posts or articles

For Social Media (Twitter, dev.to, etc.):
- Professional bio
- Recent technical posts
- Community involvement

Important: Only search for publicly available information. Focus on professional and technical content that would be relevant for a README profile.

Return the information in a structured JSON format like this:
{
  "username": "${username}",
  "github": {
    "bio": "...",
    "followers": 123,
    "location": "...",
    "company": "...",
    "topLanguages": ["JavaScript", "Python"],
    "popularRepos": [...]
  },
  "linkedin": {
    "headline": "...",
    "currentRole": "...",
    "skills": [...]
  },
  "portfolio": {
    "bio": "...",
    "projects": [...],
    "skills": [...]
  },
  "social": {
    "website": "...",
    "blog": "..."
  }
}

If information is not found for a platform, omit that section or mark fields as null.`;

      const result = await model.generateContent(searchPrompt);
      const response = await result.response;
      const content = response.text().trim();

      try {
        // Try to parse JSON response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.warn('Failed to parse JSON response, using fallback');
      }

      // Fallback: return basic structure with extracted info
      return {
        username,
        github: {
          bio: this.extractInfo(content, 'bio', 'github') || undefined,
          location: this.extractInfo(content, 'location') || undefined,
          company: this.extractInfo(content, 'company') || undefined,
        },
        linkedin: {
          headline: this.extractInfo(content, 'headline') || undefined,
          summary: this.extractInfo(content, 'summary') || undefined,
        },
        portfolio: {
          bio: this.extractInfo(content, 'bio', 'portfolio') || undefined,
        },
        social: {
          website: this.extractInfo(content, 'website') || undefined,
        }
      };
    } catch (error) {
      console.error('Error searching user profile:', error);
      throw new Error('Failed to search user profile information');
    }
  }

  async generatePersonalReadme(username: string, profileData?: UserProfileData): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured');
    }

    try {
      // If profile data not provided, search for it
      const userData = profileData || await this.searchUserProfile(username);

      const model = this.genAI!.getGenerativeModel({ 
        model: 'gemini-2.0-flash-lite',
        generationConfig: {
          temperature: 0.8,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 8192,
        }
      });

      const prompt = `Create a comprehensive personal README.md for ${username} using the following profile data:

${JSON.stringify(userData, null, 2)}

Create a modern, engaging GitHub profile README that includes:

1. **Header Section**:
   - Personalized greeting with name/username
   - Current role and company (if available)
   - Location (if available)
   - Contact links

2. **About Me Section**:
   - Professional bio based on available information
   - Current interests and focus areas
   - Career highlights

3. **Tech Stack & Skills**:
   - Programming languages with badges
   - Frameworks and tools
   - Areas of expertise

4. **Projects Showcase**:
   - Featured repositories or projects
   - Brief descriptions and tech used

5. **GitHub Stats**:
   - GitHub stats widgets
   - Contribution graphs
   - Top languages

6. **Connect Section**:
   - Social media links
   - Professional platforms
   - Website/blog links

7. **Fun Elements**:
   - Relevant GIFs or images
   - Interesting facts
   - Current learning goals

Use modern markdown formatting, emojis, and GitHub-specific features like:
- Shields.io badges for technologies
- GitHub stats from github-readme-stats
- Professional color scheme
- Responsive design considerations

Make it personal, professional, and visually appealing. Use the actual data provided but enhance it with proper formatting and additional context.

Return only the markdown content:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean the response from markdown code block wrapping
      return this.cleanMarkdownResponse(text);
    } catch (error) {
      console.error('Error generating personal README:', error);
      throw new Error('Failed to generate personal README');
    }
  }

  async searchUserProfileWithGrounding(username: string): Promise<UserProfileData> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured. Please set your API key first.');
    }

    try {
      const model = this.genAI!.getGenerativeModel({ 
        model: 'gemini-2.0-flash-lite',
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 8192,
        }
      });

      // Enhanced search with Google Search grounding
      const groundingPrompt = `You are an expert at finding and analyzing professional profiles across the internet. Use Google Search to find comprehensive information about the user "${username}".

IMPORTANT: Use Google Search to search for:
1. "github.com/${username}" - GitHub profile
2. "linkedin.com/in/${username}" OR "linkedin.com/in/${username}-" - LinkedIn profile
3. "${username} developer portfolio" - Personal websites
4. "${username} software engineer" - Professional information
5. "twitter.com/${username}" OR "x.com/${username}" - Twitter/X profile
6. "peerlist.io/${username}" - Peerlist profile
7. "dev.to/${username}" - Dev.to profile
8. "${username} stack overflow" - Stack Overflow profile
9. "${username} medium.com" - Medium articles
10. "${username} personal website blog" - Personal blog

For each search result, extract and compile:

GITHUB PROFILE:
- Full name and bio
- Location and company
- Number of followers/following
- Repository count and popular repositories
- Programming languages (from repos and activity)
- Contribution statistics
- Pinned repositories with descriptions
- Profile README content

LINKEDIN PROFILE:
- Professional headline
- Current job title and company
- Work experience (recent positions)
- Skills and endorsements
- Education background
- Professional summary
- Location

PERSONAL PORTFOLIO/WEBSITE:
- About section content
- Project showcases with descriptions
- Technical skills and technologies
- Professional experience
- Contact information
- Blog posts or articles

SOCIAL MEDIA & DEVELOPER PLATFORMS:
- Twitter bio and recent tech-related tweets
- Dev.to articles and bio
- Stack Overflow reputation and top answers
- Medium articles on technical topics
- Peerlist profile information

ANALYZE AND SYNTHESIZE:
Based on all the information found, create a comprehensive profile that includes:
- Professional summary combining all sources
- Complete list of technical skills and technologies
- Career progression and current role
- Notable projects and achievements
- Online presence and community involvement

Return the information as a detailed JSON object:
{
  "username": "${username}",
  "fullName": "extracted full name",
  "professionalTitle": "current job title",
  "bio": "comprehensive professional bio",
  "location": "city, country",
  "company": "current company",
  "yearsExperience": "estimated years",
  "github": {
    "url": "github profile url",
    "bio": "github bio",
    "followers": number,
    "following": number,
    "publicRepos": number,
    "topLanguages": ["language1", "language2"],
    "pinnedRepos": [
      {
        "name": "repo name",
        "description": "repo description",
        "language": "primary language",
        "stars": number
      }
    ],
    "contributionLevel": "active/moderate/occasional"
  },
  "linkedin": {
    "url": "linkedin profile url",
    "headline": "professional headline",
    "currentRole": "current job title",
    "company": "current company",
    "experience": [
      {
        "title": "job title",
        "company": "company name",
        "duration": "time period",
        "description": "role description"
      }
    ],
    "skills": ["skill1", "skill2"],
    "education": [
      {
        "institution": "school name",
        "degree": "degree type",
        "field": "field of study"
      }
    ]
  },
  "portfolio": {
    "websiteUrl": "personal website url",
    "bio": "about section content",
    "projects": [
      {
        "name": "project name",
        "description": "project description",
        "technologies": ["tech1", "tech2"],
        "url": "project url"
      }
    ],
    "skills": ["skill1", "skill2"],
    "specializations": ["area1", "area2"]
  },
  "social": {
    "twitter": "twitter handle",
    "website": "personal website",
    "blog": "blog url",
    "devto": "dev.to username",
    "stackoverflow": "SO profile url",
    "medium": "medium profile"
  },
  "technicalProfile": {
    "primaryLanguages": ["language1", "language2"],
    "frameworks": ["framework1", "framework2"],
    "tools": ["tool1", "tool2"],
    "specialties": ["specialty1", "specialty2"],
    "experienceLevel": "junior/mid/senior/lead"
  },
  "onlinePresence": {
    "activeOn": ["platform1", "platform2"],
    "contentCreator": true/false,
    "openSourceContributor": true/false,
    "communityInvolvement": "description"
  }
}

Search thoroughly and provide as much accurate, up-to-date information as possible. If specific information is not found, use null for that field.`;

      const result = await model.generateContent(groundingPrompt);
      const response = result.response;
      const text = response.text();

      if (!text) {
        throw new Error('No enhanced search results generated');
      }

      try {
        // Clean and parse the JSON response
        const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const profileData = JSON.parse(cleanedText);
        
        // Ensure the response has the expected structure
        return {
          username: profileData.username || username,
          github: profileData.github || {},
          linkedin: profileData.linkedin || {},
          portfolio: profileData.portfolio || {},
          social: profileData.social || {},
          ...profileData
        };
      } catch (parseError) {
        console.warn('Failed to parse enhanced profile data, using fallback:', parseError);
        
        // Fallback: create a basic profile structure with extracted info
        return {
          username,
          github: {
            bio: text.includes('GitHub') ? text.substring(text.indexOf('GitHub'), text.indexOf('GitHub') + 200) : '',
            repositories: [],
            followers: 0,
            following: 0,
            location: '',
            company: '',
            website: ''
          },
          linkedin: {
            headline: text.includes('LinkedIn') ? text.substring(text.indexOf('LinkedIn'), text.indexOf('LinkedIn') + 200) : '',
            summary: '',
            experience: [],
            skills: []
          },
          portfolio: {
            projects: [],
            skills: [],
            bio: text.substring(0, 300) + '...'
          },
          social: {
            twitter: '',
            website: '',
            blog: ''
          }
        };
      }
    } catch (error) {
      console.error('Error in enhanced user profile search:', error);
      
      // Return a basic structure if enhanced search fails
      return {
        username,
        github: {
          repositories: [],
          followers: 0,
          following: 0,
          location: '',
          company: '',
          website: ''
        },
        linkedin: {
          headline: '',
          summary: '',
          experience: [],
          skills: []
        },
        portfolio: {
          projects: [],
          skills: [],
          bio: ''
        },
        social: {
          twitter: '',
          website: '',
          blog: ''
        }
      };
    }
  }

  // Enhanced README generation with comprehensive user profile data
  async generatePersonalizedReadme(userQuery: string, username: string, useGrounding: boolean = true): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured. Please set your API key first.');
    }

    try {
      // Use enhanced search with grounding if enabled
      const profileData = useGrounding 
        ? await this.searchUserProfileWithGrounding(username)
        : await this.searchUserProfile(username);

      const model = this.genAI!.getGenerativeModel({ 
        model: 'gemini-2.0-flash-lite',
        generationConfig: {
          temperature: 0.8,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 8192,
        }
      });

      let profileContext = `COMPREHENSIVE USER PROFILE FOR ${username}:\n\n`;
      
      if (profileData.github) {
        profileContext += `GitHub Profile:\n`;
        if (profileData.github.bio) profileContext += `- Bio: ${profileData.github.bio}\n`;
        if (profileData.github.location) profileContext += `- Location: ${profileData.github.location}\n`;
        if (profileData.github.company) profileContext += `- Company: ${profileData.github.company}\n`;
        if (profileData.github.followers) profileContext += `- Followers: ${profileData.github.followers}\n`;
        if (profileData.github.repositories) {
          profileContext += `- Notable Repositories: ${profileData.github.repositories.slice(0, 5).map((r: any) => r.name || r).join(', ')}\n`;
        }
        profileContext += '\n';
      }
      
      if (profileData.linkedin) {
        profileContext += `LinkedIn Profile:\n`;
        if (profileData.linkedin.headline) profileContext += `- Headline: ${profileData.linkedin.headline}\n`;
        if ((profileData.linkedin as any).currentRole) profileContext += `- Current Role: ${(profileData.linkedin as any).currentRole}\n`;
        if (profileData.linkedin.skills?.length) profileContext += `- Skills: ${profileData.linkedin.skills.slice(0, 10).join(', ')}\n`;
        if (profileData.linkedin.experience?.length) {
          profileContext += `- Recent Experience: ${profileData.linkedin.experience.slice(0, 3).map((exp: any) => `${exp.title} at ${exp.company}`).join(', ')}\n`;
        }
        profileContext += '\n';
      }

      if (profileData.portfolio) {
        profileContext += `Portfolio/Personal Website:\n`;
        if (profileData.portfolio.bio) profileContext += `- Bio: ${profileData.portfolio.bio}\n`;
        if (profileData.portfolio.skills?.length) profileContext += `- Technical Skills: ${profileData.portfolio.skills.join(', ')}\n`;
        if (profileData.portfolio.projects?.length) {
          profileContext += `- Projects: ${profileData.portfolio.projects.slice(0, 3).map((p: any) => p.name || p).join(', ')}\n`;
        }
        profileContext += '\n';
      }

      const enhancedPrompt = `You are an expert README generator with access to comprehensive user profile information. Create a highly personalized and professional README based on the user's request and their actual online presence.

${profileContext}

User Request: ${userQuery}

Create a README that:
1. Uses REAL information from the user's actual profiles
2. Reflects their genuine skills, experience, and projects
3. Maintains authenticity while being professional
4. Incorporates their actual tech stack and expertise
5. References their real work and achievements
6. Uses appropriate professional tone for their experience level
7. Includes relevant badges and technologies they actually use
8. Showcases their actual GitHub repositories and projects

IMPORTANT GUIDELINES:
- Use the actual user information provided above
- Don't invent or assume technologies they don't use
- Reference their real repositories and projects when relevant
- Match the professional tone to their actual experience level
- Include genuine contact information if available
- Use their real location, company, and bio information
- Reflect their actual contribution patterns and activity

Generate a comprehensive README.md that feels authentic and personal while maintaining professional standards.

Output ONLY the markdown content.`;

      const result = await model.generateContent(enhancedPrompt);
      const response = result.response;
      const text = response.text();

      if (!text) {
        throw new Error('No personalized content generated');
      }

      // Clean the response from markdown code block wrapping
      return this.cleanMarkdownResponse(text);
    } catch (error) {
      console.error('Error generating personalized README:', error);
      throw new Error(`Failed to generate personalized README: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private extractInfo(content: string, field: string, _context?: string): string | null {
    const patterns = [
      new RegExp(`"${field}":\\s*"([^"]*)"`, 'i'),
      new RegExp(`${field}:\\s*"([^"]*)"`, 'i'),
      new RegExp(`${field}:\\s*([^\\n,}]+)`, 'i'),
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return null;
  }

  private cleanMarkdownResponse(text: string): string {
    // Remove markdown code block wrapping (```markdown and ```
    let cleaned = text.trim();
    
    // Remove markdown code block markers
    cleaned = cleaned.replace(/^```markdown\s*/i, '');
    cleaned = cleaned.replace(/^```\s*/, '');
    cleaned = cleaned.replace(/\s*```$/, '');
    
    // Remove any remaining markdown wrapper patterns
    cleaned = cleaned.replace(/^markdown\s*/i, '');
    
    return cleaned.trim();
  }
}

export const webSearchService = new WebSearchService();
