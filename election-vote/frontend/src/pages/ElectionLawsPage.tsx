import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Scale, Users, FileText, Landmark, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface Law {
  title: string;
  section: string;
  description: string;
  category: 'eci' | 'voter' | 'voting' | 'candidate';
}

const LAWS: Law[] = [
  // Election Commission Laws
  { title: 'Establishment of Election Commission', section: 'Article 324', description: 'The superintendence, direction and control of elections shall be vested in the Election Commission of India. It is an autonomous constitutional body independent of the government.', category: 'eci' },
  { title: 'Appointment & Tenure of Commissioners', section: 'Article 324(2)', description: 'The Election Commission consists of the Chief Election Commissioner (CEC) and such other Election Commissioners as the President may fix. CEC can only be removed by impeachment.', category: 'eci' },
  { title: 'Model Code of Conduct', section: 'ECI Guidelines', description: 'A set of norms for political parties and candidates during elections. Covers general conduct, meetings, processions, polling day behavior, polling booths, and the party in power. Violation may lead to FIR or disqualification.', category: 'eci' },
  { title: 'Election Symbols Order', section: 'ECI Order 1968', description: 'Governs recognition of political parties and allotment of symbols. Parties are classified as National Party (≥6% votes in 4+ states) or State Party (≥6% votes or 2 seats in state assembly).', category: 'eci' },
  { title: 'Delimitation of Constituencies', section: 'Article 82 & Delimitation Act 2002', description: 'Readjustment of allocation of seats and constituency boundaries based on the latest Census data. Delimitation Commission is a high-power body appointed by the Central Government.', category: 'eci' },

  // Voter Rights
  { title: 'Universal Adult Suffrage', section: 'Article 326', description: 'Every citizen of India who is 18 years of age or above and is not disqualified under the Constitution has the right to vote. No person can be excluded on the basis of religion, race, caste, sex, or literacy.', category: 'voter' },
  { title: 'No Discrimination in Electoral Rolls', section: 'Article 325', description: 'There shall be one general electoral roll for every constituency. No person shall be excluded from or included in any special electoral roll on grounds of religion, race, caste, or sex.', category: 'voter' },
  { title: 'Right to Information (Candidate Disclosure)', section: 'Section 33A, RPA 1951', description: 'Every candidate must disclose criminal cases, assets, liabilities, and educational qualifications in an affidavit filed with the nomination. Voters have the right to access this information.', category: 'voter' },
  { title: 'NOTA Option', section: 'Supreme Court Ruling, 2013', description: 'Voters have the right to reject all candidates by choosing NOTA (None Of The Above) on the EVM. This was introduced following the People\'s Union for Civil Liberties (PUCL) vs Union of India case.', category: 'voter' },
  { title: 'Right to Vote is Not a Fundamental Right', section: 'Article 326 (Statutory Right)', description: 'Voting is a statutory right, not a fundamental right. However, it is a constitutional right under Article 326. The distinction means election disputes are handled by Election Tribunals, not High Courts under Article 226.', category: 'voter' },

  // Voting Process Laws
  { title: 'Conduct of Elections', section: 'Representation of People Act, 1951', description: 'The main law governing the conduct of elections. Covers qualifications and disqualifications of candidates, election offences, corrupt practices, and election disputes.', category: 'voting' },
  { title: 'Registration of Electors', section: 'Representation of People Act, 1950', description: 'Governs the preparation and revision of electoral rolls. Defines who qualifies as an elector and the process of registration. Form 6 for new registration, Form 8 for corrections.', category: 'voting' },
  { title: 'Use of EVMs', section: 'Rule 49MA, Conduct of Elections Rules 1961', description: 'Legal framework for using Electronic Voting Machines. EVMs were legalized by Parliament in 1989 (Amendment to RPA 1951). The Supreme Court upheld EVM usage in several cases.', category: 'voting' },
  { title: 'VVPAT Mandate', section: 'Rule 49MA(2)', description: 'The Supreme Court in 2019 ordered VVPAT verification of 5 random EVMs per assembly constituency. VVPAT provides a paper trail for vote verification.', category: 'voting' },
  { title: 'Corrupt Practices', section: 'Section 123, RPA 1951', description: 'Defines corrupt practices: bribery, undue influence, appeal to religion/caste/language, promoting enmity between classes, false statements against candidates, booth capturing, and expenditure beyond limit.', category: 'voting' },

  // Candidate Laws
  { title: 'Disqualification of Candidates', section: 'Section 8, RPA 1951', description: 'A person convicted for any offence and sentenced to imprisonment of 2+ years is disqualified for 6 years after release. Disqualification on grounds of corrupt practices lasts 6 years.', category: 'candidate' },
  { title: 'Election Expenditure Limit', section: 'Section 77, RPA 1951', description: 'Lok Sabha candidates: ₹95 lakhs (large states), ₹75 lakhs (small states). Assembly: ₹40 lakhs (large states), ₹28 lakhs (small states). Accounts must be submitted within 30 days.', category: 'candidate' },
  { title: 'Anti-Defection Law', section: '10th Schedule, Constitution', description: 'If an elected member voluntarily gives up membership of the party or votes against party whip, they can be disqualified. Exception: if at least 2/3rds of the party merges with another.', category: 'candidate' },
];

const CATEGORIES = [
  { id: 'eci', label: 'Election Commission', icon: Landmark, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  { id: 'voter', label: 'Voter Rights', icon: Users, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  { id: 'voting', label: 'Voting Process', icon: FileText, color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' },
  { id: 'candidate', label: 'Candidate Rules', icon: Scale, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
];

const ElectionLawsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('eci');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = LAWS.filter(l => l.category === activeCategory);
  const catInfo = CATEGORIES.find(c => c.id === activeCategory)!;

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-7 h-7 text-sky-400" />
          <h1 className="text-3xl font-black text-white">Election Laws & Rules</h1>
        </div>
        <p className="text-slate-400 text-sm mb-8">Key legal provisions governing the Indian election process.</p>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {CATEGORIES.map(c => {
            const CatIcon = c.icon;
            return (
              <button key={c.id} onClick={() => { setActiveCategory(c.id); setExpanded(null); }}
                className={`flex items-center gap-2 p-4 rounded-2xl border text-sm font-semibold transition-all ${
                  activeCategory === c.id ? c.color + ' border-opacity-100' : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'}`}>
                <CatIcon className="w-5 h-5" />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Law Cards */}
        <div className="space-y-3">
          {filtered.map((law, i) => (
            <motion.div key={law.section} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all">
              <button onClick={() => setExpanded(expanded === law.section ? null : law.section)}
                className="w-full flex items-center justify-between p-5 text-left">
                <div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${catInfo.color} mr-2`}>{law.section}</span>
                  <span className="text-white font-semibold">{law.title}</span>
                </div>
                {expanded === law.section ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
              {expanded === law.section && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}
                  className="px-5 pb-5 border-t border-slate-800 pt-4">
                  <p className="text-slate-300 text-sm leading-relaxed">{law.description}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ElectionLawsPage;
