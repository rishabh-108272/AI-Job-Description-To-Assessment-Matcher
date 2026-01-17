import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Users, Building2, Rocket, ShieldCheck, TrendingUp, Target, Zap, Award } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About Assessment Matcher
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming how HR teams select hiring assessments through AI-powered job description analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Most companies use generic, one-size-fits-all assessments that don't match their actual hiring needs.
                This leads to:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Poor hiring decisions that cost an average of $15,000 per bad hire</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>High attrition rates due to skill-role mismatches</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Wasted resources on irrelevant testing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Frustrated candidates facing inappropriate assessments</span>
                </li>
              </ul>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Assessment Matcher uses advanced AI to analyze job descriptions and recommend the most
                effective assessments based on:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Extracted technical and soft skills requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Role complexity scoring on a 10-point scale</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Ideal assessment timing and duration guidance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Match scores for different assessment types</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Who This Tool Is For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center" hover>
              <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">HR Teams</h3>
              <p className="text-gray-600">
                In-house talent acquisition teams looking to improve hiring quality and reduce time-to-hire
                with data-driven assessment selection.
              </p>
            </Card>

            <Card className="p-8 text-center" hover>
              <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Recruiters</h3>
              <p className="text-gray-600">
                Staffing agencies and independent recruiters who need to quickly match candidates with
                appropriate assessments for multiple clients.
              </p>
            </Card>

            <Card className="p-8 text-center" hover>
              <Rocket className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">HR SaaS Startups</h3>
              <p className="text-gray-600">
                Technology companies building hiring platforms who want to integrate intelligent
                assessment recommendations into their products.
              </p>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Business Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Better Hiring Decisions</h4>
              <p className="text-sm text-gray-600">
                Match assessments to actual job requirements for more accurate candidate evaluation
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Reduced Attrition</h4>
              <p className="text-sm text-gray-600">
                Hire candidates whose skills truly align with role complexity and demands
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Zap className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Faster Time-to-Hire</h4>
              <p className="text-sm text-gray-600">
                Eliminate guesswork and manual research in selecting the right assessments
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Cost Savings</h4>
              <p className="text-sm text-gray-600">
                Avoid expensive bad hires and unnecessary testing with targeted recommendations
              </p>
            </Card>
          </div>
        </div>

        <Card className="p-8 mb-16 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-4">
            <ShieldCheck className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ethical AI & Disclaimer</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>This is a demonstration prototype</strong> designed to showcase the potential of
                  AI-powered assessment matching technology. It is not intended for production use in actual
                  hiring decisions without proper validation.
                </p>
                <p>
                  <strong>Important considerations:</strong>
                </p>
                <ul className="ml-6 space-y-1 text-sm">
                  <li>• All recommendations should be reviewed by qualified HR professionals</li>
                  <li>• Assessment selection must comply with employment law and anti-discrimination regulations</li>
                  <li>• This tool does not replace human judgment in hiring decisions</li>
                  <li>• Results are based on mock AI analysis for demonstration purposes only</li>
                  <li>• No actual machine learning models or APIs are connected in this prototype</li>
                </ul>
                <p className="text-sm">
                  For production implementation, this system would require rigorous testing, bias auditing,
                  legal compliance verification, and integration with validated assessment providers.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to See It in Action?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Try analyzing a job description to see how AI can transform your assessment selection process
          </p>
          <Link to="/analyze">
            <Button size="lg">Analyze a Job Description</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
