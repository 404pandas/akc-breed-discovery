import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
// todo- build out query for user
import { QUERY_ME } from "../../utils/queries";
import { REMOVE_BREED } from "../../utils/mutations";
// Todo- build out this file
import { removeBreedId } from "../../utils/localStorage";
import Auth from "../../utils/auth";

const Dashboard = () => {
  const [removeBreed, { error }] = useMutation(REMOVE_BREED);

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_ME : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (
    Auth.loggedIn() &&
    /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
    Auth.getProfile().authenticatedPerson.username === userParam
  ) {
    return <Navigate to='/me' />;
  }

  if (!user?.username) {
    return (
      <h4>Profile unavailable! Use the links above to sign up or log in!</h4>
    );
  }
  // accepts ID as param and deletes breed from database
  const handleDeleteBreed = async (breedId) => {
    // gets token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBreed({
        variables: { breedId },
      });

      // Removed breed's ID from localStorage
      removeBreedId(breedId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>Loading!</h2>;
  }

  return (
    <div>
      <p>User Info</p>
      <div>
        <h2>{userParam ? `${user.username}` : null}</h2>
      </div>
      <p>Saved breeds && Notes</p>
      <div>
        <div>
          {userData.savedBreeds?.map((breed) => {
            return <div>{breed}</div>;
          })}
        </div>
        <NoteList
          notes={user.notes}
          title={`Notes created for breeds`}
          showTitle={false}
          showUsername={false}
        />
      </div>
    </div>
  );
};

export default Dashboard;
