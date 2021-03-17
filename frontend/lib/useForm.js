import { useState, useEffect } from 'react';

export default function useForm(initialState = {}) {
  const [formState, setFormState] = useState(initialState);

  const initialValues = Object.values(initialState).join('');

  useEffect(() => {
    setFormState(initialState);
  }, [initialValues]);

  function handleChange(e) {
    let { value, type, name } = e.target;

    if (type === 'number') {
      value = parseInt(value, 10);
    }

    if (type === 'file') {
      [value] = e.target.files;
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  }

  function resetForm() {
    setFormState(initialState);
  }

  function clearForm() {
    const clearedState = Object.fromEntries(
      Object.entries(formState).map(([key]) => [key, ''])
    );

    setFormState(clearedState);
  }

  return {
    formState,
    handleChange,
    resetForm,
    clearForm,
  };
}
