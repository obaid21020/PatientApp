import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Communities from './screens/dashboard/Communities';
import Consult from './screens/dashboard/Consult';
import Dashboard from './screens/dashboard/Dashboard';
import HealthRecords from './screens/dashboard/HealthRecords';
import Orders from './screens/dashboard/Orders';
import Profile from './screens/dashboard/Profile';
import SOS from './screens/dashboard/SOS';
import LoginScreen from './screens/LoginScreen';
import Reg1 from './screens/register/Reg1';
import InitialPicks from './screens/register/Reg2/InitialPicks';
import ShowAll from './screens/register/Reg2/ShowAll';
import SkipGeneral from './screens/register/Reg2/SkipGeneral';
import Reg3 from './screens/register/Reg3';
import Reg4 from './screens/register/Reg4';
import Reg5 from './screens/register/Reg5';
import WelcomeScreen from './screens/WelcomeScreen.js';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login"   component={LoginScreen} />
        <Stack.Screen name="Reg1"   component={Reg1} />
        <Stack.Screen name="InitialPicks"   component={InitialPicks} />
        <Stack.Screen name="ShowAll"   component={ShowAll} />
        <Stack.Screen name="SkipGeneral"   component={SkipGeneral} />
        <Stack.Screen name="Reg3"   component={Reg3} />
        <Stack.Screen name="Reg4"   component={Reg4} />
        <Stack.Screen name="Reg5"   component={Reg5} />
        <Stack.Screen name="Main" component={DrawerNavigator} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
      }}>
      <Drawer.Screen 
        name="Home" 
        component={Dashboard}
        options={{
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen 
        name="Consult" 
        component={Consult}
        options={{
          drawerLabel: 'Consult',
        }}
      />
      <Drawer.Screen 
        name="HealthRecords" 
        component={HealthRecords}
        options={{
          drawerLabel: 'Health Records',
        }}
      />
      <Drawer.Screen 
        name="Communities" 
        component={Communities}
        options={{
          drawerLabel: 'Communities',
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={Profile}
        options={{
          drawerLabel: 'Profile',
        }}
      />
      <Drawer.Screen 
        name="Orders" 
        component={Orders}
        options={{
          drawerLabel: 'Orders',
        }}
      />
      <Drawer.Screen 
        name="SOS" 
        component={SOS}
        options={{
          drawerLabel: 'Emergency SOS',
          drawerLabelStyle: { color: '#DC2626', fontWeight: '600' },
          drawerIcon: ({ size }) => (
            <Ionicons name="alert-circle" size={size} color="#DC2626" />
          ),
          drawerActiveTintColor: '#DC2626',
        }}
      />
    </Drawer.Navigator>
  );
}