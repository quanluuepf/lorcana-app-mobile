import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("https://lorcana.brybry.fr/api/login", {
                email,
                password,
            });

            if (response.data.token) {
                await AsyncStorage.setItem("authToken", response.data.token);
                Alert.alert("Connexion réussie", "Bienvenue !");
                navigation.navigate("Home"); // Rediriger vers la page principale
            } else {
                Alert.alert("Erreur", "Identifiants incorrects");
            }
        } catch (error) {
            Alert.alert("Erreur", "Problème de connexion");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Email :</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Entrez votre email"
                autoCapitalize="none"
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />

            <Text>Mot de passe :</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Entrez votre mot de passe"
                secureTextEntry
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />

            <Button title="Se connecter" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;