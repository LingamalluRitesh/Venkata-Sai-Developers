import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound, AlertCircle, Sparkles } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setActiveTab, settings } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginAdmin(email, password);
    if (!success) {
      setErrorMsg('Invalid email address or password. Click "Forgot password?" for credentials.');
    }
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

      {/* Login Card Container (Reference Image 2 styling) */}
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
              Email address or Employee ID
            </label>
            <input
              type="text"
              required
              placeholder="e.g. admin@venkatasaidevelopers.com"
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
                onClick={() => setShowForgotModal(true)}
                className="text-xs font-bold text-blue-400 hover:text-orange-400 transition-colors"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-base rounded-xl shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Log in
          </button>
        </form>

        {/* Quick Hint Bar for Admin */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-400">
            Admin Access: <code className="bg-slate-800 text-orange-300 px-1.5 py-0.5 rounded font-mono">admin@venkatasaidevelopers.com</code> / <code className="bg-slate-800 text-orange-300 px-1.5 py-0.5 rounded font-mono">admin123</code>
          </p>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#111625] max-w-md w-full rounded-3xl border border-slate-800 p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Admin Credentials Recovery</h3>
                <p className="text-xs text-slate-400">Security Credentials Notification</p>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl space-y-2 text-xs text-slate-200">
              <p className="font-semibold text-blue-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Password reset instructions & credentials sent to:
              </p>
              <p className="font-mono text-white bg-slate-900/60 p-2 rounded border border-slate-800">
                {settings.contactEmail}
              </p>
              
              <div className="pt-2 border-t border-blue-500/20">
                <span className="text-[11px] text-slate-400 block mb-1">Your Default Admin Credentials:</span>
                <p className="font-mono text-orange-300">Email: admin@venkatasaidevelopers.com</p>
                <p className="font-mono text-orange-300">Password: admin123</p>
              </div>
            </div>

            <button
              onClick={() => {
                setEmail('admin@venkatasaidevelopers.com');
                setPassword('admin123');
                setShowForgotModal(false);
              }}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Auto-Fill Credentials & Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
