import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export default function App() {

  const [filmes, setFilmes] = useState([]);
  const [filmeSorteado, setFilmeSorteado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch('https://api.tvmaze.com/shows')
      .then((response) => response.json())
      .then((data) => {

        setFilmes(data);
        

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  function sortearFilme(lista) {

    const filmesLista = lista || filmes;

    const numeroAleatorio = Math.floor(
      Math.random() * filmesLista.length
    );

    setFilmeSorteado(filmesLista[numeroAleatorio]);
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="purple" />
        <Text>Carregando filmes...</Text>
      </View>
    );
  }

  return (

    <ScrollView contentContainerStyle={styles.container}>


      <Image
        source={require('./assets/app-filmes.png')}
        style={styles.logo}
      />

      <Text style={styles.subText}>
        Clique no botão abaixo para sortear
        um filme aleatório.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => sortearFilme()}
      >

        <Text style={styles.buttonText}>
          Sortear Filme
        </Text>

      </TouchableOpacity>

      {filmeSorteado && (

        <View style={styles.card}>

          <Text style={styles.title}>
            {filmeSorteado.name}
          </Text>

          <Image
            source={{
              uri: filmeSorteado.image?.medium
            }}
            style={styles.image}
          />

          <Text style={styles.info}>
            Nota: {filmeSorteado.rating.average}
          </Text>

          <Text style={styles.info}>
            Linguagem:
            {' '}
            {filmeSorteado.language === 'English'
              ? 'Inglês'
              : filmeSorteado.language === 'Japanese'
              ? 'Japonês'
              : filmeSorteado.language === 'Spanish'
              ? 'Espanhol'
              : filmeSorteado.language} 
          </Text>

          <Text style={styles.info}>
            Gêneros:
            {' '}
            {filmeSorteado.genres.map((genero) => {
              
              const traducoes = {
                Comedy: 'Comédia',
                Action: 'Ação',
                Crime: 'Crime',
                Drama: 'Drama',
                Romance: 'Romance',
                Horror: 'Terror',
                Fantasy: 'Fantasia',
                Adventure: 'Aventura',
                Anime: 'Anime',
                Family: 'Família',
                ScienceFiction: 'Ficção Científica',
              };

              return traducoes[genero] || genero;

            }).join(', ')}

          </Text>

        </View>

      )}

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },

  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
    color: 'rgb(255, 255, 255)',
  },

  button: {
    backgroundColor: '#e321d6',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 30,
  },

  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#474545',
    width: '100%',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  image: {
    width: 250,
    height: 350,
    borderRadius: 10,
    marginBottom: 20,
  },

  info: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },

});