import { Button, ButtonProps, Pressable, View } from "react-native";
import { Link } from "expo-router";

interface ThemeButtonProps extends ButtonProps
{
  type?: 'default' | 'border'
}

export const ThemeButton = ({ type='default', ...rest }: ThemeButtonProps ) =>
{
  return (
    <Button { ...rest } />
  )
}

interface ThemeLinkButtonProps extends ThemeButtonProps
{
  href: string
}

export const ThemeLinkButton = ({ href, type='default', ...rest }: ThemeLinkButtonProps ) =>
{
  return (
    <Link href={ href } asChild>
      <Button { ...rest } />
    </Link>
  )
}
