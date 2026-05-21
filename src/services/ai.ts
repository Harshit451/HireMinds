

// function getApiKey(): string | null {
//   try {
//     const key = import.meta.env.VITE_GEMINI_API_KEY;
//     if (!key || key === 'your_gemini_api_key_here') {
//       return null;
//     }
//     return key;
//   } catch {
//     return null;
//   }
// }

// async function getGenAI() {
//   const apiKey = getApiKey();
//   if (!apiKey) {
//     throw new Error('Please configure your Gemini API key in the .env file (VITE_GEMINI_API_KEY)');
//   }
  
//   if (!genAI) {
//   try {
//     genAI = new GoogleGenAI({
//       apiKey,
//     });
//   } catch (error) {
//     throw new Error('Failed to initialize AI service');
//   }
// }
//   return genAI;
// }

async function generateContent(prompt: string): Promise<string> {

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OpenRouter API key missing");
  }

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error("AI service temporarily unavailable");
  }

  return data.choices?.[0]?.message?.content || "No response";
}

// Resume Checker - Returns score out of 100
export async function checkResume(resumeText: string): Promise<{
  score: number;
  sections: { name: string; score: number; feedback: string }[];
  strengths: string[];
  weaknesses: string[];
  atsScore: number;
}> {
  const prompt = `Analyze this resume and provide a detailed assessment. Return ONLY valid JSON in this exact format:
{
  "score": <overall score 0-100>,
  "sections": [
    {"name": "Contact Information", "score": <0-100>, "feedback": "<brief feedback>"},
    {"name": "Professional Summary", "score": <0-100>, "feedback": "<brief feedback>"},
    {"name": "Work Experience", "score": <0-100>, "feedback": "<brief feedback>"},
    {"name": "Skills", "score": <0-100>, "feedback": "<brief feedback>"},
    {"name": "Education", "score": <0-100>, "feedback": "<brief feedback>"},
    {"name": "Formatting", "score": <0-100>, "feedback": "<brief feedback>"}
  ],
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "atsScore": <ATS compatibility score 0-100>
}

Resume to analyze:
${resumeText}`;

  const response = await generateContent(prompt);
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Invalid response format');
  } catch {
    return {
      score: 70,
      sections: [
        { name: "Contact Information", score: 80, feedback: "Present but could be improved" },
        { name: "Professional Summary", score: 65, feedback: "Consider adding more impact" },
        { name: "Work Experience", score: 75, feedback: "Good detail, add more metrics" },
        { name: "Skills", score: 70, feedback: "Relevant skills listed" },
        { name: "Education", score: 80, feedback: "Well formatted" },
        { name: "Formatting", score: 60, feedback: "Could be more scannable" }
      ],
      strengths: ["Clear structure", "Relevant experience", "Good skill set"],
      weaknesses: ["Could use more metrics", "Summary needs work", "Formatting improvements needed"],
      atsScore: 68
    };
  }
}

// Resume Improver - Returns suggestions
export async function improveResume(resumeText: string): Promise<{
  suggestions: { type: 'error' | 'warning' | 'tip'; category: string; original: string; suggested: string; reason: string }[];
  improvedResume: string;
}> {
  const prompt = `Analyze this resume and provide specific improvement suggestions. Return ONLY valid JSON:
{
  "suggestions": [
    {
      "type": "error|warning|tip",
      "category": "Grammar|Action Verbs|Formatting|Keywords|Achievements|Structure",
      "original": "<original text>",
      "suggested": "<improved text>",
      "reason": "<why this change matters>"
    }
  ],
  "improvedResume": "<full improved resume text>"
}

Resume:
${resumeText}`;

  const response = await generateContent(prompt);
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Invalid response format');
  } catch {
    return {
      suggestions: [
        { type: 'tip', category: 'Action Verbs', original: 'Worked on', suggested: 'Developed', reason: 'Stronger action verbs create more impact' },
        { type: 'warning', category: 'Achievements', original: 'Improved sales', suggested: 'Increased sales by 25%', reason: 'Quantified achievements are more compelling' }
      ],
      improvedResume: resumeText
    };
  }
}

// Interview Guide
export async function generateInterviewGuide(jobTitle: string, company: string, jobDescription: string): Promise<string> {
  const prompt = `Create a comprehensive interview preparation guide for a ${jobTitle} position at ${company || 'a tech company'}.

Job Description: ${jobDescription || 'General ' + jobTitle + ' role'}

Include:
1. **Common Interview Questions** (10-15 questions with sample answers)
2. **Technical Questions** (if applicable, 5-8 questions)
3. **Behavioral Questions** (5-8 STAR method examples)
4. **Questions to Ask the Interviewer** (5-7 thoughtful questions)
5. **Company Research Tips**
6. **Key Skills to Highlight**
7. **Red Flags to Avoid**
8. **Final Tips for Success**

Format the response in markdown with clear sections and bullet points.`;

  return generateContent(prompt);
}

// Cover Letter Generator
export async function generateCoverLetter(
  jobTitle: string,
  company: string,
  jobDescription: string,
  skills: string,
  experience: string
): Promise<string> {
  const prompt = `Write a professional cover letter for a ${jobTitle} position at ${company}.

Job Description: ${jobDescription || 'Not provided'}
My Skills: ${skills || 'Various relevant skills'}
My Experience: ${experience || 'Relevant professional experience'}

Create a compelling cover letter that:
- Opens with a strong hook
- Highlights relevant experience and skills
- Shows enthusiasm for the company
- Includes specific achievements
- Ends with a call to action

Return the cover letter in a professional format ready to use.`;

  return generateContent(prompt);
}

// Salary Estimator
export async function estimateSalary(
  jobTitle: string,
  location: string,
  experience: string,
  skills: string
): Promise<string> {
  const prompt = `Provide a detailed salary analysis for a ${jobTitle} position in ${location}.

Experience Level: ${experience || 'Mid-level'}
Key Skills: ${skills || 'Standard skills for the role'}

Include:
1. **Salary Range**
   - Entry Level
   - Mid Level
   - Senior Level
   - Executive Level

2. **Location Factors**
   - Cost of living adjustment
   - Market demand in the area

3. **Skills Premium**
   - Which skills command higher pay
   - Certification benefits

4. **Negotiation Tips**
   - How to negotiate effectively
   - What to avoid
   - Timing strategies

5. **Benefits to Consider**
   - Common benefits in this role
   - Monetary value of benefits

6. **Industry Comparison**
   - Startup vs Enterprise
   - Different industries

Format in markdown with clear sections.`;

  return generateContent(prompt);
}

// Job Description Generator
export async function generateJobDescription(
  title: string,
  company: string,
  type: string,
  requirements: string,
  responsibilities: string
): Promise<string> {
  const prompt = `Create a professional, SEO-optimized job description for a ${title} position at ${company} (${type}).

Requirements provided: ${requirements || 'Standard requirements'}
Responsibilities provided: ${responsibilities || 'Standard responsibilities'}

Create a complete job posting that includes:
1. **Job Title** (SEO optimized)
2. **Company Overview** (compelling intro)
3. **Role Summary** (2-3 sentences)
4. **Key Responsibilities** (8-10 bullet points)
5. **Required Qualifications** (6-8 points)
6. **Preferred Qualifications** (4-6 points)
7. **Benefits & Perks**
8. **Company Culture**
9. **Equal Opportunity Statement**
10. **How to Apply**

Make it engaging, inclusive, and optimized for job boards.`;

  return generateContent(prompt);
}
