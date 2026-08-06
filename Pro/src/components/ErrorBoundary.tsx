import React from 'react';

interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'monospace' }}>
          <div style={{ background: '#1e293b', border: '1px solid #ef4444', borderRadius: '12px', padding: '2rem', maxWidth: '600px', width: '100%' }}>
            <h1 style={{ color: '#ef4444', fontSize: '1.2rem', marginBottom: '1rem' }}>⚠️ App Error — Please Screenshot This</h1>
            <p style={{ color: '#f87171', fontSize: '0.85rem', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
              {this.state.error?.message || 'Unknown error'}
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '1rem', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
              {this.state.error?.stack || ''}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{ marginTop: '1.5rem', padding: '0.5rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
