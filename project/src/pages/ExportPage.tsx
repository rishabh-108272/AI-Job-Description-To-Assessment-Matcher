import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SkillChip } from '../components/SkillChip';
import { Download, CheckCircle, ArrowLeft } from 'lucide-react';
import { AnalysisResult } from '../types';

export function ExportPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
  const storedResult =
    localStorage.getItem('exportResult') ||
    localStorage.getItem('analysisResult');

  if (storedResult) {
    setResult(JSON.parse(storedResult));
  }
}, []);


 const handleExportPDF = async () => {
  if (!result) return;

  try {
    setIsExporting(true);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/export/pdf/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      }
    );

    if (!response.ok) throw new Error('Export failed');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'assessment_report.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (_err) {
    alert('PDF export failed');
  } finally {
    setIsExporting(false);
  }
};


  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No export data found</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/results" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Export Assessment Report
          </h1>
          <p className="text-lg text-gray-600">
            Review and export your complete analysis summary
          </p>
        </div>

        <Card className="p-8 mb-8 bg-white print:shadow-none">
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Assessment Match Report
                </h2>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">Completed</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Job Title:</span>
                  <span className="ml-2 font-semibold text-gray-900">{result.jobTitle}</span>
                </div>
                <div>
                  <span className="text-gray-500">Analysis Date:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Processing Time:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {result.processingTime}ms
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Complexity Score:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {result.complexityScore.score}/10
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Skills Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Technical Skills ({technicalSkills.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.map((skill, idx) => (
                      <SkillChip key={idx} label={skill.name} variant="technical" />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Soft Skills ({softSkills.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {softSkills.map((skill, idx) => (
                      <SkillChip key={idx} label={skill.name} variant="soft" />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Tools & Technologies ({tools.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((skill, idx) => (
                      <SkillChip key={idx} label={skill.name} variant="tool" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complexity Analysis</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-4xl font-bold text-blue-600">
                    {result.complexityScore.score}/10
                  </span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600"
                      style={{ width: `${(result.complexityScore.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {result.complexityScore.explanation}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recommended Assessments ({result.assessments.length})
              </h3>
              <div className="space-y-4">
                {result.assessments.map((assessment, idx) => (
                  <div key={assessment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="font-bold text-gray-400 text-lg">#{idx + 1}</span>
                          <h4 className="font-bold text-gray-900">{assessment.title}</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                            {assessment.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{assessment.description}</p>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {assessment.matchScore}%
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-6 text-sm">
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <span className="ml-2 font-semibold text-gray-900">{assessment.duration}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Stage:</span>
                        <span className="ml-2 font-semibold text-gray-900">{assessment.stage}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-xs text-gray-500 text-center">
                This report was generated using AI-powered analysis. Recommendations should be reviewed
                by HR professionals before implementation. For questions or support, contact your assessment provider.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex justify-center space-x-4">
          <Button size="lg" onClick={handleExportPDF} disabled={isExporting}>
            {isExporting ? (
              <>Exporting...</>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Export as PDF
              </>
            )}
          </Button>
          <Link to="/analyze">
            <Button variant="outline" size="lg">
              Analyze Another JD
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
