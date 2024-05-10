import { useAppSelector } from "../state/hooks";
import { selectUserProfile } from "../state/reducers/authSlice";

const UserProfile = () => {
  const userProfile = useAppSelector(selectUserProfile);

  return (
    userProfile && (
      <div className="flex min-h-full items-center justify-center">
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 p-6">
            <h2 className="text-2xl font-medium text-white sm:text-4xl">Your Profile</h2>
          </div>
          <div className="p-6">
            <div className="mb-4 flex items-center">
              <img
                src={userProfile.avatar}
                alt="Avatar"
                className="mr-4 h-20 w-20 rounded-full sm:h-32 sm:w-32"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 sm:text-2xl">
                  {userProfile.name}
                </h3>
                <p className="text-gray-600 sm:text-xl">{userProfile.email}</p>
              </div>
            </div>
            <div className="space-y-4 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-700 sm:text-xl">Id:</p>
                <p className="font-semibold text-gray-900 sm:text-xl">{userProfile.id}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700 sm:text-xl">Role:</p>
                <p className="font-semibold text-gray-900 sm:text-xl">{userProfile.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserProfile;
