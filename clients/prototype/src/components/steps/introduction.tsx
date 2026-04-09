import { useState } from "react";
import { Button } from "@/components/button.tsx";
import { useDispatch } from "@/state/provider.tsx";
import { Actions } from "@/state/reducer.ts";
import { introduce } from "@/services/api.ts";

export const Introduction = () =>
{
  const [ nameValue, setNameValue ] = useState('');

  const dispatch = useDispatch();

  const handleNameChange = (e) => setNameValue(e.target.value);

  const onSubmit = () =>
  {
    if( ! canSubmit )
      return;

    introduce( nameValue ).then( response => {
      console.warn( 'response', nameValue, response )
      dispatch({
        type  : Actions.INTRODUCED,
        name  : nameValue,
        intro : response.intro_mindset
      })
    })
  }

  const canSubmit = nameValue.length > 1;

  return (
    <>
      <div className="step-wrapper">
        <h2>Introduction</h2>
        <p>What is your name?</p>
        <input
          id="user-name-input"
          onChange={handleNameChange}
          value={nameValue}
          type="text"
        />
        <Button
          className="mt-2"
          onPress={onSubmit}
          disabled={ ! canSubmit }
          title="Submit"
        />
      </div>
    </>
  )
}