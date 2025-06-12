/**
 * Get the current date in YYYY-MM-DD format.
 * @returns {string} - The current date.
 */
export const getCurrentDate = () => {
    return new Date().toISOString().slice(0, 10);
  };
  
  /**
   * Get the current time in HH:MM format.
   * @returns {string} - The current time.
   */
  export const getCurrentTime = () => {
    return new Date().toTimeString().slice(0, 5);
  };
  
  /**
   * Handles input changes in a form.
   * @param {Function} setState - State setter function.
   * @param {string} field - Field name.
   * @param {any} value - New value of the field.
   */
  export const handleChange = (setState) => (field, value) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  
  /**
   * Prepares form data for sending to the backend.
   * @param {Object} formState - The form state object.
   * @param {Object} user - The logged-in user object.
   * @returns {FormData} - FormData object ready for submission.
   */
  export const prepareFormData = (formState, user) => {
    const formData = new FormData();
  
    // Append standard form fields
    Object.entries(formState).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
  
    // Append the author (logged-in user)
    if (user?.userId) {
      formData.append('author', user.userId);
    }
  
    return formData;
  };
  