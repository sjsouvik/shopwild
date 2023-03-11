import { useAuth } from "../../context";

const Profile = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button
        data-testid="logoutButton"
        className="btn btn-primary"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
