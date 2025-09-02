import { authClient } from "@/lib/auth-client";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await authClient.signIn.email({
      email,
      password,
    });
  };

  return (
    <View style={{ marginTop: 16 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Link
        href="/(auth)/signup"
        style={{
          marginTop: 16,
        }}
      >
        Sign Up
      </Link>
    </View>
  );
}
