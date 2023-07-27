"use client";
import { EventDataTypes } from "../../../typings";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiSearch } from "react-icons/fi";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function HeroSwiper({ data }: { data: EventDataTypes[] }) {
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();
  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (inputValue) router.push(`/events?search=${inputValue}`);
  };
  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={true}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop
      >
        {data
          ?.filter((i) => i.featured === true)
          .map((item: EventDataTypes) => (
            <SwiperSlide key={item.id}>
              <div>
                <div className="bg-[#000000d0] z-10 h-full w-full flex-col flex items-start justify-center absolute">
                  <div className="max-w-[960px] mt-14 sm:mt-0 px-12 w-full lg:ml-40">
                    <p className="text-secondary text-sm sm:text-lg">
                      {moment(item.start_date).format("MMMM Do YYYY.")} at{" "}
                      {moment(item.start_time, "HH:mm:ss").format("hh:mm A")}
                    </p>
                    <h1 className="text-3xl sm:text-6xl font-bold text-white">
                      {item.title.slice(0, 8).toUpperCase()}
                      <span className="text-primary">
                        {item.title.slice(8).toUpperCase()}
                      </span>
                    </h1>
                    <p className="text-start hidden sm:block text-gray-300 mt-3">
                      {item.description.slice(0, 300)}...
                    </p>
                    <Link href={`event/${item.id}`}>
                      <button className="btn px-10 rounded-full bg-emerald-400 mt-4">
                        Buy Tickets
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="h-96 sm:h-[700px]">
                  <Image
                    alt="image"
                    src={item.image}
                    className="w-full object-cover object-top"
                    layout="fill"
                    priority
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="px-4 w-full">
        <form
          // @ts-ignore
          onSubmit={handleSubmit}
          className="flex sm:border-2 rounded-full absolute right-0 left-0 mt-5 sm:-mt-32 z-20 border-primary items-center px-4 py-1 bg-white max-w-sm lg:max-w-lg mx-auto  h-14 w-full"
        >
          <span className="mr-4">
            <FiSearch size={24} />
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="h-full w-full outline-none rounded-4xl text-lg"
            placeholder="Quick search events"
          />
        </form>
      </div>
    </>
  );
}
