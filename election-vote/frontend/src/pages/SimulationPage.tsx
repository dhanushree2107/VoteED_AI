import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Award, Shield, ArrowRight, CheckCircle, RotateCcw, ChevronRight, Camera, CreditCard, Fingerprint, Scan, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

type SimMode = 'VOTER' | 'CANDIDATE' | 'OFFICER' | null;

/* ─── Step definitions with interactive types ─── */
interface Step {
  title: string;
  description: string;
  icon: string;
  interactionType: 'button' | 'id-input' | 'photo-scan' | 'ink' | 'form-fill' | 'confirm';
  actionLabel: string;
  result: string;
}

const SCENARIOS: Record<string, Step[]> = {
  VOTER: [
    {
      title: 'Check Voter Registration',
      description: 'Enter your Voter ID (EPIC) number to verify your name is on the electoral roll for your constituency.',
      icon: '📋', interactionType: 'id-input', actionLabel: 'Verify Registration',
      result: '✅ Found! Name: John Doe | Booth #42, Ward 3, Constituency: Chennai South. You are eligible to vote.',
    },
    {
      title: 'Present ID at Polling Station',
      description: 'Present your EPIC card to the polling officer. The officer will scan and verify your photo ID against the electoral roll.',
      icon: '🪪', interactionType: 'photo-scan', actionLabel: 'Scan ID Card',
      result: '✅ Photo ID verified. Face match: 98.2%. Your voter slip number is #087.',
    },
    {
      title: 'Indelible Ink Application',
      description: 'The polling officer will apply indelible ink on your left index finger to prevent double voting. Confirm you have received the ink mark.',
      icon: '☑️', interactionType: 'ink', actionLabel: 'Apply Ink Mark',
      result: '✅ Indelible ink applied on left index finger. This mark lasts 2–3 weeks.',
    },
    {
      title: 'Enter Voting Compartment & Cast Vote',
      description: 'Go to the secret voting compartment. Choose your candidate carefully on the EVM and press the button.',
      icon: '🗳️', interactionType: 'confirm', actionLabel: 'Cast My Vote',
      result: '✅ Vote recorded! The EVM beeped. VVPAT showed your candidate symbol for 7 seconds.',
    },
    {
      title: 'Exit & Receive Certificate',
      description: 'Exit the polling station. Your vote has been counted. You may receive a voter acknowledgement slip.',
      icon: '🎊', interactionType: 'button', actionLabel: 'Exit Polling Station',
      result: '🎉 You have successfully exercised your democratic right! Thank you for voting.',
    },
  ],
  CANDIDATE: [
    {
      title: 'Eligibility Check',
      description: 'Enter your details to verify you meet all criteria: age 25+, Indian citizen, not disqualified under RP Act.',
      icon: '✅', interactionType: 'id-input', actionLabel: 'Verify Eligibility',
      result: '✅ Eligible! Age: 32 | Citizen: Yes | No disqualifications found.',
    },
    {
      title: 'File Nomination Form',
      description: 'Fill in and submit nomination Form 2A with your full details, constituency, and party affiliation.',
      icon: '📝', interactionType: 'form-fill', actionLabel: 'Submit Nomination',
      result: '✅ Nomination filed. Receipt No: NOM-2024-7823. Scrutiny date set.',
    },
    {
      title: 'Pay Security Deposit',
      description: 'Pay the security deposit of ₹25,000 (₹12,500 for SC/ST). Scan your payment receipt.',
      icon: '💰', interactionType: 'photo-scan', actionLabel: 'Scan Payment Receipt',
      result: '✅ Payment verified. Deposit: ₹25,000. Transaction ID: TXN20241203.',
    },
    {
      title: 'Nomination Scrutiny',
      description: 'Attend scrutiny at the Returning Officer office. Your documents are reviewed.',
      icon: '🔍', interactionType: 'confirm', actionLabel: 'Confirm Attendance',
      result: '✅ Nomination valid. Symbol allotted: ⚡. Campaign can begin.',
    },
    {
      title: 'Await Election Results',
      description: 'Attend the counting centre with your counting agent to observe vote counting.',
      icon: '🏆', interactionType: 'button', actionLabel: 'View Results',
      result: '🎉 You won with 45,230 votes (38.5%)! Certificate of Election issued.',
    },
  ],
  OFFICER: [
    {
      title: 'Attend Training & Certification',
      description: 'Complete mandatory Presiding Officer training. Scan your training certificate to proceed.',
      icon: '📚', interactionType: 'photo-scan', actionLabel: 'Scan Certificate',
      result: '✅ Certificate verified. You are certified to conduct polling.',
    },
    {
      title: 'Collect EVM & Materials',
      description: 'Enter the EVM serial number provided at the Dispatch Center to receive your materials.',
      icon: '📦', interactionType: 'id-input', actionLabel: 'Register EVM',
      result: '✅ EVM EV-MH-2024-7291 registered to your booth. All materials collected.',
    },
    {
      title: 'Setup & Mock Poll',
      description: 'Set up the polling station and conduct a mandatory mock poll with all agents present.',
      icon: '🏛️', interactionType: 'form-fill', actionLabel: 'Complete Setup',
      result: '✅ Mock poll conducted. 5 test votes cast and cleared. Station ready.',
    },
    {
      title: 'Conduct Polling',
      description: 'Open polls at 7 AM. Verify each voter identity and manage the queue.',
      icon: '🗳️', interactionType: 'confirm', actionLabel: 'Open Polls',
      result: '✅ 847 voters processed by 6 PM. 71.3% turnout. No incidents reported.',
    },
    {
      title: 'Seal EVM & Submit',
      description: 'Seal the EVM with 6 seals signed by all agents. Transport to Strong Room under escort.',
      icon: '🔒', interactionType: 'confirm', actionLabel: 'Seal & Submit',
      result: '🎉 EVM sealed and submitted. Your duty as Presiding Officer is complete!',
    },
  ],
};

/* ─── Interaction Components ─── */

const IdInputInteraction: React.FC<{ onVerified: () => void; placeholder: string }> = ({ onVerified, placeholder }) => {
  const [value, setValue] = useState('');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');

  const verify = async () => {
    if (value.trim().length < 4) { setError('Please enter a valid ID (minimum 4 characters)'); return; }
    setError(''); setChecking(true);
    await new Promise(r => setTimeout(r, 2000));
    setChecking(false);
    toast.success('Verification successful!');
    onVerified();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-slate-400 mb-2">Enter your ID / Number</label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={value}
              onChange={e => { setValue(e.target.value); setError(''); }}
              placeholder={placeholder}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-all"
            />
          </div>
        </div>
        {error && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
      </div>
      <button
        onClick={verify}
        disabled={checking}
        className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
      >
        {checking ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</> : <><Fingerprint className="w-4 h-4" /> Verify</>}
      </button>
      {checking && (
        <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-3 text-sky-300 text-sm text-center animate-pulse">
          🔍 Checking database… please wait
        </div>
      )}
    </div>
  );
};

const PhotoScanInteraction: React.FC<{ onVerified: () => void }> = ({ onVerified }) => {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'done'>('idle');
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const startScan = async () => {
    if (!fileName && phase === 'idle') { toast.error('Please select a file or click Scan to simulate.'); }
    setPhase('scanning');
    await new Promise(r => setTimeout(r, 2500));
    setPhase('done');
    toast.success('Scan complete!');
    await new Promise(r => setTimeout(r, 600));
    onVerified();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-slate-700 hover:border-sky-500 rounded-2xl p-8 text-center cursor-pointer transition-all"
      >
        <Camera className="w-10 h-10 text-slate-500 mx-auto mb-3" />
        <p className="text-slate-400 text-sm">{fileName || 'Click to upload document / photo'}</p>
        <p className="text-slate-600 text-xs mt-1">JPG, PNG or PDF • or click Scan to simulate</p>
        <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden"
          onChange={e => setFileName(e.target.files?.[0]?.name || '')} />
      </div>

      {phase === 'scanning' && (
        <div className="relative bg-slate-800 rounded-2xl overflow-hidden h-16 flex items-center justify-center">
          <motion.div
            className="absolute top-0 left-0 h-full w-1 bg-sky-400"
            animate={{ left: ['0%', '100%', '0%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <div className="flex items-center gap-2 text-sky-300 text-sm">
            <Scan className="w-4 h-4 animate-pulse" /> Scanning document…
          </div>
        </div>
      )}

      {phase !== 'done' && (
        <button
          onClick={startScan}
          disabled={phase === 'scanning'}
          className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
        >
          {phase === 'scanning' ? <><Loader2 className="w-4 h-4 animate-spin" />Scanning…</> : <><Scan className="w-4 h-4" />Scan Document</>}
        </button>
      )}
    </div>
  );
};

const InkInteraction: React.FC<{ onVerified: () => void }> = ({ onVerified }) => {
  const [pressed, setPressed] = useState(false);
  const [inked, setInked] = useState(false);

  const applyInk = async () => {
    setPressed(true);
    await new Promise(r => setTimeout(r, 1500));
    setInked(true);
    toast.success('Ink applied!');
    await new Promise(r => setTimeout(r, 800));
    onVerified();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 text-center">
      <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-3 mb-2">
        <p className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">Action Required</p>
        <p className="text-slate-300 text-sm">Long-press the finger icon below to apply ink</p>
      </div>
      <motion.button
        onTapStart={applyInk}
        disabled={pressed}
        className="mx-auto block"
        whileTap={{ scale: 0.9 }}
      >
        <div className={`w-32 h-40 rounded-2xl border-4 flex flex-col items-center justify-center gap-2 transition-all duration-700 cursor-pointer ${inked ? 'border-indigo-500 bg-indigo-900/40' : 'border-slate-600 bg-slate-800 hover:border-sky-500'}`}>
          <span className="text-5xl">{inked ? '👆🏽' : '☝️'}</span>
          {inked && <span className="text-xs text-indigo-300 font-semibold">Ink Applied!</span>}
          {pressed && !inked && <Loader2 className="w-4 h-4 animate-spin text-sky-400" />}
        </div>
      </motion.button>
      {!pressed && (
        <p className="text-slate-500 text-xs">Tap the finger above to simulate ink application</p>
      )}
    </div>
  );
};

const FormFillInteraction: React.FC<{ onVerified: () => void }> = ({ onVerified }) => {
  const [name, setName] = useState('');
  const [constituency, setConstituency] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = async () => {
    if (!name.trim() || !constituency.trim()) { toast.error('Please fill all fields'); return; }
    setSubmitted(true);
    await new Promise(r => setTimeout(r, 1500));
    toast.success('Form submitted!');
    onVerified();
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-slate-400 mb-1 block">Full Name</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name"
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-all" />
      </div>
      <div>
        <label className="text-xs text-slate-400 mb-1 block">Constituency / Location</label>
        <input value={constituency} onChange={e => setConstituency(e.target.value)} placeholder="e.g. Chennai South"
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-all" />
      </div>
      <button onClick={submit} disabled={submitted}
        className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-60">
        {submitted ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting…</> : <><ArrowRight className="w-4 h-4" />Submit Form</>}
      </button>
    </div>
  );
};

const ConfirmInteraction: React.FC<{ label: string; onVerified: () => void }> = ({ label, onVerified }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirm = async () => {
    if (!confirmed) { toast.error('Please check the confirmation box first'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Confirmed!');
    onVerified();
  };

  return (
    <div className="space-y-4">
      <label className="flex items-start gap-3 cursor-pointer bg-slate-800 border border-slate-700 rounded-xl p-4">
        <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-sky-500" />
        <span className="text-slate-300 text-sm">I confirm that I understand this step and am ready to proceed with: <strong className="text-white">{label}</strong></span>
      </label>
      <button onClick={confirm} disabled={loading}
        className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-60">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Processing…</> : <><CheckCircle className="w-4 h-4" />{label}</>}
      </button>
    </div>
  );
};

const SimpleButton: React.FC<{ label: string; onVerified: () => void }> = ({ label, onVerified }) => {
  const [loading, setLoading] = useState(false);
  const click = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success('Done!');
    onVerified();
  };
  return (
    <button onClick={click} disabled={loading}
      className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-60">
      {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Please wait…</> : <><ArrowRight className="w-4 h-4" />{label}</>}
    </button>
  );
};

/* ─── ID input placeholders per mode/step ─── */
const ID_PLACEHOLDERS: Record<string, string[]> = {
  VOTER: ['e.g. ABC1234567', '', '', '', ''],
  CANDIDATE: ['e.g. National ID: IND-1990-XXXX', '', '', '', ''],
  OFFICER: ['', 'e.g. EV-MH-2024-XXXX', '', '', ''],
};

/* ─── Mode config ─── */
const MODES = [
  { id: 'VOTER', label: 'Voter', subtitle: 'Experience the voting process', icon: Users, color: 'from-emerald-600 to-teal-600', border: 'border-emerald-500' },
  { id: 'CANDIDATE', label: 'Candidate', subtitle: 'Contest in elections', icon: Award, color: 'from-purple-600 to-indigo-600', border: 'border-purple-500' },
  { id: 'OFFICER', label: 'Election Officer', subtitle: 'Conduct the election', icon: Shield, color: 'from-orange-600 to-red-600', border: 'border-orange-500' },
];

/* ─── Main Component ─── */
const SimulationPage: React.FC = () => {
  const [mode, setMode] = useState<SimMode>(null);
  const [step, setStep] = useState(0);
  const [verifiedStep, setVerifiedStep] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [done, setDone] = useState(false);

  const steps = mode ? SCENARIOS[mode] : [];
  const current = steps[step];
  const modeInfo = MODES.find(m => m.id === mode);

  const handleVerified = () => { 
    setVerifiedStep(true); 
    setShowResult(true); 
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
      setVerifiedStep(false);
      setShowResult(false);
    } else {
      setDone(true);
    }
  };

  const handleRestart = () => { setMode(null); setStep(0); setVerifiedStep(false); setShowResult(false); setDone(false); };

  /* Mode selection */
  if (!mode) return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white">Election Simulation</h2>
          <p className="text-slate-400 mt-3">Choose your role. Each step requires real interaction — photo scan, ID verification, and more.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {MODES.map(m => (
            <motion.button key={m.id} whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}
              onClick={() => setMode(m.id as SimMode)}
              className={`flex flex-col items-center text-center p-8 bg-slate-900 border ${m.border}/30 hover:border-opacity-100 rounded-3xl transition-all shadow-xl group`}>
              <div className={`w-16 h-16 bg-gradient-to-br ${m.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}>
                <m.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{m.label}</h3>
              <p className="text-slate-400 text-sm mb-6">{m.subtitle}</p>
              <span className="flex items-center gap-1 text-sky-400 text-sm font-semibold">Start <ChevronRight className="w-4 h-4" /></span>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );

  /* Done screen */
  if (done) return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-yellow-900/30">
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-4xl font-black text-white mb-4">Simulation Complete!</h2>
        <p className="text-slate-400 text-lg mb-2">You completed the <span className="text-sky-400 font-semibold">{mode}</span> simulation successfully.</p>
        <p className="text-slate-500 mb-10">Every step required real interaction — just like the actual election process.</p>
        <button onClick={handleRestart}
          className="btn-shine bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold py-4 px-10 rounded-2xl flex items-center gap-2 mx-auto hover:opacity-90 active:scale-95 transition-all">
          <RotateCcw className="w-5 h-5" /> Try Another Role
        </button>
      </main>
    </div>
  );

  const info = modeInfo!;
  const ModeIcon = info.icon;

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`bg-gradient-to-br ${info.color} rounded-xl p-2`}>
              <ModeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold">{info.label} Simulation</h2>
              <p className="text-slate-400 text-xs">Step {step + 1} of {steps.length}</p>
            </div>
          </div>
          <button onClick={handleRestart} className="text-slate-500 hover:text-white text-sm flex items-center gap-1 transition-colors">
            <RotateCcw className="w-4 h-4" /> Restart
          </button>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i < step ? 'bg-emerald-500' : i === step ? 'bg-sky-500' : 'bg-slate-800'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl sim-step-active space-y-6">
            <div className="text-5xl">{current.icon}</div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{current.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{current.description}</p>
            </div>

            {/* ── Interactive area ── */}
            {!verifiedStep && (
              <div className="border-t border-slate-800 pt-6">
                {current.interactionType === 'id-input' && (
                  <IdInputInteraction onVerified={handleVerified}
                    placeholder={(ID_PLACEHOLDERS[mode!] ?? [])[step] || 'Enter ID number'} />
                )}
                {current.interactionType === 'photo-scan' && <PhotoScanInteraction onVerified={handleVerified} />}
                {current.interactionType === 'ink' && <InkInteraction onVerified={handleVerified} />}
                {current.interactionType === 'form-fill' && <FormFillInteraction onVerified={handleVerified} />}
                {current.interactionType === 'confirm' && <ConfirmInteraction label={current.actionLabel} onVerified={handleVerified} />}
                {current.interactionType === 'button' && <SimpleButton label={current.actionLabel} onVerified={handleVerified} />}
              </div>
            )}

            {/* ── Result after verification ── */}
            {showResult && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4">
                  <p className="text-emerald-300 text-sm leading-relaxed">{current.result}</p>
                </div>
                <button onClick={handleNext}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 border border-slate-700">
                  {step < steps.length - 1 ? 'Continue to Next Step' : 'Finish Simulation'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default SimulationPage;
