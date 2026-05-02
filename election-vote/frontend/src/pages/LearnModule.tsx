import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { CheckCircle2, Circle, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: 'Voter Registration',
    description: 'The first step is ensuring you are on the electoral roll. Check your eligibility and register with the Election Commission.',
    details: [
      'Must be a citizen of the country.',
      'Must be 18 years or older on the qualifying date.',
      'Fill Form 6 for new registration.',
      'Check name in the Electoral Roll online.'
    ],
  },
  {
    id: 2,
    title: 'Candidate Nomination',
    description: 'Candidates from various parties or independents file their nomination papers to contest the elections.',
    details: [
      'Scrutiny of nomination papers by the Returning Officer.',
      'Symbol allotment to recognized parties and independents.',
      'Withdrawal period for candidates.'
    ],
  },
  {
    id: 3,
    title: 'Election Campaigning',
    description: 'Political parties and candidates share their manifestos and reach out to voters through rallies and media.',
    details: [
      'Model Code of Conduct (MCC) comes into force.',
      'Public meetings and door-to-door campaigning.',
      'Campaigning ends 48 hours before the close of poll.'
    ],
  },
  {
    id: 4,
    title: 'Polling Day (Voting)',
    description: 'Voters head to polling stations to cast their votes using Electronic Voting Machines (EVM) or ballot papers.',
    details: [
      'Identity verification using EPIC card or other valid IDs.',
      'Indelible ink application on the finger.',
      'Casting vote in the secret voting compartment.',
      'VVPAT slip verification.'
    ],
  },
  {
    id: 5,
    title: 'Counting & Results',
    description: 'The final stage where votes are counted under strict supervision and results are declared.',
    details: [
      'EVMs transported to secure strong rooms.',
      'Counting starts under the Returning Officer.',
      'Declaration of winning candidate.',
      'Certificate of Election issued.'
    ],
  },
];

const LearnModule = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      <main className="mx-auto max-w-5xl px-4 py-12">
        <header className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-white">Election Process Journey</h2>
          <p className="mt-4 text-lg text-slate-400">Master the steps of democracy through our interactive timeline.</p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[300px_1fr]">
          {/* Timeline Sidebar */}
          <div className="space-y-8">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 h-full w-0.5 bg-slate-800"></div>
              
              <div className="space-y-12">
                {steps.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className="relative flex items-center group w-full text-left"
                  >
                    <div className={`z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 ${
                      activeStep === idx 
                        ? 'border-primary-500 bg-slate-950 text-primary-500 shadow-[0_0_15px_rgba(14,165,233,0.3)]' 
                        : activeStep > idx 
                          ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                          : 'border-slate-800 bg-slate-900 text-slate-500 group-hover:border-slate-700'
                    } transition-all duration-300`}>
                      {activeStep > idx ? <CheckCircle2 className="h-6 w-6" /> : <span className="font-bold">{step.id}</span>}
                    </div>
                    <div className="ml-6">
                      <p className={`text-sm font-bold uppercase tracking-wider ${
                        activeStep === idx ? 'text-primary-400' : 'text-slate-500'
                      }`}>Stage {step.id}</p>
                      <p className={`font-semibold ${
                        activeStep === idx ? 'text-white' : 'text-slate-400'
                      }`}>{step.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="relative rounded-3xl bg-slate-900 p-8 shadow-2xl ring-1 ring-slate-800 lg:p-12 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-600/5 blur-3xl"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <h3 className="text-3xl font-bold text-white">{steps[activeStep].title}</h3>
                <p className="mt-6 text-lg leading-relaxed text-slate-400">
                  {steps[activeStep].description}
                </p>

                <div className="mt-10 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-primary-400">Key Takeaways</h4>
                  <ul className="space-y-4">
                    {steps[activeStep].details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-slate-300">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-12 flex items-center justify-between border-t border-slate-800 pt-8">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => prev - 1)}
                    className="flex items-center space-x-2 text-sm font-bold text-slate-500 transition-colors hover:text-white disabled:opacity-0"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span>PREVIOUS</span>
                  </button>
                  <button
                    onClick={() => {
                      if (activeStep < steps.length - 1) {
                        setActiveStep(prev => prev + 1);
                      } else {
                        // Navigate to quiz or dashboard
                      }
                    }}
                    className="flex items-center space-x-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-600/20 active:scale-95"
                  >
                    <span>{activeStep === steps.length - 1 ? 'START QUIZ' : 'NEXT STAGE'}</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnModule;
