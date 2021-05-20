import { createDrawerNavigator } from "react-navigation-drawer";
import { AppTabNavigator } from "./AppTabNavigator";
import CustomSidebarMenu from "./CustomSidebarMenu";
import MyBartersScreen from "../screens/MyBartersScreen";
import SettingScreen from "../screens/SettingScreen";
import NotificationScreen from "../screens/NotificationScreen";

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home : {
      screen : AppTabNavigator,
      navigationOptions:{
        drawerIcon:<Icon name='home' type='fontawesome5'/>
      }
      },
    MyBarters: {
      screen: MyBartersScreen,
      navigationOptions:{
        drawerIcon:<Icon name='gift' type='font-awesome'/>,
        drawerLabel: 'My Donations'
      },
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions:{
        drawerIcon:<Icon name='settings' type='fontawesome5'/>,
        drawerLabel: 'My Donations'
      },
    },
    Notifications: {
      screen: NotificationScreen,
      navigationOptions:{
        drawerIcon:<Icon name='bell' type='font-awesome'/>,
        drawerLabel: 'My Donations'
      },
    },
  },
  {
    contentComponent: CustomSidebarMenu,
  },
  {
    initialRouteName: "Home",
  }
);
