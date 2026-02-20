import React from 'react';
// error boundary to catch rendering errors gracefully
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px', textAlign: 'center', backgroundColor: '#1e293b',
          borderRadius: '12px', margin: '20px'
        }}>
          <span style={{ fontSize: '40px' }}>😵</span>
          <h3 style={{ color: '#f1f5f9', marginTop: '12px' }}>Something went wrong</h3>
          <p style={{ color: '#64748b', fontSize: '13px' }}>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })} style={{
            marginTop: '16px', padding: '8px 20px', backgroundColor: '#3b82f6', color: '#fff',
            border: 'none', borderRadius: '6px', cursor: 'pointer'
          }}>Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
