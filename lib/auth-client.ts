import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    scheme: "fixmasterclient",
    plugins: [
        expoClient({
            scheme: "fixmasterclient",
            storagePrefix: "fixmasterclient",
            storage: SecureStore,
        })
    ],
})