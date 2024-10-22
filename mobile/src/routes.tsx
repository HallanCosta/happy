import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { OrphanagesMap } from './pages/OrphanagesMap';
import { OrphanageDetails } from './pages/OrphanageDetails';
import { SelectMapPosition } from './pages/CreateOrphanage/SelectMapPosition';
import { OrphanageData } from './pages/CreateOrphanage/OrphanageData';
import { Header } from './components/Header';

export const Routes = () => {
  const AppStack = createStackNavigator();

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen 
          name="OrphanagesMap"
          component={OrphanagesMap}
        />

        <AppStack.Screen 
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Orfanato" />
          }}
        />

        <AppStack.Screen 
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />
          }}
        />

        <AppStack.Screen 
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />
          }}
        />

      </AppStack.Navigator>
    </NavigationContainer>
  );
}