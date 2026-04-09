import { useState } from "react";
import { Button } from "@/components/button.tsx";
import { useDispatch } from "@/state/provider.tsx";
import { Actions } from "@/state/reducer.ts";
import { introduce } from "@/services/api.ts";
import * as React from "react";

export const Introduction = () =>
{
  const [ processing, setProcessing ] = useState( false );
  const [ nameValue, setNameValue ] = useState('');

  const dispatch = useDispatch();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setNameValue(e.target.value);
  }

  const onSubmit = () =>
  {
    if( ! canSubmit )
      return;

    setProcessing( true );
    introduce( nameValue )
      .then( response => {
        console.warn( 'response', nameValue, response )
        dispatch({
          type  : Actions.INTRODUCED,
          name  : nameValue,
          intro : response.intro_mindset,
          uuid  : response.conversation_id,
        })
      })
      .finally( () => {
        setProcessing( false )
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
          disabled={ processing || ! canSubmit }
          title="Submit"
        />
      </div>
    </>
  )
}
