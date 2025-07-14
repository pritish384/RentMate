import { createClient } from "@supabase/supabase-js";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const supabase = createClient(
  "https://umveiyffbnccatdvklyt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtdmVpeWZmYm5jY2F0ZHZrbHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDg3MDAsImV4cCI6MjA2NDc4NDcwMH0.JOoKbS9ovKAhSgBtbEkHMDEEfK0txFXcMuT-fn4oz9U"
);

export default function Index() {
  const [, response, promptAsync] = Google.useAuthRequest({
  clientId: "YOUR_GOOGLE_WEB_CLIENT_ID",
  redirectUri: AuthSession.makeRedirectUri({ useProxy: true } as any),
  scopes: ["openid", "profile", "email"],
  responseType: "id_token",
});

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      supabase.auth
        .signInWithIdToken({
          provider: "google",
          token: id_token,
        })
        .then(({ data, error }) => {
          if (error) console.error("Supabase login error:", error.message);
          else console.log("User logged in!", data);
        });
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#cbd7fa" }}>
      <Text style={{ position: "absolute", top: 100, fontSize: 64, fontWeight: "bold", color: "#1A3353" }}>
        RentMate
      </Text>
      <Text style={{ position: "absolute", top: 180, fontSize: 24, color: "#1A3353" }}>
        Track. Split. Manage.
      </Text>

      <Image source={require("../assets/images/onboarding.png")} style={{ width: 360, height: 300, resizeMode: "contain" }} />

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 100,
          backgroundColor: "#3d7ae4",
          paddingVertical: 16,
          paddingHorizontal: 20,
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => promptAsync()}
      >
        <View style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", marginRight: 16 }}>
          <Image source={require("../assets/images/google_logo.png")} style={{ width: 48, height: 48 }} />
        </View>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>Continue with Google</Text>
      </TouchableOpacity>

      <Text style={{ position: "absolute", bottom: 50, fontSize: 16, color: "#1A3353" }}>
        © 2025 AICX Technologies.
      </Text>
    </View>
  );
}
