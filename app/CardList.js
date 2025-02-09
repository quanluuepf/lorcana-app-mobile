import { Link, router } from "expo-router";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { Image } from expo

export default function CardList() {

    const [cards, setCards] = useState([]);

    const { id } = useLocalSearchParams();

    useEffect(() => {
        fetch(`https://lorcana.brybry.fr/api/sets/${id}/cards`)
            .then((response) => {
                return response.json();
            }).then((response) => {
                setCards(response.data)
            }).catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    return (<>
        <Text>CardList</Text>

        <FlatList
            data={cards}
            numColumns={2}
            keyExtractor={(card) => card.id.toString()}
            renderItem={({ item }) => {
                return <Link key={item.id} href={`/cardDetail?id=${item.id}`}>
                    <View style={{
                        flex: 1,
                        padding: 10,
                        margin: 10,
                    }}>

                        <Image
                            style={{ width: 200, height: 200 }}
                            source={{ uri: item.image }}
                            placeholder={require('../assets/back.png')}
                            transition={500}
                            placeholderContentFit="contain"
                            contentFit="contain"
                        />
                        <Text
                            style={{
                                textAlign: 'center',
                            }}
                        >{item.name}</Text>
                    </View>
                </Link>
            }}
        />
    </>
    );
}