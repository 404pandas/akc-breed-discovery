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

  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || {};

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
        <h2>Good luck during your breed discovery, ${user.username}</h2>
      </div>
      <p>Saved breeds && Notes</p>
      <div>
        {user.savedBreeds?.map((breed) => {
          return <div>{breed.breedName}</div>;
        })}
      </div>
      <p>Notes</p>
      <div>Notes will go here when built out</div>
    </div>
  );
};

export default Dashboard;
