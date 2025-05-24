import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiCode, 
  FiSmartphone, 
  FiLayout, 
  FiDatabase,
  FiServer,
  FiSettings,
  FiInfo,
  FiX,
  FiSend
} from 'react-icons/fi';

const ProjectCostEstimator = () => {
  // State for multi-step form
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [animateForm, setAnimateForm] = useState(true);
  const [formData, setFormData] = useState({
    projectType: '',
    projectScope: '',
    features: [],
    timeline: '',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    }
  });
  
  // Estimated cost calculation state
  const [costEstimate, setCostEstimate] = useState({
    lowEstimate: 0,
    highEstimate: 0,
    timelineWeeks: 0,
    breakdown: []
  });
  
  // Options for select inputs
  const projectTypes = [
    { id: 'website', name: 'Website', icon: <FiCode /> },
    { id: 'mobileApp', name: 'Mobile App', icon: <FiSmartphone /> },
    { id: 'webApp', name: 'Web Application', icon: <FiLayout /> },
    { id: 'ecommerce', name: 'E-commerce Platform', icon: <FiDatabase /> },
    { id: 'enterprise', name: 'Enterprise Solution', icon: <FiServer /> }
  ];
  
  const projectScopes = [
    { id: 'small', name: 'Small (5-10 pages/screens)', factor: 1.5 },
    { id: 'medium', name: 'Medium (10-20 pages/screens)', factor: 1.8 },
    { id: 'large', name: 'Large (20+ pages/screens)', factor: 2.5 }
  ];
  
  const featureOptions = [
    { id: 'responsiveDesign', name: 'Responsive Design', cost: 10000, time: 1 },
    { id: 'customUI', name: 'Custom UI/UX Design', cost: 20000, time: 2 },
    { id: 'cms', name: 'Content Management System', cost: 20000, time: 2 },
    { id: 'userAuth', name: 'User Authentication', cost: 20000, time: 1.5 },
    { id: 'payment', name: 'Payment Integration', cost: 10000, time: 2 },
    { id: 'search', name: 'Advanced Search Functionality', cost: 10000, time: 1.5 },
    { id: 'thirdPartyAPI', name: 'Third-party API Integration', cost: 15000, time: 1.5 },
    { id: 'dataVisualization', name: 'Data Visualization', cost: 10000, time: 2 },
    { id: 'multilingual', name: 'Multilingual Support', cost: 10000, time: 1.5 },
    { id: 'analytics', name: 'Analytics & Reporting', cost: 15000, time: 2 }
  ];
  
  const timelineOptions = [
    { id: 'standard', name: 'Standard Timeline', factor: 1 },
    { id: 'expedited', name: 'Expedited (20% faster)', factor: 1.2 },
    { id: 'flexible', name: 'Flexible (no rush)', factor: 0.8 }
  ];
  
  // Base costs by project type (in INR)
  const baseCosts = {
    'website': { low: 20000, high: 60000, time: 3 },
    'mobileApp': { low: 40000, high: 100000, time: 6 },
    'webApp': { low: 30000, high: 80000, time: 5 },
    'ecommerce': { low: 40000, high: 200000, time: 7 },
    'enterprise': { low: 100000, high: 300000, time: 10 }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'features') {
      let updatedFeatures = [...formData.features];
      if (checked) {
        updatedFeatures.push(value);
      } else {
        updatedFeatures = updatedFeatures.filter(feature => feature !== value);
      }
      
      setFormData(prevData => ({
        ...prevData,
        features: updatedFeatures
      }));
    } else if (name.includes('.')) {
      // Handle nested objects (contact info)
      const [parent, child] = name.split('.');
      setFormData(prevData => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  // Move to next step
  const nextStep = () => {
    setAnimateForm(false);
    setTimeout(() => {
      setStep(step + 1);
      setAnimateForm(true);
    }, 300);
  };

  // Move to previous step
  const prevStep = () => {
    setAnimateForm(false);
    setTimeout(() => {
      setStep(step - 1);
      setAnimateForm(true);
    }, 300);
  };

  // Calculate cost estimate
  const calculateEstimate = () => {
    setLoading(true);
    
    // Simulate API call or complex calculation with timeout
    setTimeout(() => {
      try {
        // Get base cost for selected project type
        const base = baseCosts[formData.projectType] || baseCosts.website;
        
        // Get scope factor
        const scopeFactor = projectScopes.find(scope => scope.id === formData.projectScope)?.factor || 1;
        
        // Get timeline factor
        const timelineFactor = timelineOptions.find(option => option.id === formData.timeline)?.factor || 1;
        
        // Calculate feature costs
        let featureCostLow = 0;
        let featureCostHigh = 0;
        let featureTime = 0;
        
        // Create breakdown for features
        const breakdown = formData.features.map(featureId => {
          const feature = featureOptions.find(option => option.id === featureId);
          if (feature) {
            featureCostLow += feature.cost * 0.8; // 20% variation for low estimate
            featureCostHigh += feature.cost * 1.2; // 20% variation for high estimate
            featureTime += feature.time;
            return {
              name: feature.name,
              lowCost: Math.round(feature.cost * 0.8),
              highCost: Math.round(feature.cost * 1.2),
              time: feature.time
            };
          }
          return null;
        }).filter(Boolean);
        
        // Calculate final estimates
        const lowEstimate = Math.round((base.low * scopeFactor + featureCostLow) * timelineFactor);
        const highEstimate = Math.round((base.high * scopeFactor + featureCostHigh) * timelineFactor);
        
        // Calculate timeline
        const baseTime = base.time * scopeFactor;
        const totalTime = Math.round((baseTime + featureTime) / timelineFactor);
        
        // Add base cost to breakdown
        const fullBreakdown = [
          {
            name: `Base ${projectTypes.find(type => type.id === formData.projectType)?.name || 'Project'}`,
            lowCost: Math.round(base.low * scopeFactor),
            highCost: Math.round(base.high * scopeFactor),
            time: Math.round(baseTime)
          },
          ...breakdown
        ];
        
        // Set the calculated results
        setCostEstimate({
          lowEstimate,
          highEstimate,
          timelineWeeks: totalTime,
          breakdown: fullBreakdown
        });
        
        // Show results
        setLoading(false);
        setShowResults(true);
      } catch (error) {
        console.error("Error calculating estimate:", error);
        setLoading(false);
        // Handle error state if needed
      }
    }, 1500);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step < 4) {
      nextStep();
    } else {
      calculateEstimate();
    }
  };
  
  // Reset the form
  const resetForm = () => {
    setFormData({
      projectType: '',
      projectScope: '',
      features: [],
      timeline: '',
      contactInfo: {
        name: '',
        email: '',
        phone: ''
      }
    });
    setShowResults(false);
    setStep(1);
    setAnimateForm(true);
  };

  // Format currency (in INR)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Variants for animations
  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };
  
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="cosmic-card w-full overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/5 rounded-full filter blur-xl -z-0"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={headingVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Project Cost <span className="cosmic-text">Estimator</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Get a ballpark estimate for your project in just a few steps. This interactive tool helps you understand the cost factors.
          </p>
        </motion.div>
        
        {!showResults ? (
          <>
            {/* Progress Bar */}
            <div className="w-full bg-slate-800/50 h-2 rounded-full mb-8 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            
            {/* Form Steps */}
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {animateForm && (
                  <motion.div
                    key={step}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {/* Step 1: Project Type */}
                    {step === 1 && (
                      <div className="step-content">
                        <h3 className="text-xl font-bold mb-6">What type of project are you planning?</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                          {projectTypes.map((type) => (
                            <label 
                              key={type.id}
                              className={`cosmic-card flex items-center p-4 cursor-pointer transition-all duration-300 ${
                                formData.projectType === type.id 
                                  ? 'ring-2 ring-blue-500 bg-blue-900/20' 
                                  : 'bg-slate-800/50 hover:bg-slate-800/80'
                              }`}
                            >
                              <input
                                type="radio"
                                name="projectType"
                                value={type.id}
                                checked={formData.projectType === type.id}
                                onChange={handleChange}
                                className="sr-only"
                                required
                              />
                              <div className="mr-4 p-3 bg-slate-800 rounded-lg text-blue-400">
                                {type.icon}
                              </div>
                              <span>{type.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Step 2: Project Scope */}
                    {step === 2 && (
                      <div className="step-content">
                        <h3 className="text-xl font-bold mb-6">What is the scope of your project?</h3>
                        
                        <div className="space-y-4 mb-8">
                          {projectScopes.map((scope) => (
                            <label 
                              key={scope.id}
                              className={`block cosmic-card p-4 cursor-pointer transition-all duration-300 ${
                                formData.projectScope === scope.id 
                                  ? 'ring-2 ring-blue-500 bg-blue-900/20' 
                                  : 'bg-slate-800/50 hover:bg-slate-800/80'
                              }`}
                            >
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  name="projectScope"
                                  value={scope.id}
                                  checked={formData.projectScope === scope.id}
                                  onChange={handleChange}
                                  className="sr-only"
                                  required
                                />
                                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                  formData.projectScope === scope.id
                                    ? 'border-blue-500 bg-blue-500/20'
                                    : 'border-slate-500'
                                }`}>
                                  {formData.projectScope === scope.id && (
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                  )}
                                </div>
                                <span className="text-lg">{scope.name}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Step 3: Features */}
                    {step === 3 && (
                      <div className="step-content">
                        <h3 className="text-xl font-bold mb-6">Select the features you need</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                          {featureOptions.map((feature) => (
                            <label 
                              key={feature.id}
                              className={`cosmic-card flex items-center p-4 cursor-pointer transition-all duration-300 ${
                                formData.features.includes(feature.id) 
                                  ? 'ring-2 ring-blue-500 bg-blue-900/20' 
                                  : 'bg-slate-800/50 hover:bg-slate-800/80'
                              }`}
                            >
                              <input
                                type="checkbox"
                                name="features"
                                value={feature.id}
                                checked={formData.features.includes(feature.id)}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                                formData.features.includes(feature.id)
                                  ? 'border-blue-500 bg-blue-500/20'
                                  : 'border-slate-500'
                              }`}>
                                {formData.features.includes(feature.id) && (
                                  <FiCheckCircle className="text-blue-500" size={12} />
                                )}
                              </div>
                              <span>{feature.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Step 4: Timeline & Contact */}
                    {step === 4 && (
                      <div className="step-content">
                        <div className="mb-8">
                          <h3 className="text-xl font-bold mb-6">What is your preferred timeline?</h3>
                          
                          <div className="space-y-4 mb-8">
                            {timelineOptions.map((option) => (
                              <label 
                                key={option.id}
                                className={`block cosmic-card p-4 cursor-pointer transition-all duration-300 ${
                                  formData.timeline === option.id 
                                    ? 'ring-2 ring-blue-500 bg-blue-900/20' 
                                    : 'bg-slate-800/50 hover:bg-slate-800/80'
                                }`}
                              >
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    name="timeline"
                                    value={option.id}
                                    checked={formData.timeline === option.id}
                                    onChange={handleChange}
                                    className="sr-only"
                                    required
                                  />
                                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                    formData.timeline === option.id
                                      ? 'border-blue-500 bg-blue-500/20'
                                      : 'border-slate-500'
                                  }`}>
                                    {formData.timeline === option.id && (
                                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    )}
                                  </div>
                                  <span className="text-lg">{option.name}</span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-bold mb-6">Your contact information</h3>
                          
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="name" className="block text-slate-300 mb-2">Your Name</label>
                              <input
                                type="text"
                                id="name"
                                name="contactInfo.name"
                                value={formData.contactInfo.name}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                                placeholder=""
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="email" className="block text-slate-300 mb-2">Your Email</label>
                              <input
                                type="email"
                                id="email"
                                name="contactInfo.email"
                                value={formData.contactInfo.email}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                                placeholder=""
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="phone" className="block text-slate-300 mb-2">Phone Number (Optional)</label>
                              <input
                                type="tel"
                                id="phone"
                                name="contactInfo.phone"
                                value={formData.contactInfo.phone}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                                placeholder=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
                        >
                          Back
                        </button>
                      ) : (
                        <div></div> // Empty div for spacing
                      )}
                      
                      <button
                        type="submit"
                        className="cosmic-button flex items-center"
                      >
                        {step < 4 ? (
                          <>Next <FiArrowRight className="ml-2" /></>
                        ) : (
                          <>Calculate Estimate <FiSettings className="ml-2" /></>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
            
            {/* Loading State */}
            {loading && (
              <div className="fixed inset-0 flex items-center justify-center bg-slate-900/80 z-50">
                <div className="p-6 bg-slate-800 rounded-lg flex flex-col items-center">
                  <div className="mb-4">
                    <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <p className="text-white text-lg">Calculating your estimate...</p>
                </div>
              </div>
            )}
          </>
        ) : (
          // Results Display
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-end">
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-slate-300 mb-4"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="text-center mb-8">
              <div className="inline-block mb-6 p-4 rounded-full bg-blue-500/20">
                <FiCheckCircle className="text-blue-400" size={40} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Your Project Estimate</h3>
              <p className="text-slate-400">Based on the details you've provided</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="cosmic-card text-center">
                <p className="text-slate-400 mb-2">Estimated Cost Range</p>
                <div className="text-2xl font-bold cosmic-text">
                  {formatCurrency(costEstimate.lowEstimate)} - {formatCurrency(costEstimate.highEstimate)}
                </div>
              </div>
              
              <div className="cosmic-card text-center">
                <p className="text-slate-400 mb-2">Estimated Timeline</p>
                <div className="text-2xl font-bold text-purple-400">
                  {costEstimate.timelineWeeks} weeks
                </div>
              </div>
              
              <div className="cosmic-card text-center">
                <p className="text-slate-400 mb-2">Selected Features</p>
                <div className="text-2xl font-bold text-indigo-400">
                  {formData.features.length}
                </div>
              </div>
            </div>
            
            <div className="cosmic-card mb-8">
              <h4 className="text-xl font-bold mb-4">Cost Breakdown</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-slate-700">
                    <tr>
                      <th className="pb-3">Item</th>
                      <th className="pb-3">Low Est.</th>
                      <th className="pb-3">High Est.</th>
                      <th className="pb-3">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costEstimate.breakdown.map((item, index) => (
                      <tr key={index} className="border-b border-slate-800/50">
                        <td className="py-3">{item.name}</td>
                        <td className="py-3">{formatCurrency(item.lowCost)}</td>
                        <td className="py-3">{formatCurrency(item.highCost)}</td>
                        <td className="py-3">{item.time} weeks</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t border-slate-700">
                    <tr>
                      <td className="pt-3 font-bold">Total</td>
                      <td className="pt-3 font-bold">{formatCurrency(costEstimate.lowEstimate)}</td>
                      <td className="pt-3 font-bold">{formatCurrency(costEstimate.highEstimate)}</td>
                      <td className="pt-3 font-bold">{costEstimate.timelineWeeks} weeks</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="cosmic-card bg-slate-900/70 border-slate-800/80 mb-6">
              <div className="flex items-start">
                <FiInfo className="mr-4 mt-1 text-blue-400 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-bold mb-2">Important Note</h4>
                  <p className="text-slate-400 text-sm">
                    This is a preliminary estimate based on the information provided. The actual cost and timeline 
                    may vary based on detailed requirements, complexity, and other factors. Our team will provide
                    a comprehensive proposal after discussing your project in detail.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Start Over
              </button>
              
              <a
                href="/contact"
                className="cosmic-button flex items-center justify-center"
              >
                Discuss Your Project <FiSend className="ml-2" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectCostEstimator;