import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';

interface Promise {
  text: string;
  status: 'fulfilled' | 'partial' | 'unfulfilled';
}

interface PartyTerm {
  party: string;
  abbr: string;
  color: string;
  period: string;
  cm: string;
  achievements: string[];
  failures: string[];
  promises: Promise[];
}

const PARTY_DATA: PartyTerm[] = [
  {
    party: 'All India Anna Dravida Munnetra Kazhagam',
    abbr: 'AIADMK',
    color: 'bg-green-500',
    period: '2011 – 2016',
    cm: 'J. Jayalalithaa',
    achievements: [
      'Amma Unavagam (subsidised canteens) — meals at ₹1/₹5 serving lakhs daily',
      'Free laptops for students — distributed to 38+ lakh students',
      'Free mixer-grinders, fans, and gold for marriages (Thali scheme)',
      'Tamil Nadu topped in road infrastructure and industrial growth',
      'Successfully managed Cyclone Thane relief operations (2011)',
      'Green House scheme — 6 lakh houses constructed for the poor',
    ],
    failures: [
      'Power crisis and load shedding in first 2 years (2012–2013)',
      'Sand mining scam — illegal mining rampant in several districts',
      'Lack of transparency in government contracts',
      'Gudiyatham methane blast (2014) — poor industrial safety oversight',
      'Amma\'s hospitalisation kept secret from public for months',
    ],
    promises: [
      { text: '100 units free electricity', status: 'fulfilled' },
      { text: 'Free laptop for all 10th/12th students', status: 'fulfilled' },
      { text: '₹1 idli canteens (Amma Unavagam)', status: 'fulfilled' },
      { text: 'Establish Cauvery river water management board', status: 'unfulfilled' },
      { text: '10 lakh jobs for youth', status: 'partial' },
      { text: 'Gold for Thali (4 grams)', status: 'fulfilled' },
      { text: 'Metro rail completion in Chennai', status: 'partial' },
      { text: 'Free bus pass for students', status: 'fulfilled' },
    ],
  },
  {
    party: 'Dravida Munnetra Kazhagam',
    abbr: 'DMK',
    color: 'bg-red-500',
    period: '2006 – 2011',
    cm: 'M. Karunanidhi',
    achievements: [
      'Kalaignar Insurance Scheme — free health insurance for BPL families',
      'Free colour TV scheme — distributed to over 80 lakh families',
      'Tamil Nadu was #1 in attracting FDI during this period',
      'Established Anna University satellite campuses across the state',
      'Slum Clearance Board built tenements for urban poor',
      'Samathuvapuram (equality villages) expansion programme',
    ],
    failures: [
      '2G Spectrum Scam — DMK ally A. Raja was central accused',
      'Severe power shortage — 12-hour power cuts in 2008–2011',
      'Rising prices and inflation hit common people hard',
      'Land grab allegations in Tiruvallur and Kancheepuram districts',
      'Poor handling of Sri Lankan Tamil refugee crisis',
    ],
    promises: [
      { text: 'Free colour TV to all BPL families', status: 'fulfilled' },
      { text: '₹1 per kg rice (later increased to ₹2)', status: 'fulfilled' },
      { text: 'Resolve Cauvery water dispute', status: 'unfulfilled' },
      { text: 'Free health insurance (Kalaignar scheme)', status: 'fulfilled' },
      { text: '1 lakh government jobs', status: 'partial' },
      { text: 'Metro water supply to all Chennai zones', status: 'partial' },
      { text: 'New industrial corridor', status: 'partial' },
    ],
  },
  {
    party: 'Dravida Munnetra Kazhagam',
    abbr: 'DMK',
    color: 'bg-red-500',
    period: '2021 – Present',
    cm: 'M. K. Stalin',
    achievements: [
      'Breakfast scheme for government school students — served to 18+ lakh children',
      'Naan Mudhalvan skill development platform for youth',
      'Reduced petrol price by ₹3/litre on taking office',
      'Established 10 new medical colleges',
      'Tamil Nadu crossed $1 trillion GSDP mark (2nd state after Maharashtra)',
      'Hosting Global Investors Meet attracting ₹6.64 lakh crore investments',
      'Free bus travel for women in government buses',
    ],
    failures: [
      'Illegal drug trafficking — Kodanad, Coimbatore drug busts raised concerns',
      'Hooch tragedy in Villupuram and Chengalpattu districts',
      'Delay in fulfilling ₹1000/month for women family heads promise',
      'NEET controversy — despite opposition, unable to get exemption',
      'Rising unemployment among educated youth',
    ],
    promises: [
      { text: '₹1000/month for women family heads (Kalaignar Magalir Urimai)', status: 'fulfilled' },
      { text: 'Breakfast scheme for school children', status: 'fulfilled' },
      { text: 'Reduce petrol price', status: 'fulfilled' },
      { text: 'Exempt Tamil Nadu from NEET', status: 'unfulfilled' },
      { text: '50% reservation for women in local bodies', status: 'fulfilled' },
      { text: '10 lakh new jobs', status: 'partial' },
      { text: 'Free bus travel for women', status: 'fulfilled' },
      { text: 'Establish social justice in all government schemes', status: 'partial' },
    ],
  },
  {
    party: 'All India Anna Dravida Munnetra Kazhagam',
    abbr: 'AIADMK',
    color: 'bg-green-500',
    period: '2016 – 2021',
    cm: 'Edappadi K. Palaniswami',
    achievements: [
      'COVID-19 management — TN was among top states in testing and treatment',
      'Chennai Metro Rail Phase 1 completion',
      '8-way Salem–Chennai expressway project initiated',
      'Tamil Nadu maintained #2 position in industrial output',
      'Free Pongal gift hamper scheme for ration card holders',
      'Established AIIMS in Madurai',
    ],
    failures: [
      'Leadership crisis after Jayalalithaa\'s death — power struggle with OPS',
      'Sterlite Copper plant protest — Tuticorin police firing killed 13 civilians',
      'Pollachi sexual assault case — poor initial response',
      'Gaja Cyclone (2018) — delayed relief in delta districts',
      'Loss of public trust — seen as proxy government',
    ],
    promises: [
      { text: 'Free Amma two-wheelers for working women', status: 'partial' },
      { text: 'Complete Chennai Metro Phase 1', status: 'fulfilled' },
      { text: 'Establish AIIMS in Tamil Nadu', status: 'fulfilled' },
      { text: '₹1500/month for housewives', status: 'unfulfilled' },
      { text: 'Reduce youth unemployment to 5%', status: 'unfulfilled' },
      { text: 'Free smartphones for ration card holders', status: 'partial' },
    ],
  },
  // ─── Alliance & Key Opposition Parties ───
  {
    party: 'Indian National Congress (Tamil Nadu)',
    abbr: 'INC',
    color: 'bg-sky-500',
    period: 'Alliance Partner — Multiple Terms',
    cm: 'Allied with DMK (2006–11, 2021–present)',
    achievements: [
      'MGNREGA implementation in Tamil Nadu — provided 100 days of employment to rural poor',
      'Right to Information (RTI) Act enabled citizens to demand transparency',
      'National Rural Health Mission (NRHM) improved healthcare in rural TN',
      'Mid-day meal scheme expansion (originally started by K. Kamaraj in 1960s)',
      'K. Kamaraj\'s legacy — free education, school infrastructure revolution in 1950s–60s',
      'Strong contribution to TN\'s industrial base through Bharat Heavy Electricals (BHEL) Trichy',
    ],
    failures: [
      'Lost its own voter base in TN — reduced to alliance-dependent party',
      'Unable to win any Lok Sabha seat independently since 1996',
      'Anti-incumbency at centre (UPA-2 corruption) affected TN alliance in 2014',
      'Sri Lankan Tamil issue — perceived inaction by Congress-led central govt',
      'Internal party factionalism — no strong state-level leadership post Kamaraj era',
    ],
    promises: [
      { text: 'Implement MGNREGA (100 days work)', status: 'fulfilled' },
      { text: 'RTI Act for transparency', status: 'fulfilled' },
      { text: 'Justice for Sri Lankan Tamils', status: 'unfulfilled' },
      { text: 'Repeal AFSPA in conflict areas', status: 'unfulfilled' },
      { text: 'Universal healthcare through NRHM', status: 'partial' },
    ],
  },
  {
    party: 'Pattali Makkal Katchi',
    abbr: 'PMK',
    color: 'bg-yellow-500',
    period: 'Alliance / Key Influence Party',
    cm: 'Founded by Dr. S. Ramadoss (1989)',
    achievements: [
      'Championed Vanniyar reservation — secured 10.5% internal reservation for MBCs',
      'Anti-liquor movement — major TASMAC protests raised health awareness',
      'Advocated for Cauvery water rights for Tamil Nadu farmers',
      'Pushed for OBC reservation in central educational institutions',
      'Strong voice for agricultural labourers and rural communities',
      'Contributed to banning gutka and pan masala in Tamil Nadu',
    ],
    failures: [
      'Frequent alliance switching — allied with DMK, AIADMK, NDA at various times',
      'Caste-based politics — criticized for representing only one community',
      'Dr. Anbumani Ramadoss\'s controversial statements on social media',
      'Unable to win significant seats independently',
      'Perceived as bargaining-only party — demands ministerial positions in every alliance',
    ],
    promises: [
      { text: '20% reservation for Vanniyars', status: 'partial' },
      { text: 'Total prohibition in Tamil Nadu', status: 'unfulfilled' },
      { text: 'Separate Cauvery water authority', status: 'partial' },
      { text: 'Free education for MBC students', status: 'partial' },
      { text: 'Ban TASMAC shops near schools/temples', status: 'unfulfilled' },
    ],
  },
  {
    party: 'Desiya Murpokku Dravida Kazhagam',
    abbr: 'DMDK',
    color: 'bg-orange-500',
    period: 'Opposition / Alliance Party',
    cm: 'Founded by Vijayakanth (2005)',
    achievements: [
      'Principal opposition party in 2011 — won 29 seats (highest debut for a new party)',
      'Raised awareness about corruption in government through public rallies',
      'Strong connect with rural and semi-urban voters in western TN',
      'Vijayakanth\'s popularity brought non-political voters into democratic process',
      'Advocated for farmer welfare and water conservation',
    ],
    failures: [
      'Party declined after 2011 — poor performance in 2016 and 2021 elections',
      'Internal splits — senior leaders left for DMK and AIADMK',
      'Vijayakanth\'s health issues severely impacted party leadership',
      'Failed to build cadre-based organisation beyond leader\'s personality',
      'No clear ideology — shifted between Dravidian and national party alliances',
    ],
    promises: [
      { text: 'Clean governance if voted to power', status: 'unfulfilled' },
      { text: 'Free healthcare for all', status: 'unfulfilled' },
      { text: 'End corruption in public works', status: 'unfulfilled' },
      { text: 'Provide 10 lakh jobs', status: 'unfulfilled' },
    ],
  },
  {
    party: 'Viduthalai Chiruthaigal Katchi',
    abbr: 'VCK',
    color: 'bg-blue-600',
    period: 'Alliance with DMK (2019–present)',
    cm: 'Founded by Thol. Thirumavalavan (1999)',
    achievements: [
      'Strongest voice for Dalit rights and social justice in Tamil Nadu',
      'Won Chidambaram Lok Sabha seat in 2019 and 2024 — Thirumavalavan elected to Parliament',
      'Advocated for implementation of SC/ST Prevention of Atrocities Act',
      'Raised caste discrimination issues on national platforms',
      'Active in anti-untouchability campaigns across rural Tamil Nadu',
      'Pushed for land rights for Dalits in Arunthathiyar communities',
    ],
    failures: [
      'Limited electoral reach — wins only where DMK alliance provides support',
      'Controversial speeches by leaders have drawn legal cases',
      'Unable to expand beyond Dalit vote bank to broader social coalition',
      'Party organisational structure remains weak outside northern TN',
    ],
    promises: [
      { text: 'Separate reservation for Arunthathiyars', status: 'partial' },
      { text: 'End manual scavenging in Tamil Nadu', status: 'partial' },
      { text: 'Land distribution to landless Dalits', status: 'unfulfilled' },
      { text: 'Strict enforcement of SC/ST Atrocities Act', status: 'partial' },
      { text: 'Reservation in private sector', status: 'unfulfilled' },
    ],
  },
  {
    party: 'Marumalarchi Dravida Munnetra Kazhagam',
    abbr: 'MDMK',
    color: 'bg-pink-500',
    period: 'Alliance / Opposition',
    cm: 'Founded by Vaiko (1994, split from DMK)',
    achievements: [
      'Strongest advocate for Sri Lankan Tamil cause in Indian Parliament',
      'Vaiko\'s oratory raised Tamil identity issues on national stage',
      'Fought against Hindi imposition in Tamil Nadu',
      'Active participation in Jallikattu protests — supported Tamil culture preservation',
      'Allied with DMK in 2021 — contributed to coalition victory',
    ],
    failures: [
      'Vaiko jailed under POTA (2002) — controversial arrest raised civil liberty questions',
      'Party has no independent electoral strength — depends entirely on alliance seats',
      'Multiple alliance shifts — NDA (1999), UPA, then back to DMK',
      'No second-rung leadership — party revolves around single leader',
      'No significant policy contribution when part of ruling alliance',
    ],
    promises: [
      { text: 'International tribunal for Sri Lankan Tamil genocide', status: 'unfulfilled' },
      { text: 'Protect Tamil language and culture', status: 'partial' },
      { text: 'Oppose Hindi imposition', status: 'fulfilled' },
      { text: 'Get Katchatheevu island back', status: 'unfulfilled' },
    ],
  },
  {
    party: 'Bharatiya Janata Party (Tamil Nadu)',
    abbr: 'BJP',
    color: 'bg-orange-600',
    period: 'NDA Alliance in TN',
    cm: 'State President: K. Annamalai (current)',
    achievements: [
      'Central schemes like Ayushman Bharat provided health insurance to lakhs in TN',
      'PM Awas Yojana — housing for economically weaker sections',
      'AIIMS Madurai sanctioned under NDA government',
      'Chennai–Bengaluru Expressway project approved by central govt',
      'Defence Corridor in Tamil Nadu — ₹3,100 crore investment announced',
      'K. Annamalai brought aggressive campaigning style, increased BJP visibility',
    ],
    failures: [
      'Historically weak in Tamil Nadu — never won more than 5 assembly seats',
      'Hindi imposition perception alienates Tamil voters',
      'NEET implementation hurt Tamil Nadu students — massive protests',
      'GST impact on Tamil Nadu\'s textile sector (Tirupur, Coimbatore)',
      'Sterlite plant reopening advocacy — opposed by local communities',
      'Perceived as anti-Dravidian ideology party',
    ],
    promises: [
      { text: 'AIIMS for Tamil Nadu', status: 'fulfilled' },
      { text: 'Defence corridor with 50,000 jobs', status: 'partial' },
      { text: 'Chennai–Bengaluru expressway', status: 'partial' },
      { text: 'Double farmer income by 2022', status: 'unfulfilled' },
      { text: 'Smart cities in TN (Coimbatore, Madurai, Chennai)', status: 'partial' },
      { text: 'Remove NEET for TN students', status: 'unfulfilled' },
    ],
  },
  {
    party: 'Naam Tamilar Katchi',
    abbr: 'NTK',
    color: 'bg-red-600',
    period: 'Independent / No Alliance',
    cm: 'Founded by Seeman (2010)',
    achievements: [
      'Consistent stand on Tamil nationalism and Eelam Tamil cause',
      'Never joined any alliance — maintained ideological independence',
      'Won 6.5% vote share in 2021 — significant for a non-alliance party',
      'Strong youth and student following across Tamil Nadu',
      'Raised awareness about fisher folk rights and sea border issues',
      'Gender parity policy — 50% women candidates in every election',
    ],
    failures: [
      'Zero seats won in any election despite growing vote share',
      'Vote-splitting accusations — alleged to have hurt DMK/AIADMK in close seats',
      'Seeman\'s controversial statements have drawn criticism and legal cases',
      'No governance experience — untested in actual administration',
      'Party accused of rhetoric without actionable policy framework',
    ],
    promises: [
      { text: '50% women candidates in all elections', status: 'fulfilled' },
      { text: 'Total alcohol prohibition', status: 'unfulfilled' },
      { text: 'Retrieve Katchatheevu from Sri Lanka', status: 'unfulfilled' },
      { text: 'Tamil as official language in all courts', status: 'unfulfilled' },
      { text: 'End caste discrimination completely', status: 'unfulfilled' },
    ],
  },
  {
    party: 'Tamilaga Vettri Kazhagam',
    abbr: 'TVK',
    color: 'bg-teal-500',
    period: 'Newly Formed (2024)',
    cm: 'Founded by Actor Vijay',
    achievements: [
      'Massive public rally in Villupuram (2024) — drew lakhs of supporters',
      'Generated unprecedented political enthusiasm among youth voters',
      'Social media presence — most followed new political party in TN',
      'Party manifesto focuses on education, employment, and anti-corruption',
      'Inclusive messaging — appeals across caste and religion lines',
    ],
    failures: [
      'Yet to contest any election — untested at the ballot',
      'No governance experience — party cadre is still being built',
      'Skepticism about actor-to-politician transition (history of failures in TN)',
      'Vijay\'s political stance unclear — no definitive ideology declared',
      'Risk of personality cult — party entirely dependent on one leader\'s image',
    ],
    promises: [
      { text: 'Clean and corruption-free governance', status: 'unfulfilled' },
      { text: 'Quality education reform', status: 'unfulfilled' },
      { text: '1 crore jobs for youth', status: 'unfulfilled' },
      { text: 'Social justice for all communities', status: 'unfulfilled' },
      { text: 'Transparent tender system for govt contracts', status: 'unfulfilled' },
    ],
  },
];

const STATUS_CONFIG = {
  fulfilled: { icon: CheckCircle, label: 'Fulfilled', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  partial: { icon: Clock, label: 'Partially Done', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  unfulfilled: { icon: XCircle, label: 'Not Fulfilled', color: 'text-red-400', bg: 'bg-red-500/10' },
};

const PartyAnalysisPage: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-black text-white mb-2">Tamil Nadu — Party Performance Tracker</h1>
        <p className="text-slate-400 text-sm mb-8">Achievements, failures, and election promise fulfilment by ruling parties.</p>

        <div className="space-y-4">
          {PARTY_DATA.map((party, idx) => {
            const isOpen = expanded === idx;
            const fulfilled = party.promises.filter(p => p.status === 'fulfilled').length;
            const partial = party.promises.filter(p => p.status === 'partial').length;
            const unfulfilled = party.promises.filter(p => p.status === 'unfulfilled').length;
            const pct = Math.round((fulfilled / party.promises.length) * 100);

            return (
              <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                {/* Header */}
                <button onClick={() => setExpanded(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-12 rounded-full ${party.color}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black px-2 py-0.5 rounded-md ${party.color}/20 text-white`}>{party.abbr}</span>
                        <span className="text-slate-500 text-xs">{party.period}</span>
                      </div>
                      <p className="text-white font-bold mt-1">{party.party}</p>
                      <p className="text-slate-400 text-xs">Chief Minister: {party.cm}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-white font-bold text-lg">{pct}%</p>
                      <p className="text-slate-500 text-xs">Promises Kept</p>
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                  </div>
                </button>

                {/* Expanded Content */}
                {isOpen && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="border-t border-slate-800">
                    {/* Promise progress bar */}
                    <div className="px-6 pt-6 pb-4">
                      <p className="text-sm font-semibold text-white mb-3">Promise Tracker</p>
                      <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-slate-800 mb-3">
                        <div className="bg-emerald-500 rounded-l-full" style={{ width: `${(fulfilled / party.promises.length) * 100}%` }} />
                        <div className="bg-amber-500" style={{ width: `${(partial / party.promises.length) * 100}%` }} />
                        <div className="bg-red-500 rounded-r-full" style={{ width: `${(unfulfilled / party.promises.length) * 100}%` }} />
                      </div>
                      <div className="flex gap-6 text-xs">
                        <span className="text-emerald-400">✓ {fulfilled} Fulfilled</span>
                        <span className="text-amber-400">◐ {partial} Partial</span>
                        <span className="text-red-400">✗ {unfulfilled} Unfulfilled</span>
                      </div>
                    </div>

                    {/* Promises list */}
                    <div className="px-6 pb-4 space-y-2">
                      {party.promises.map((p, pi) => {
                        const cfg = STATUS_CONFIG[p.status];
                        const StatusIcon = cfg.icon;
                        return (
                          <div key={pi} className={`flex items-center gap-3 ${cfg.bg} rounded-xl px-4 py-2.5`}>
                            <StatusIcon className={`w-4 h-4 flex-shrink-0 ${cfg.color}`} />
                            <span className="text-slate-200 text-sm flex-1">{p.text}</span>
                            <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Achievements & Failures */}
                    <div className="grid md:grid-cols-2 gap-4 px-6 pb-6">
                      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <ThumbsUp className="w-4 h-4 text-emerald-400" />
                          <h4 className="text-emerald-400 text-sm font-bold">Achievements</h4>
                        </div>
                        <ul className="space-y-2">
                          {party.achievements.map((a, ai) => (
                            <li key={ai} className="flex items-start gap-2 text-slate-300 text-xs leading-relaxed">
                              <span className="text-emerald-500 mt-1">•</span>{a}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <ThumbsDown className="w-4 h-4 text-red-400" />
                          <h4 className="text-red-400 text-sm font-bold">Failures / Controversies</h4>
                        </div>
                        <ul className="space-y-2">
                          {party.failures.map((f, fi) => (
                            <li key={fi} className="flex items-start gap-2 text-slate-300 text-xs leading-relaxed">
                              <span className="text-red-500 mt-1">•</span>{f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-300 text-sm font-semibold">Disclaimer</p>
            <p className="text-slate-400 text-xs mt-1">This analysis is for educational purposes only. Data is compiled from publicly available government reports, news sources, and election manifestos. Political performance assessment is inherently subjective.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartyAnalysisPage;
