import ProfileInfo from "@/components/Dashboard/ProfileInfo/ProfileInfo";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";


const SettingsPage = () => {
  return <ProfileInfo />;
};

export default PrivateRoute(SettingsPage);
