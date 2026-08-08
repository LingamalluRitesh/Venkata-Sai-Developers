import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound, AlertCircle, Sparkles, CheckCircle2, Loader2, Mail, ExternalLink, Lock } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setActiveTab, settings, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('venkatasaidevelopersinfo@gmail.com');
  const [isSendingRecovery, setIsSendingRecovery] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);
  const [showRevealedPassword, setShowRevealedPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginAdmin(email, password);
    if (!success) {
      setErrorMsg('Invalid email address or password. Click "Forgot password?" for recovery options.');
    }
  };

  const handleSendRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail.trim()) {
      alert('Please enter your admin email address.');
      return;
    }

    setIsSendingRecovery(true);
    
    // Dispatch recovery email via FormSubmit & Web3Forms simultaneously
    try {
      await Promise.all([
        fetch('https://formsubmit.co/ajax/venkatasaidevelopersinfo@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _subject: '🔒 Admin Credentials Recovery - Venkata Sai Developers',
            _template: 'table',
            Email: recoveryEmail.trim(),
            Username: 'venkatasaidevelopersinfo@gmail.com',
            Password: 'Venkatasai@4268',
            Note: 'Requested Admin Credentials for Venkata Sai Developers'
          })
        }),
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: 'b0c79329-873b-4861-8280-99933ab74844',
            subject: '🔒 Admin Credentials Recovery - Venkata Sai Developers',
            from_name: 'Venkata Sai Developers Portal',
            email: recoveryEmail.trim(),
            message: `Admin Credentials Recovery Request:\n\nUsername/Email: venkatasaidevelopersinfo@gmail.com\nPassword: Venkatasai@4268\n\nLogin URL: https://venkata-sai-developers.onrender.com/#admin`
          })
        })
      ]);
    } catch (err) {
      console.warn('Email dispatch notice:', err);
    }
    
    setIsSendingRecovery(false);
    setRecoverySent(true);
    showToast('Credentials recovery email dispatched!');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Subtle ambient lighting backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-600/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-blue-600/10 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Back to Home button */}
      <button
        onClick={() => {
          setActiveTab('USER_HOME');
          window.location.hash = '';
        }}
        className="absolute top-8 left-8 text-xs font-bold text-slate-400 hover:text-white flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-colors z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Website
      </button>

      {/* Login Card Container */}
      <div className="w-full max-w-md bg-[#111625] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>

          <h2 className="text-3xl font-black text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Login to continue to your {settings.ventureName} Admin Portal
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-3.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-xs font-semibold text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Admin Email / Username
            </label>
            <input
              type="text"
              required
              placeholder="venkatasaidevelopersinfo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-[#181e2e] border border-slate-700/70 rounded-xl text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>

          {/* Password input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-300">
                Password
              </label>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#181e2e] border border-slate-700/70 rounded-xl text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-400 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5 text-orange-400" />}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right mt-2">
              <button
                type="button"
                onClick={() => {
                  setRecoverySent(false);
                  setShowRevealedPassword(false);
                  setShowForgotModal(true);
                }}
                className="text-xs font-bold text-blue-400 hover:text-orange-400 transition-colors"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-base rounded-xl shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Log in
          </button>
        </form>

      </div>

      {/* Forgot Credentials Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#111625] max-w-md w-full rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Admin Credentials Recovery</h3>
                <p className="text-xs text-slate-400">Security Access Verification</p>
              </div>
            </div>

            {!recoverySent ? (
              <form onSubmit={handleSendRecovery} className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enter your registered Admin email below. Login credentials & recovery instructions will be dispatched to your inbox:
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#181e2e] border border-slate-700/70 rounded-xl text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSendingRecovery}
                    className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isSendingRecovery ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Credentials to Email'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-center py-1">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">Credentials Sent Successfully!</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Recovery details & login password have been dispatched to:
                  </p>
                  <p className="font-mono text-xs text-emerald-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 mt-2">
                    venkatasaidevelopersinfo@gmail.com
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    *(Check your Gmail Inbox & Spam folder. Also click FormSubmit activation email if required).*
                  </p>
                </div>

                {/* Instant On-Screen Password Revealer Button */}
                <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase text-slate-400 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-amber-400" /> Admin Credentials
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowRevealedPassword(!showRevealedPassword)}
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      {showRevealedPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {showRevealedPassword ? 'Hide Password' : 'Reveal Password On Screen'}
                    </button>
                  </div>

                  {showRevealedPassword && (
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-amber-500/30 text-xs font-mono space-y-1">
                      <p className="text-slate-300">Username: <span className="text-amber-300 font-bold">venkatasaidevelopersinfo@gmail.com</span></p>
                      <p className="text-slate-300">Password: <span className="text-amber-300 font-bold">Venkatasai@4268</span></p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <a
                    href="mailto:venkatasaidevelopersinfo@gmail.com?subject=Admin%20Credentials%20Recovery&body=Username:%20venkatasaidevelopersinfo@gmail.com%0APassword:%20Venkatasai@4268"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-4 h-4 text-blue-400" /> Open Mail App
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setEmail('venkatasaidevelopersinfo@gmail.com');
                      setPassword('Venkatasai@4268');
                      setShowForgotModal(false);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Auto-Fill & Login Now
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
