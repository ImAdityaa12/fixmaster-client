import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: "http://192.168.1.3:5000",
    plugins: [
        expoClient({
            scheme: "fixmasterclient",
            storagePrefix: "fixmasterclient",
            storage: SecureStore,
        })
    ],
    user: {
        additionalFields: {
            phoneNumber: {
                type: "string",
                required: true,
            },
            city: {
                type: "string", 
                required: true,
            },
            pincode: {
                type: "number",
                required: true,
            }
        }
    }
});