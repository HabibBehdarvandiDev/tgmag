import prisma from "@/db/db";
import WritersTable from "./(table)/WritersTable";

const WritersPage = async () => {
  // Fetch data from the database
  const writers = await prisma.users.findMany({
    where: {
      role_id: 2,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      role_id: true,
      email: true,
      phone_number: true,
      is_active: true,
      is_verified: true,
      created_at: true,
    },
  });

  return (
    <div className="flex flex-col gap-4">

      <WritersTable writers={writers} />
    </div>
  );
};

export default WritersPage;
