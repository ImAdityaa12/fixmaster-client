import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { authClient } from "@/lib/auth-client";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        Alert.alert("Error", result.error.message || "Signup failed");
      } else {
        Alert.alert("Success", "Account created successfully!", [
          { text: "OK", onPress: () => router.replace("/(auth)/login") },
        ]);
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ThemedView style={styles.content}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Create Account
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Sign up to get started
            </ThemedText>
          </View>

          <View style={styles.form}>
            <TextInput
              style={[
                styles.input,
                { borderColor: tintColor, color: textColor, backgroundColor },
              ]}
              placeholder="Full Name"
              placeholderTextColor={textColor + "80"}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
            />

            <TextInput
              style={[
                styles.input,
                { borderColor: tintColor, color: textColor, backgroundColor },
              ]}
              placeholder="Email"
              placeholderTextColor={textColor + "80"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <TextInput
              style={[
                styles.input,
                { borderColor: tintColor, color: textColor, backgroundColor },
              ]}
              placeholder="Password"
              placeholderTextColor={textColor + "80"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
            />

            <TextInput
              style={[
                styles.input,
                { borderColor: tintColor, color: textColor, backgroundColor },
              ]}
              placeholder="Confirm Password"
              placeholderTextColor={textColor + "80"}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="new-password"
            />

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: tintColor, opacity: loading ? 0.7 : 1 },
              ]}
              onPress={handleSignup}
              disabled={loading}
            >
              <ThemedText style={styles.buttonText}>
                {loading ? "Creating Account..." : "Sign Up"}
              </ThemedText>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
              <ThemedText style={styles.linkText}>
                Already have an account?{" "}
              </ThemedText>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <ThemedText style={[styles.link, { color: tintColor }]}>
                    Sign In
                  </ThemedText>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
    fontSize: 16,
  },
  form: {
    gap: 20,
  },
  input: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    minHeight: 56,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 12,
    minHeight: 56,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    flexWrap: "wrap",
  },
  linkText: {
    fontSize: 16,
  },
  link: {
    fontWeight: "600",
    fontSize: 16,
  },
});
