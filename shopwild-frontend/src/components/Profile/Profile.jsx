import { useAuth } from "../../context/auth-context";

const Profile = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
