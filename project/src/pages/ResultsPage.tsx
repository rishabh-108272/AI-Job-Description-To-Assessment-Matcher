import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SkillChip } from '../components/SkillChip';
import { ProgressBar } from '../components/ProgressBar';
import { Download, ArrowRight, CheckCircle2, Clock, Target } from 'lucide-react';
import { AnalysisResult} from '../types';


export function ResultsPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);

 useEffect(() => {
  const storedResult = localStorage.getItem('analysisResult');

  if (storedResult) {
    setResult(JSON.parse(storedResult));
  } else {
    // No mock → redirect user back to analyze page
    navigate('/analyze');
  }
}, [navigate]);


  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No analysis results found</p>
          <Link to="/analyze">
            <Button>Analyze a Job Description</Button>
          </Link>
        </div>
      </div>
    );
  }

  const technicalSkills = result.skills.filter((s) => s.category === 'technical');
  const softSkills = result.skills.filter((s) => s.category === 'soft');
  const tools = result.skills.filter((s) => s.category === 'tool');

  const handleExport = () => {
    localStorage.setItem('exportResult', JSON.stringify(result));
    navigate('/export');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Analysis Complete
              </h1>
              <p className="text-lg text-gray-600">
                Job Title: <span className="font-semibold text-gray-900">{result.jobTitle}</span>
              </p>
            </div>
            <Button onClick={handleExport}>
              <Download className="w-5 h-5 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircle2 className="w-7 h-7 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Extracted Skills</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Technical Skills ({technicalSkills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill, idx) => (
                    <SkillChip key={idx} label={skill.name} variant="technical" />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Soft Skills ({softSkills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, idx) => (
                    <SkillChip key={idx} label={skill.name} variant="soft" />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Tools & Technologies ({tools.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((skill, idx) => (
                    <SkillChip key={idx} label={skill.name} variant="tool" />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-7 h-7 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Role Complexity Score</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <ProgressBar
                    value={result.complexityScore.score}
                    max={result.complexityScore.maxScore}
                  />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {result.complexityScore.score}/{result.complexityScore.maxScore}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  {result.complexityScore.explanation}
                </p>
              </div>
            </div>
          </Card>

          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="w-7 h-7 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Assessment Recommendations</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {result.assessments.map((assessment) => (
                <Card key={assessment.id} className="p-6" hover>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-2">
                          {assessment.type}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {assessment.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {assessment.matchScore}%
                        </div>
                        <div className="text-xs text-gray-500">Match</div>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      {assessment.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Duration</p>
                        <p className="font-semibold text-gray-900">{assessment.duration}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Best Stage</p>
                        <p className="font-semibold text-gray-900">{assessment.stage}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button size="lg" onClick={handleExport}>
              Continue to Export
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
