export type ChatMessage = { role: 'system' | 'user' | 'assistant', content: string };

export type ChatConversation = ChatMessage[];

export type AdvicePersona = {
  persona_name         : string,
  persona_advice_style : string,
  persona_description  : string,
  llm_instruction      : string,
}

export type AdviceStep = {
  step_title       : string,
  step_description : string,
}
