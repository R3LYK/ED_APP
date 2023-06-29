import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Update state to indicate an error has occurred
    this.setState({ hasError: true });

    // You can also log the error or send it to an error tracking service
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI when an error occurs
      return <div>Something went wrong. Please try again later.</div>;
    }

    // Render the children components if there are no errors
    return this.props.children;
  }
}

export default ErrorBoundary;
