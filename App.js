import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddVitals from './screens/dashboard/Vitals/AddVitals.js';
import CustomVital from './screens/dashboard/Vitals/CustomVital.js';
import RecordVital from './screens/dashboard/Vitals/RecordVitals.js';
import VitalHistory from './screens/dashboard/Vitals/VitalHistory.js';

import Communities from './screens/dashboard/Communities';
import ChatConversation from './screens/dashboard/Consultations/ChatConversation.js';
import Consult from './screens/dashboard/Consultations/Consult.js';
import Dashboard from './screens/dashboard/Dashboard';
import HealthRecords from './screens/dashboard/HealthRecords';
import Notifications from './screens/dashboard/Notifications.js';
import QuickProfile from './screens/dashboard/QuickProfile.js';
import SOS from './screens/dashboard/SOS.js';
import LoginScreen from './screens/LoginScreen';
import Reg1 from './screens/register/Reg1';
import InitialPicks from './screens/register/Reg2/InitialPicks';
import ShowAll from './screens/register/Reg2/ShowAll';
import SkipGeneral from './screens/register/Reg2/SkipGeneral';
import Reg3 from './screens/register/Reg3';
import Reg4 from './screens/register/Reg4';
import Reg5 from './screens/register/Reg5';
import WelcomeScreen from './screens/WelcomeScreen.js';
// Import new Profile folder screens
import EditProfile from './screens/dashboard/Profile/EditProfile.js';
import History from './screens/dashboard/Profile/PaymentHistory.js';
import PaymentMethods from './screens/dashboard/Profile/PaymentMethods.js';
import Privacy from './screens/dashboard/Profile/Privacy.js';
import Security from './screens/dashboard/Profile/Security.js';
import Subscriptions from './screens/dashboard/Profile/Subscriptions.js';
import Wallet from './screens/dashboard/Profile/Wallet.js';
//import HealthAddons records screens
import LogPeriod from './screens/HealthAddons/LogPeriod.js';
import Refill from './screens/HealthAddons/Refill.js';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Reg1" component={Reg1} />
        <Stack.Screen name="InitialPicks" component={InitialPicks} />
        <Stack.Screen name="ShowAll" component={ShowAll} />
        <Stack.Screen name="SkipGeneral" component={SkipGeneral} />
        <Stack.Screen name="Reg3" component={Reg3} />
        <Stack.Screen name="Reg4" component={Reg4} />
        <Stack.Screen name="Reg5" component={Reg5} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="QuickProfile" component={QuickProfile} />
        <Stack.Screen name="SOS" component={SOS} /> 
        {/* Profile Stack Screens */}
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Subscriptions" component={Subscriptions} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Security" component={Security} />
        
        {/*Health records screens */}
        <Stack.Screen name="AddVitals" component={AddVitals} />
        <Stack.Screen name="RecordVital" component={RecordVital} />
        <Stack.Screen name="CustomVital" component={CustomVital} />
        <Stack.Screen name="VitalHistory" component={VitalHistory} />
        <Stack.Screen name="Refill" component={Refill} />
        <Stack.Screen  name="LogPeriod" component={LogPeriod} options={{ headerShown: false }} />
        {/* Keep old Profile for drawer navigation compatibility, or redirect to QuickProfile */}
        <Stack.Screen name="Profile" component={QuickProfile} />
        <Stack.Screen name="ChatConversation" component={ChatConversation} />
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 10,
          elevation: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Consult') {
            iconName = 'chatbubble-ellipses-outline';
          } else if (route.name === 'HealthRecords') {
            iconName = 'folder-outline';
          } else if (route.name === 'Communities') {
            iconName = 'people-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = 'person-outline';
          }
          return <Ionicons name={iconName} size={28} color={focused ? '#25636E' : '#B0BEC5'} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="HealthRecords" component={HealthRecords} />
      <Tab.Screen name="Consult" component={Consult} />
      <Tab.Screen name="Communities" component={Communities} />
      <Tab.Screen name="ProfileTab" component={QuickProfile} />
    </Tab.Navigator>
  );
}