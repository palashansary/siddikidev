import React from "react";

// Last line of defence: a render error shows a friendly message instead of a
// blank page.
class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center bg-[#0A1926]">
        <p className="text-white text-2xl md:text-3xl font-bricolage">
          Something went wrong on this page.
        </p>
        <a href="/" className="text-slate-100 text-[1.1rem] px-4 py-1 border border-white rounded-lg">
          Go to home
        </a>
      </div>
    );
  }
}

export default ErrorBoundary;
