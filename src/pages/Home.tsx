import { useAppSelector } from "../state/hooks";
import { selectUserProfile } from "../state/reducers/authSlice";

const Home: React.FC = () => {
  const userProfile = useAppSelector(selectUserProfile);

  return (
    <div className="flex min-h-full items-center justify-center px-4">
      {userProfile && (
        <h1 className="text-center text-5xl font-medium text-gray-700">
          Welcome {userProfile.name}!
        </h1>
      )}
    </div>
  );
};

export default Home;
