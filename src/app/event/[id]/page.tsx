import { getEvent } from "@/app/functions/functions";
import { EventDetail } from "./components/EventDetail";

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}) {
  console.log({ params });
  try {
    return;
    const post = await getEvent(params.id);
    if (!post)
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };

    return {
      title: post.title,
      description: post.description,
      alternates: {
        canonical: `/post/${post.slug}`,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}
export default async function page({ params }: { params: { id: string } }) {
  const data = await getEvent(params.id);
  return (
    <div className="mx-auto max-w-screen-xl min-h-screen pt-20">
      <EventDetail {...data} />
    </div>
  );
}
