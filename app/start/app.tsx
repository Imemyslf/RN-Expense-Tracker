import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { RootStackScreen, RootTapScreen } from "../navigation/navigation";

// import { useNavigation } from "expo-router";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import AllExpenses from "../screens/AllExpenses";
import ManageExpenses from "../screens/ManageExpenses";
import RecentExpenses from "../screens/RecentExpenses";
import { ExpensesContextProvider } from "../store/expenses-context";

const Stack = createNativeStackNavigator<RootStackScreen>();
const Tab = createBottomTabNavigator<RootTapScreen>();

// type NavigationProp = NativeStackNavigationProp<
//   RootStackScreen,
//   "ExpensesOverview"
// >;

const TabsScreen = () => {
  // const navigation = useNavigation<NavigationProp>();
  return (
    <Tab.Navigator
      //   screenOptions={{
      //     headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      //     headerTintColor: "white",
      //     tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      //     tabBarActiveTintColor: GlobalStyles.colors.accent500,
      //     headerRight: ({ tintColor }) => (
      //       <IconButton
      //         icon="add"
      //         color={tintColor!}
      //         size={24}
      //         onPress={() => {
      //           navigation.navigate("ManageExpenses", { expenseId: undefined });
      //         }}
      //       />
      //     ),
      //   }}

      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            color={tintColor!}
            size={24}
            onPress={() => {
              (navigation as any).navigate("ManageExpenses");
            }}
          />
        ),
      })}
    >
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: " Recent Expense",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: " All Expenses",
          tabBarLabel: "All Expense",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={TabsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpenses}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
