import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { FileText, Brain, Target, TrendingDown, Users, CheckCircle } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Turn Job Descriptions into the
            <span className="text-blue-600"> Right Hiring Assessments</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stop guessing which tests to use. Let AI analyze your job descriptions and recommend
            assessments that reduce hiring risk, lower attrition, and maximize your hiring budget.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/analyze">
              <Button size="lg">Analyze Job Description</Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg">
                View How It Works
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <Card className="p-6 text-center" hover>
              <TrendingDown className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reduce Hiring Risk</h3>
              <p className="text-gray-600 text-sm">
                Match assessments to actual job requirements, not generic templates
              </p>
            </Card>

            <Card className="p-6 text-center" hover>
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lower Attrition</h3>
              <p className="text-gray-600 text-sm">
                Hire candidates whose skills truly match the role complexity
              </p>
            </Card>

            <Card className="p-6 text-center" hover>
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Maximize Budget</h3>
              <p className="text-gray-600 text-sm">
                Stop wasting resources on irrelevant tests and bad hires
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Upload Job Description</h3>
              <p className="text-gray-600">
                Paste your job description or upload a document. Our system accepts any format.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900">AI Analyzes Skills & Complexity</h3>
              <p className="text-gray-600">
                Advanced NLP extracts technical skills, soft skills, and calculates role complexity.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Get Assessment Recommendations</h3>
              <p className="text-gray-600">
                Receive tailored assessment recommendations with ideal timing and test durations.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/analyze">
              <Button size="lg">Try It Now</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            The Cost of Wrong Assessments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold text-red-600 mb-2">$15K+</p>
              <p className="text-gray-700">Average cost of a bad hire</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-red-600 mb-2">68%</p>
              <p className="text-gray-700">Of companies report bad hires</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-red-600 mb-2">6 months</p>
              <p className="text-gray-700">Average time to identify a mismatch</p>
            </div>
          </div>
          <p className="text-gray-600 mt-8 text-lg">
            Don't let generic assessments drain your hiring budget and team morale.
          </p>
        </div>
      </section>
    </div>
  );
}
