import { useRouter } from "next/router";
import { useUser } from "../components/UserContext";

export default function Profile() {
  const { user, token, loading } = useUser();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  // Fetch user-specific data using the token
  // const userData = await fetchUserData(token);

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <p>This is your unique page with token: {token}</p>
      {/* Display user-specific data */}
    </div>
  );
}
