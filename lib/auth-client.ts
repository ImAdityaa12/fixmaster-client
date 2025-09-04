import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: "http://192.168.60.240:5000",
    plugins: [
        expoClient({
            scheme: "fixmasterclient",
            storagePrefix: "fixmasterclient",
            storage: SecureStore,
        })
    ]
});