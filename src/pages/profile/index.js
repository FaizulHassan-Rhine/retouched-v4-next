// File: pages/profile.js or pages/profile.tsx
import ProfileInfo from "@/components/Dashboard/ProfileInfo/ProfileInfo";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

const ProfilePage = () => {
  return (
    <PrivateRoute>
      <ProfileInfo />
    </PrivateRoute>
  );
};

export default ProfilePage;
