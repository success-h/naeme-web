"use client";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Card } from "../events/components/Card";
import { EventDataTypes } from "../../../typings";

export function FeaturedEvents({ data }: { data: EventDataTypes[] }) {
  return (
    <div className="pb-10 max-w-6xl mx-auto w-full">
      <div className="mt-14 px-7 flex justify-between items-center">
        <h2 data-aos="fade-up" className="font-bold text-lg sm:text-2xl">
          Featured Event
        </h2>
        <div data-aos="fade-up" className="pl-7 flex justify-end items-center">
          <Link href="/events/">
            <button className="btn">See More</button>
          </Link>
        </div>
      </div>
      <div className="hidden md:grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center">
        {data?.slice(0, 9).map((event) => (
          <div data-aos="fade-up" key={event.id}>
            <Card event={event} />
          </div>
        ))}
      </div>
      <div data-aos="fade-up" className="py-10 md:hidden mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={true}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          loop
          // navigation
        >
          {data?.slice(0, 9).map((event) => (
            <div key={event.id}>
              <SwiperSlide key={event.id}>
                <div className=" grid place-content-center my-10">
                  <Card data-aos="fade-up" event={event} />
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
