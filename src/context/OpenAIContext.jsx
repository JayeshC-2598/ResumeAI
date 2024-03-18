import React, { createContext, useContext } from "react";
import OpenAI from "openai";
export const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});
const prompt = `
"""
# [Candidate Name]
**Contact Number:** | **Email Address:** | **LinkedIn Profile:** | **Location:** 
Also add Any other links like portfolio, github or any other platform if given in the resume.

## Summary
> Please provide a concise, 2-3 line summary of professional experience and skills relevant to the given job description that candidate is applying. Do not add any fake experience number.

## Skills
Please list skills in a table format with the skill category and comma separated skills. From the given resume data and job description only add relevant skills required for this job. you must add only those skills which are totally relavent to the job.

| Category | Skills |
|-------|-------------------|
|       |                   |
|       |                   |

## Work Experience
Please list work experiences in bullet points, starting with the most recent one. Include your job title, company name, duration, and a short description of your responsibilities and achievements. Write only relevant bullet points that can help to boost the chances to get this job. Do not add any fake experiences on your own. Now you can add more relevant keywords from job descriptions with technologies used. 
 
### [Job Title 1] at [Company Name 1]
[Duration]
- 
- 
- 

### [Job Title 2] at [Company Name 2]
[Duration]
- 
- 
- 

## Education
Please list your educational qualifications in a table format with the degree name, institution name, and year of completion. You can modify the column as required. Stick to the information that the candidate provided strictly.

| Degree | Institution | Year of Completion |
|--------|-------------|--------------------|
|        |             |                    |
|        |             |                    |

## Certifications
Please list any certifications you have in a table format with the certification name, issuing authority, and year of completion. You can change the column according to data provided. Add only those certifications which are valid to job descriptions. Do not add any additional certification on your own.

| Certification | Issuing Authority | Year of Completion |
|---------------|-------------------|--------------------|
|               |                   |                    |
|               |                   |                    |

## Projects
Please list your projects in bullet points, including the project name, duration, and a brief description of the project and your role in it. Add this section only if projects are relevant to the given job description. If the candidate is fresher then add this project section after the skill sections. Make this project very concise and add relevant keywords from the job description only.

### [Project Name 1]
[Duration]
- 
- 
- 

### [Project Name 2]
[Duration]
- 
- 
- 

"""

Instructions to follow while generating above resume:
Please ensure that the resume does not exceed one page. 
Your output should be minimalist markdown format as given above.
You add or remove any section if necessary for the job he is applying for but do not put any fake or false information.
Pick only important keywords from the job description and use it inside every section that can help to rank the resume in ATS System.
Write only those section and keywords which are totally relevant and it can fit into one page.
`;



export const OpenAIContext = createContext();


export default function OpenAIContextProvider({ children }) {

    const GetOpenAIResponse = async (message) => {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: message },
            ],
            model: "gpt-4",
            temperature: 0.1,
        });
        return completion.choices[0].message.content;
    };
    return (
        <OpenAIContext.Provider value={{GetOpenAIResponse}}>{children}</OpenAIContext.Provider>
    )
}

export const useOpenAIContext = () => {
    const context = useContext(OpenAIContext);
    if (!context) throw Error("OpenAIContext must be used inside an OpenAIContextProvider");
    return context;
}
