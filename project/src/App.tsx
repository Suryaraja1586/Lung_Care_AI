import React, { useState } from 'react';
import { Stethoscope, Upload, Heart, Shield, Users, Award, ChevronRight, FileImage, AlertCircle, CheckCircle, X, Activity, Zap, Star, Phone, Mail, MapPin, Clock } from 'lucide-react';

interface DiagnosticResult {
  confidence: number;
  findings: string[];
  recommendation: string;
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'xray'>('home');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setDiagnosticResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const mockResults: DiagnosticResult[] = [
        {
          confidence: 94,
          findings: ['Clear lung fields', 'Normal cardiac silhouette', 'No signs of pneumonia'],
          recommendation: 'Lungs appear normal. Continue regular health maintenance.',
          severity: 'normal'
        },
        {
          confidence: 87,
          findings: ['Mild bronchial wall thickening', 'Possible early signs of COPD'],
          recommendation: 'Follow up with pulmonologist for further evaluation.',
          severity: 'mild'
        },
        {
          confidence: 91,
          findings: ['Consolidation in lower right lobe', 'Possible pneumonia'],
          recommendation: 'Immediate medical attention recommended. Consult physician.',
          severity: 'moderate'
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setDiagnosticResult(randomResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'normal': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'mild': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'moderate': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'severe': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (currentPage === 'xray') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Navigation */}
        <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Activity className="h-8 w-8 text-cyan-400" />
                <span className="text-xl font-bold text-white">LungCare AI</span>
              </div>
              <button
                onClick={() => setCurrentPage('home')}
                className="text-white hover:text-cyan-400 transition-colors duration-200"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              AI-Powered X-ray Analysis
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Upload your chest X-ray for instant AI-powered diagnostic insights
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
            <div className="text-center">
              <div className="mb-6">
                <FileImage className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">Upload X-ray Image</h3>
                <p className="text-blue-200">Select a chest X-ray image for AI analysis</p>
              </div>

              <div className="border-2 border-dashed border-cyan-400/50 rounded-xl p-8 hover:border-cyan-400 transition-colors duration-300">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="xray-upload"
                />
                <label
                  htmlFor="xray-upload"
                  className="cursor-pointer flex flex-col items-center space-y-4"
                >
                  <Upload className="h-12 w-12 text-cyan-400" />
                  <span className="text-white text-lg">Click to upload or drag and drop</span>
                  <span className="text-blue-300 text-sm">PNG, JPG, JPEG up to 10MB</span>
                </label>
              </div>
            </div>
          </div>

          {/* Uploaded Image Preview */}
          {uploadedImage && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Uploaded X-ray</h3>
              <div className="flex justify-center mb-6">
                <img
                  src={uploadedImage}
                  alt="Uploaded X-ray"
                  className="max-w-md max-h-96 rounded-lg shadow-lg"
                />
              </div>
              <div className="text-center">
                <button
                  onClick={simulateAnalysis}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    'Start AI Analysis'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {diagnosticResult && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-6">Analysis Results</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Confidence Score</h4>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${diagnosticResult.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-cyan-400 font-bold">{diagnosticResult.confidence}%</span>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Severity Level</h4>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(diagnosticResult.severity)}`}>
                      {diagnosticResult.severity.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Findings</h4>
                    <ul className="space-y-2">
                      {diagnosticResult.findings.map((finding, index) => (
                        <li key={index} className="flex items-start space-x-2 text-blue-200">
                          <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white/5 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Recommendation</h4>
                <p className="text-blue-200">{diagnosticResult.recommendation}</p>
              </div>

              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">Medical Disclaimer</h4>
                    <p className="text-amber-200 text-sm">
                      This AI analysis is for informational purposes only and should not replace professional medical diagnosis. 
                      Please consult with a qualified healthcare provider for proper medical evaluation and treatment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold text-white">LungCare AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-white hover:text-cyan-400 transition-colors duration-200">Services</a>
              <a href="#about" className="text-white hover:text-cyan-400 transition-colors duration-200">About</a>
              <a href="#contact" className="text-white hover:text-cyan-400 transition-colors duration-200">Contact</a>
              <button
                onClick={() => setCurrentPage('xray')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
              >
                X-ray Analysis
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Advanced
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> AI Lung </span>
                Healthcare
              </h1>
              <p className="text-xl text-blue-200 leading-relaxed">
                Revolutionary AI-powered diagnostics and comprehensive lung care solutions. 
                Get instant X-ray analysis and expert medical guidance for optimal respiratory health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentPage('xray')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Start X-ray Analysis
                </button>
                <button className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-400 hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl blur-3xl"></div>
              <img
                src="https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Advanced Medical Technology"
                className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Comprehensive Lung Care Services
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Advanced AI diagnostics combined with expert medical care for complete respiratory health solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "AI X-ray Analysis",
                description: "Instant chest X-ray interpretation with 94% accuracy using advanced machine learning algorithms",
                gradient: "from-cyan-500 to-blue-600"
              },
              {
                icon: <Stethoscope className="h-8 w-8" />,
                title: "Expert Consultation",
                description: "Connect with certified pulmonologists for personalized treatment plans and medical guidance",
                gradient: "from-blue-500 to-indigo-600"
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Preventive Care",
                description: "Comprehensive screening programs and early detection protocols for optimal lung health",
                gradient: "from-indigo-500 to-purple-600"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Treatment Plans",
                description: "Customized therapy protocols for COPD, asthma, pneumonia, and other respiratory conditions",
                gradient: "from-purple-500 to-pink-600"
              },
              {
                icon: <Activity className="h-8 w-8" />,
                title: "Monitoring",
                description: "Continuous health tracking with smart devices and regular follow-up assessments",
                gradient: "from-pink-500 to-red-600"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Support Groups",
                description: "Community support networks and educational resources for patients and families",
                gradient: "from-red-500 to-orange-600"
              }
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${service.gradient} mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-blue-200 leading-relaxed">{service.description}</p>
                <div className="mt-6">
                  <button className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-300">
                    <span>Learn More</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="AI Medical Analysis"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl"></div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">
                Cutting-Edge AI Technology
              </h2>
              <p className="text-xl text-blue-200">
                Our advanced artificial intelligence system analyzes chest X-rays with unprecedented accuracy, 
                providing instant diagnostic insights that support healthcare professionals in making informed decisions.
              </p>
              <div className="space-y-4">
                {[
                  { stat: "94%", label: "Diagnostic Accuracy" },
                  { stat: "< 30s", label: "Analysis Time" },
                  { stat: "50K+", label: "X-rays Analyzed" },
                  { stat: "24/7", label: "Availability" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-bold text-lg min-w-[80px] text-center">
                      {item.stat}
                    </div>
                    <span className="text-blue-200">{item.label}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage('xray')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
              >
                Try AI Analysis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">
                Expert Medical Team
              </h2>
              <p className="text-xl text-blue-200">
                Our team of board-certified pulmonologists and AI specialists work together to provide 
                the highest quality lung care, combining decades of medical expertise with cutting-edge technology.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <Award className="h-6 w-6" />, title: "Board Certified", desc: "Pulmonologists" },
                  { icon: <Users className="h-6 w-6" />, title: "15+ Years", desc: "Experience" },
                  { icon: <Star className="h-6 w-6" />, title: "98%", desc: "Patient Satisfaction" },
                  { icon: <Shield className="h-6 w-6" />, title: "HIPAA", desc: "Compliant" }
                ].map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                    <div className="text-cyan-400 mb-2">{item.icon}</div>
                    <div className="text-white font-semibold">{item.title}</div>
                    <div className="text-blue-200 text-sm">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Medical Professionals"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1555708/pexels-photo-1555708.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Healthy Lungs"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 to-blue-900/80"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Take Control of Your Lung Health Today
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Don't wait for symptoms to appear. Get your chest X-ray analyzed by our AI system 
            and receive expert medical guidance for optimal respiratory health.
          </p>
          <button
            onClick={() => setCurrentPage('xray')}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Analysis Now
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-blue-200">
              Have questions? Our medical team is here to help you 24/7
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Phone className="h-8 w-8" />,
                title: "Emergency Hotline",
                info: "+1 (555) 123-4567",
                desc: "24/7 Emergency Support"
              },
              {
                icon: <Mail className="h-8 w-8" />,
                title: "Email Support",
                info: "support@lungcare.ai",
                desc: "Response within 2 hours"
              },
              {
                icon: <MapPin className="h-8 w-8" />,
                title: "Medical Center",
                info: "123 Healthcare Ave",
                desc: "New York, NY 10001"
              }
            ].map((contact, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white mb-6">
                  {contact.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{contact.title}</h3>
                <p className="text-cyan-400 font-medium mb-2">{contact.info}</p>
                <p className="text-blue-200 text-sm">{contact.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-md border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-8 w-8 text-cyan-400" />
                <span className="text-xl font-bold text-white">LungCare AI</span>
              </div>
              <p className="text-blue-200">
                Advanced AI-powered lung healthcare solutions for better respiratory health.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">X-ray Analysis</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Consultation</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Treatment</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Monitoring</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">HIPAA Compliance</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Medical Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-blue-200">
              © 2024 LungCare AI. All rights reserved. | Medical services provided by licensed healthcare professionals.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;