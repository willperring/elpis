import { Stack } from "expo-router";

export default function ModelLayout()
{
  return (
    <Stack>

      <Stack.Screen
        name="motivate"
        options={{
          headerShown: false
        }}
      />

    </Stack>
  )
}
