import React from 'react';

const FormInput = ({ fields, handleChange }) => {
    const { name, placeholder, type } = fields
    const handleInputChange = e => {
        const { value, name } = e.target;
        handleChange({[name]: value})
    };
    
    return (
    <div className="form-group">
        <input type={type} id={name} placeholder={placeholder} name={name} onChange={handleInputChange} />
    </div>
    )
}

export default FormInput