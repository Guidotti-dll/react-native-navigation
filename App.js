import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {SignIn, CreateAccount, Profile, Home, Search, Details, Search2, Splash} from './Screens'
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { AuthContext } from './context';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const RootStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Details" component={Details} options={({route}) => ({
      title: route.params.name
    })}
    />
  </HomeStack.Navigator>
)

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
)

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
)

const RootStackScreen = ({userToken}) => (
  <RootStack.Navigator headerMode='none'>
    {userToken ? 
    (
      <RootStack.Screen name="App" component={DrawerScreen} options={{
        animationEnabled:false
      }} />
      ):(
      <RootStack.Screen name="Auth"  component={AuthStackScreen}  options={{
        animationEnabled:false
      }} />
    )}
  </RootStack.Navigator>
)

const TabsScreen = () => (
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeStackScreen} />
        <Tabs.Screen name="Search" component={SearchStackScreen} />
      </Tabs.Navigator>
)

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name='Home' component={TabsScreen} />
    <Drawer.Screen name='Profile' component={ProfileStackScreen} />
  </Drawer.Navigator>
)

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component={SignIn} options={{title: 'Sign In'}} />
    <AuthStack.Screen name="CreateAccount" component={CreateAccount} options={{title: 'Create Account'}} />
  </AuthStack.Navigator>
)

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('dasdsadasd');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('dasdsadasd');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, [])

  if (isLoading) {
    return (
      <Splash />
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <RootStackScreen userToken={userToken} />
    </NavigationContainer>
  </AuthContext.Provider>
  )
}
  

export default App