import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import mapMarkerImg from '../images/map-marker.png';
import { api } from '../services/api';

type OrphanageDetailsRouteParams = {
  id: number;
}

type OrphanageImage = {
  id: number;
  url: string;
}

type Orphanage = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: OrphanageImage[];
}

export const OrphanageDetails = () => {
  const route = useRoute();

  const [orphanage, setOrphanage] = useState<Orphanage>({
    id: 0,
    name: '',
    latitude: 0,
    longitude: 0,
    about: '',
    instructions: '',
    opening_hours: '',
    open_on_weekends: false,
    images: [{
      id: 0,
      url: ''
    }]
  });

  const [orphanageVisible, setOrphanageVisible] = useState(false);

  const params = route.params as OrphanageDetailsRouteParams;

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setOrphanage(response.data);
      setOrphanageVisible(true);
    });
  }, [params.id]);

  function handleOpenGoogleMapsRoutes() {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`);
  }

  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>

          <ScrollView horizontal pagingEnabled>
            { orphanage.images.map(image => {
              return (
                <ShimmerPlaceHolder
                  key={image.id}
                  style={styles.image} 
                  stopAutoRun={false}
                  visible={orphanageVisible}
                >
                  <Image
                    style={styles.image} 
                    source={{ uri: image.url || undefined }} 
                  />
                </ShimmerPlaceHolder>
              );
            })}
          </ScrollView>

      </View>
        
      <View style={styles.detailsContainer}>
        <ShimmerPlaceHolder
          style={styles.title} 
          stopAutoRun={false}
          visible={orphanageVisible}
        >
          <Text style={styles.title}>{orphanage.name}</Text>
        </ShimmerPlaceHolder>

        <ShimmerPlaceHolder
          style={styles.description} 
          stopAutoRun={false}
          visible={orphanageVisible}
        >
          <Text style={styles.description}>{orphanage.about}</Text>
        </ShimmerPlaceHolder>
      
        
        <View style={styles.mapContainer}>
          <MapView 
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ 
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            />
          </MapView>

          <TouchableOpacity onPress={handleOpenGoogleMapsRoutes} style={styles.routesContainer}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>
        
      
        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>

        <ShimmerPlaceHolder
          style={styles.description}
          stopAutoRun={false}
          visible={orphanageVisible}
        >
          <Text style={styles.description}>{orphanage.instructions}</Text>
        </ShimmerPlaceHolder>

        <View style={styles.scheduleContainer}>
          
          <ShimmerPlaceHolder 
            style={[styles.scheduleItem, styles.scheduleItemBlue]}
            stopAutoRun={false}
            visible={orphanageVisible}
          >
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Segunda à Sexta {orphanage.opening_hours}</Text>
          </ShimmerPlaceHolder>

          {orphanage.open_on_weekends ? (
            <ShimmerPlaceHolder 
              style={[styles.scheduleItem, styles.scheduleItemGreen]}
              stopAutoRun={false}
              visible={orphanageVisible}
            >
              <Feather name="info" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana</Text>
            </ShimmerPlaceHolder>
          ) : (
            <ShimmerPlaceHolder 
              style={[styles.scheduleItem, styles.scheduleItemRed]}
              stopAutoRun={false}
              visible={orphanageVisible}
            >
              <Feather name="info" size={40} color="#FF669D" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não atendemos fim de semana</Text>
            </ShimmerPlaceHolder>
          )}
        </View>

        {/* <RectButton style={styles.contactButton} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton> */}

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },

  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5'
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: '#FEF6F9',
    borderWidth: 1,
    borderColor: '#FFBCD4',
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599'
  },

  scheduleTextGreen: {
    color: '#37C77F'
  },

  scheduleTextRed: {
    color: '#FF669D'
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  }
})