import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs");
            return;
        }

        setLoading(true);

        try {
            console.log("Tentative de connexion avec:", { email, password });

            const response = await fetch("https://lorcana.brybry.fr/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            // Récupération de la réponse brute
            const responseText = await response.text();
            console.log("Réponse brute du serveur:", responseText);

            let data;
            try {
                data = JSON.parse(responseText); // Parser la réponse JSON
            } catch (error) {
                throw new Error("Réponse invalide du serveur.");
            }

            console.log("Réponse JSON parsée:", data);

            if (!response.ok) {
                throw new Error(data.message || `Erreur ${response.status}: ${response.statusText}`);
            }

            if (!data.token) {
                throw new Error("Token manquant dans la réponse du serveur.");
            }

            // Sauvegarde du token
            await AsyncStorage.setItem("userToken", data.token)
                .then(() => console.log("Token sauvegardé:", data.token))
                .catch((err) => console.error("Erreur stockage AsyncStorage:", err));

            Alert.alert("Connexion réussie", "Bienvenue !");
            router.replace("/home"); // Navigation vers HomeScreen

        } catch (error) {
            console.error("Erreur de connexion:", error);
            Alert.alert("Erreur", error.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Se connecter</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/register")}>
                    <Text style={styles.link}>Créer un compte</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    input: {
        width: "100%",
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        marginBottom: 15,
        backgroundColor: "#fff",
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    button: {
        width: "100%",
        padding: 16,
        backgroundColor: "#6A0DAD",
        borderRadius: 12,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        elevation: 2,
    },
    buttonDisabled: {
        backgroundColor: "#A680CF",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    link: {
        marginTop: 15,
        color: "#007BFF",
        textDecorationLine: "underline",
        fontSize: 16,
    },
});
