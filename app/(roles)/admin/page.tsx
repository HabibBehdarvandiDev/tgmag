import { cookies } from "next/headers";

const AdminPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");


  return <div>AdminPage</div>;
};

export default AdminPage;
