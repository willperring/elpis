import type { ChatConversation } from "@/types/llm.ts";

const API_URL = 'http://localhost:8001/api/v1'

const post = ( url: string, body: object ) => fetch( url, {
  method: 'POST',
  body: JSON.stringify( body ),
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
}).then(
  res => res.json()
)

export const introduce = ( name: string ) => post(
  `${API_URL}/introduction`,
  { name }
)

export const mindset = ( conversationId: string, name: string, mindset: string ) => post(
  `${API_URL}/${conversationId}/mindset`,
  { name, mindset }
)

export const identifyObjective = ( conversationId: string, conversation: ChatConversation ) => post(
  `${API_URL}/${conversationId}/identify-objective`,
  { conversation }
)

export const confirmObjective = ( conversationId: string, conversation: ChatConversation ) => post(
  `${API_URL}/${conversationId}/confirm-objective`,
  { conversation }
)

export const obstacles = ( conversationId: string, conversation: ChatConversation ) => post(
  `${API_URL}/${conversationId}/obstacles`,
  { conversation }
)

