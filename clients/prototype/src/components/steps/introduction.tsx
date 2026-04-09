import { useState } from "react";

export const Introduction = () =>
{
  const [ name, setName ] = useState('');

  const handleNameChange = (e) => setName(e.target.value);

  return (
    <>
      <div className="step-wrapper">
        <h2>Introduction</h2>
        <p>What is your name?</p>
        <input
          onChange={handleNameChange}
          value={name}
          type="text"
        />
      </div>
    </>
  )
}