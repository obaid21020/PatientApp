import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
import Orders from './screens/dashboard/Orders';
import QuickProfile from './screens/dashboard/QuickProfile.js';
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
// Import new Profile folder screens
import EditProfile from './screens/dashboard/Profile/EditProfile.js';
import History from './screens/dashboard/Profile/PaymentHistory.js';
import PaymentMethods from './screens/dashboard/Profile/PaymentMethods.js';
import Privacy from './screens/dashboard/Profile/Privacy.js';
import Security from './screens/dashboard/Profile/Security.js';
import Subscriptions from './screens/dashboard/Profile/Subscriptions.js';
import Wallet from './screens/dashboard/Profile/Wallet.js';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
        {/* Keep old Profile for drawer navigation compatibility, or redirect to QuickProfile */}
        <Stack.Screen name="Profile" component={QuickProfile} />
        <Stack.Screen name="ChatConversation" component={ChatConversation} />
        <Stack.Screen name="Main" component={DrawerNavigator} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false, drawerType: 'slide' }}>
      <Drawer.Screen name="Home" component={Dashboard} options={{ drawerLabel: 'Home' }} />
      <Drawer.Screen name="Consult" component={Consult} options={{ drawerLabel: 'Consult' }} />
      <Drawer.Screen name="HealthRecords" component={HealthRecords} options={{ drawerLabel: 'Health Records' }} />
      <Drawer.Screen name="Communities" component={Communities} options={{ drawerLabel: 'Communities' }} />
      <Drawer.Screen name="ProfileDrawer" component={QuickProfile} options={{ drawerLabel: 'Profile' }} />
      <Drawer.Screen name="Orders" component={Orders} options={{ drawerLabel: 'Orders' }} />
      <Drawer.Screen 
        name="SOS" 
        component={SOS}
        options={{
          drawerLabel: 'Emergency SOS',
          drawerLabelStyle: { color: '#DC2626', fontWeight: '600' },
          drawerIcon: ({ size }) => (<Ionicons name="alert-circle" size={size} color="#DC2626" />),
          drawerActiveTintColor: '#DC2626',
        }}
      />
    </Drawer.Navigator>
  );
}