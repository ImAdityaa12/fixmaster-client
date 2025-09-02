import { Redirect } from "expo-router";

export default function Index() {
  // TODO: Add authentication check here
  // For now, redirect to login
  return <Redirect href="/(auth)/login" />;
}
