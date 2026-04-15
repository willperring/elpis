import { ThemeView } from "@/components/theme-view";
import { ThemeText } from "@/components/theme-text";
import { Button, StyleSheet, TextInput } from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color";


export const ChatFooter = () =>
{
  const color = useThemeColor({}, 'text');

  return (
    <ThemeView style={ styles.rootContainer }>
      <ThemeView style={ styles.rowContainer }>

        <TextInput
          placeholder="Say Hello"
          multiline={ true }
          style={[
            styles.textInput,
            { color }
          ]}
        />

        <Button
          title="Send"
        />

      </ThemeView>
    </ThemeView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'darkgreen',
    padding: 10
  },
  rowContainer: {
    backgroundColor: 'darkred',
    flexDirection: 'row',
    gap: 10,
  },
  textInput: {
    backgroundColor: 'darkblue',
    flexGrow: 1,
  }
})


