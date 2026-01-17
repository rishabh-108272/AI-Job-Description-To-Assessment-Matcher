import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Spinner } from '../components/Spinner';
import { Upload, FileText } from 'lucide-react';
import { analyzeJobDescription } from '../services/analysisService';
import { extractTextFromFile } from '../utils/fileTextExtractor';

const SAMPLE_JD = `Senior Full-Stack Developer

We are seeking an experienced Senior Full-Stack Developer to join our growing engineering team.

Key Responsibilities:
- Design and develop scalable web applications using React.js and Node.js
- Lead architectural decisions and mentor junior developers
- Collaborate with product managers and designers to deliver high-quality features
- Write clean, maintainable code with comprehensive test coverage
- Deploy and monitor applications on AWS infrastructure

Required Skills:
- 5+ years of experience with JavaScript/TypeScript
- Expert-level knowledge of React.js, Node.js, and REST APIs
- Strong understanding of database design (PostgreSQL, MongoDB)
- Experience with cloud platforms (AWS preferred)
- Excellent problem-solving and communication skills
- Proven track record of leading technical projects

Nice to Have:
- Experience with Docker and Kubernetes
- Knowledge of CI/CD pipelines
- Familiarity with GraphQL
- Open-source contributions`;

export function AnalyzePage() {
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState('');

  // FILE UPLOAD HANDLER (INSIDE COMPONENT)
  const handleFileUpload = async (file: File) => {
    try {
      const text = await extractTextFromFile(file);

      if (!text.trim()) {
        alert('No readable text found in file');
        return;
      }

      setJobDescription(text);
    } catch (error) {
      console.error(error);
      alert('Unsupported or corrupted file');
    }
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description');
      return;
    }

    setIsAnalyzing(true);

    const progressSteps = [
      'Parsing job description...',
      'Extracting technical skills...',
      'Identifying soft skills...',
      'Analyzing role complexity...',
      'Matching assessment types...',
      'Generating recommendations...',
    ];

    for (let i = 0; i < progressSteps.length; i++) {
      setProgress(progressSteps[i]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    try {
      const result = await analyzeJobDescription(jobDescription);
      localStorage.setItem('analysisResult', JSON.stringify(result));
      navigate('/results');
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
      setIsAnalyzing(false);
    }
  };

  const loadSample = () => {
    setJobDescription(SAMPLE_JD);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isAnalyzing ? (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">
                Analyze Job Description
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Paste your job description below, or upload a file, and our AI
                will extract key skills, calculate complexity, and recommend
                assessments.
              </p>
            </div>

            <Card className="p-8">
              <div className="space-y-6">
                {/* TEXTAREA */}
                <div>
                  <label
                    htmlFor="job-description"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Job Description
                  </label>
                  <textarea
                    id="job-description"
                    rows={16}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800"
                    placeholder="Paste your complete job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">
                      {jobDescription.length} characters
                    </p>
                    <button
                      onClick={loadSample}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Load Sample JD
                    </button>
                  </div>
                </div>

                {/* FILE UPLOAD */}
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer block">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">
                    Or upload a job description file
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOCX, or TXT
                  </p>

                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.txt"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                </label>

                {/* ANALYZE BUTTON */}
                <div className="flex justify-center pt-4">
                  <Button size="lg" onClick={handleAnalyze}>
                    <FileText className="w-5 h-5 mr-2" />
                    Analyze Job Description
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="p-12 max-w-md w-full">
              <div className="text-center space-y-6">
                <Spinner size="lg" className="mx-auto" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Analyzing Job Description
                  </h2>
                  <p className="text-blue-600 font-medium">{progress}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full animate-pulse"
                    style={{ width: '70%' }}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  This usually takes 2-3 seconds...
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
