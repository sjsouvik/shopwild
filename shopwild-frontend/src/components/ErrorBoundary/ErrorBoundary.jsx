import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(`Uncaught error: ${error}, ${info}`);
  }

  render() {
    if (this.state.hasError) {
      return <p>Oops! something went wrong!</p>;
    }

    return this.props.children;
  }
}
