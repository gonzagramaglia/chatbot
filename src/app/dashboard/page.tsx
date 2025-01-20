import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  return (
    <>
      <div>Text1</div>
      <div>{user.family_name}</div>
      <div>Text2</div>
    </>
  );
};

export default Page;
