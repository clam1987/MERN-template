import React from "react";
import FormInput from "./FormInput";

const AuthenticationForm = ({ formData, title, handleChange }) => {
  return (
    <div>
      <h2>{title}</h2>
      <form>
        {formData.map((fields, i) => (
          <FormInput fields={fields} handleChange={handleChange} key={i} />
        ))}
      </form>
    </div>
  );
};

export default AuthenticationForm;
