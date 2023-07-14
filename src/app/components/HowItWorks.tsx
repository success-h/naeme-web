import { useUserContext } from "@/hooks/useUser";
import Image from "next/image";

export const imageUrl = [
  {
    id: 1,
    url: "/events.png",
    title: "Events",
  },
  {
    id: 2,
    url: "/sports.png",
    title: "Sports",
  },
  {
    id: 3,
    url: "/plays.png",
    title: "Plays",
  },
  {
    id: 4,
    url: "/activities.png",
    title: "Activities",
  },
  {
    id: 5,
    url: "/festivals.png",
    title: "Festivals",
  },
  {
    id: 6,
    url: "/miscellaneous.png",
    title: "Miscellaneous",
  },
];

export default function HowItWorks() {
  return (
    <>
      <div className="justify-between grid grid-cols-2 sm:grid-cols-3 md:flex gap-10 md:flex-wrap  px-4 lg:px-0 my-20 mx-auto max-w-[1038px]">
        {imageUrl.map((i) => (
          <div
            data-aos="fade-up"
            key={i.id}
            className="flex flex-col items-center justify-center"
          >
            <Image alt="" className="" height={110} width={110} src={i.url} />
            <p className="text-xs sm:text-sm mt-3">{i.title}</p>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto w-full flex flex-col-reverse sm:grid sm:grid-cols-2">
        <div data-aos="fade-up" className="justify-center flex">
          <Image
            alt=""
            width={433}
            height={585}
            className=""
            src="/qrcode.png"
          />
        </div>
        <div className="px-10 flex flex-col items-center sm:items-start justify-center">
          <h1
            data-aos="fade-up"
            className="max-w-[445px] text-2xl leading-tight sm:text-start sm:text-4xl text-primary font-extrabold"
          >
            The days of papers and cardboard events are long gone.
          </h1>

          <ul className="mt-7 max-w-[445px]">
            <li data-aos="fade-up" className="mb-6">
              <p>
                We provide you easy access to events through our QR Code system.
                You no longer need to type out a url to be able to access an
                event details.
              </p>
            </li>
            <li data-aos="fade-up">
              <p>
                Easily validate the authenticity of a ticket by scanning it
                through our secure{" "}
                <span className="text-secondary">fraud agnostic</span> system,
                as an event organizer.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
