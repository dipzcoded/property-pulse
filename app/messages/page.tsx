import MessageServer from "@/components/Message/MessageServer";
import { Suspense } from "react";
import LoadingPage from "../loading";
import { getSession } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";

export default async function MessagesPage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/");
  }
  // @ts-ignore
  const userId: string = session.user.id;

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <Suspense fallback={<LoadingPage loading />}>
            <MessageServer userId={userId} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
