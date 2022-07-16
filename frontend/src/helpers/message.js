// Render alert messages

export const showErrorMessage = msg => (
  <div className="alert alert-danger" role="alert">
    {msg}
  </div>
);
export const showSuccessMessage = msg => (
  <div className="alert alert-success" role="alert">
    {msg}
  </div>
);
