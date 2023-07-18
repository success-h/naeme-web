"use client";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
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
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out-cubic" });
    AOS.refresh();
  }, []);
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
      <div className="w-full h-[500px] lg:h-[400px] relative">
        <div className="bg-[#000000c2] z-20 h-full w-full flex-col flex items-start justify-center absolute">
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-screen-xl px-4 md:px-20 py-10 w-full h-full mx-auto">
            <div className="">
              <h2
                data-aos="fade-up"
                className="text-3xl md:text-5xl text-white"
              >
                Planing to{" "}
                <span className="text-emerald-300 font-bold">
                  {" "}
                  host an event?
                </span>
              </h2>
              <p data-aos="fade-up" className="text-white max-w-xl mt-4 w-full">
                Why create an event with us? we offer a seamless experience with
                event creation and a{" "}
                <span className="text-emerald-300">Unique QR-Code</span> you can
                share to attendees to scan and access your event directly. We
                also have a secure fraud agnostic system for an event organizer
                to validate tickets.
              </p>
              <Link
                href="/terms-of-use"
                data-aos="fade-up"
                className="text-orange-300 font-extralight mt-10 cursor-pointer"
              >
                Conditions apply*
              </Link>
            </div>
            <Link
              prefetch={true}
              href="/create-event"
              data-aos="fade-up"
              className="mt-10"
            >
              <button className="btn px-10 py-4 rounded-full border text-primary hover:text-white hover:border-white border-primary">
                Create an event
              </button>
            </Link>
          </div>
        </div>
        <Image
          src={"/banner.jpg"}
          layout="fill"
          objectFit="cover"
          alt="banner"
          className="w-full"
        />
      </div>
    </>
  );
}
