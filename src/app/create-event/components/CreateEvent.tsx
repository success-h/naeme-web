"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import InputData from "./data.json";

import Select from "react-select";

import Link from "next/link";
import { getCategory } from "@/app/functions/functions";
import api from "../../../../api";
import { useUserContext } from "@/hooks/useUser";
type Category = {
  value: string | null;
  label: string | null;
};
type FAQ = {
  question: string;
  answer: string;
};
type DefaultValues = {
  title: string;
  description: string;
  end_time: string;
  start_time: string;
  end_date: string;
  start_date: string;
  country: string;
  state: string;
  city: string;
  venue: string;
  website: string;
  terms: string;
};

function CreateEventComponent({ access }: { access: string | undefined }) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [err, setErr] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [category, setCategory] = useState<Category[] | undefined>([]);

  const [eventCategory, setEventCategory] = useState<Category | null>(
    {} as Category
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const category = await getCategory();
      if (category) {
        setCategory(
          category?.map((item: any) => ({
            value: item?.id,
            label: item?.name,
          }))
        );
      }
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      end_time: "",
      start_time: "",
      end_date: "",
      start_date: "",
      country: "",
      state: "",
      city: "",
      venue: "",
      website: "",
      terms: "",
    },
  });

  const onSubmit = async (data: DefaultValues) => {
    //@ts-ignore
    const image = selectedFile.target.files[0];
    console.log("calles", image);
    if (!image) {
      setErr("Image required");
      return;
    }
    if (!user?.email) {
      router.push("/signin");
      return;
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", image); //@ts-ignore

    formData.append("category", eventCategory.label);
    formData.append("country", data.country);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("venue", data.venue);
    formData.append("start_date", data.start_date);
    formData.append("end_date", data.end_date);
    formData.append("start_time", data.start_time);
    formData.append("end_time", data.end_time);
    formData.append("website", data.website);
    formData.append("owner", user?.id);
    formData.append("organizer", user.name);
    formData.append("terms", data.terms);

    if (access) {
      setLoading(true);
      try {
        const response = await api.post("/events/", formData, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${access}`,
          },
        });

        const data = await response.data;
        setLoading(false);
        if (response.status == 201) {
          const { id } = data;

          router.push(`/create-event/${id}`);
          setLoading(false);
        } else {
          setLoading(false);
          // console.log(data);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        return error;
      }
    } else {
      router.push("/signin");
    }
  };

  //@ts-ignore

  function errorChecker(e) {
    console.log({ e });
  }
  return (
    <div className="max-w-screen-lg grid mx-auto">
      <div className="mt-32 sm:px-10 px-7">
        <>
          <h1 className="text-3xl mt-10 font-sans font-bold text-secondary">
            Start Your Event
          </h1>
          <form
            className="grid m-auto mt-10"
            onSubmit={handleSubmit(onSubmit, errorChecker)}
          >
            <div className="mb-5 flex flex-col md:gap-28 justify-between md:flex-row">
              <div className="flex flex-1 mb-10 lg: flex-col">
                <label className="text-sm semi-bold">Event Type</label>
                <div className="flex mt-4 flex-col ">
                  <Select
                    options={category}
                    placeholder="Categories"
                    onChange={(value: any) => {
                      return setEventCategory({
                        value: value.value,
                        label: value.label,
                      });
                    }}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col">
                <label className="text-sm semi-bold mb-2">Title</label>
                <div className="flex flex-col mb-4">
                  <input
                    className={`${
                      errors.title
                        ? "border-red-500"
                        : "border-gray-300 text-lg"
                    } outline-none border p-4 text-sm h-10 rounded-[6px] bg-none my-2`}
                    type="text"
                    placeholder="let people know who is organizing"
                    {...register("title", { required: true })}
                  />
                </div>
              </div>
            </div>
            <div className="py-4 rounded-lg">
              <label className="text-sm semi-bold">Event Description</label>
              <div className="flex flex-col mb-4 ">
                <textarea
                  placeholder="Tell people about your event"
                  {...register("description", { required: true })}
                  className={`outline-none text-sm p-4 h-28 rounded-lg sm:h-44  bg-none my-2 text-gray-600 bg-gray-100 ${
                    errors.description ? "border border-red-500" : " text-lg"
                  }`}
                />
              </div>
            </div>
            {/* location of event */}
            <hr className="my-10" />
            <div className="">
              <div className="font-bold mb-7">Location</div>
              <div className="mb-5 flex flex-col md:gap-x-28 justify-between md:grid grid-cols-2">
                {InputData.CountryVenueData.map((item) => (
                  <div key={item.id} className="flex flex-1 mb-10 lg: flex-col">
                    <label className="text-sm semi-bold mb-2">
                      {item.label}
                    </label>
                    <div className="flex flex-col mb-4">
                      <input
                        className={`${
                          // @ts-ignore
                          errors[item.inputName]
                            ? "border border-red-500"
                            : "text-lg"
                        } outline-none font-light bg-gray-100 p-4 text-sm h-10 rounded-3xl bg-none my-2`}
                        type={item.type}
                        placeholder={item.placeholder}
                        // @ts-ignore
                        {...register(`${item.inputName}`, { required: true })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr className="my-10" />

            {/* date and time of event */}
            <div className="">
              <div className="font-bold mb-7">Date and Time</div>
              <div className="mb-5 flex flex-col md:gap-x-28 justify-between md:grid grid-cols-2">
                {InputData.DateTimeInputData.map((item) => (
                  <div key={item.id} className="flex flex-1 mb-10 lg: flex-col">
                    <label className="text-sm semi-bold mb-2">
                      {item.label}
                    </label>
                    <div className="flex flex-col mb-4">
                      <input
                        className={`${
                          // @ts-ignore
                          errors[item.inputName]
                            ? "border border-red-500"
                            : "text-lg"
                        } bg-gray-100 outline-none p-4 text-sm h-10 rounded-3xl bg-none my-2`}
                        type={item.type}
                        // @ts-ignore
                        {...register(`${item.inputName}`, { required: true })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-10" />
            <div className="my-5 mt-12 flex flex-col md:gap-x-28 gap-y-3 justify-between md:grid grid-cols-2">
              <div className="mt-2">
                <div className="font-bold mb-7">Upload Event Image</div>
                <div className="flex items-center justify-between rounded-3xl bg-[#f4f4f4] px-4 py-2">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      //@ts-ignore
                      setSelectedFile(event);
                    }}
                    ref={fileInputRef}
                  />
                  <p className="ml-4">
                    {selectedFile ? "Image selected" : "No file selected"}
                  </p>
                  <button
                    className="px-4 py-1 bg-primary rounded-2xl text-white hover:bg-secondary"
                    onClick={(e) => {
                      e.preventDefault(); //@ts-ignore

                      fileInputRef?.current?.click();
                    }}
                  >
                    Browse
                  </button>
                </div>
              </div>
              <div className="">
                <div className="flex flex-col mb-4">
                  <div className="font-bold mb-7 mt-4 md:mt-0">Useful Link</div>
                  <input
                    className={`${
                      errors.website
                        ? "border border-red-500"
                        : "bg-[#f4f4f4] text-lg"
                    } bg-gray-100 outline-none p-4 text-sm h-12 rounded-3xl bg-none my-2`}
                    type="url"
                    placeholder="let people know who is organizing"
                    {...register("website", { required: false })}
                  />
                </div>
              </div>
            </div>
            <div className="py-4 rounded-lg">
              <label className="font-bold bg-gray-100">
                Terms and Conditions
              </label>
              <div className="flex flex-col my-4 ">
                <textarea
                  placeholder="Terms and conditions for this event"
                  {...register("terms")}
                  className={`outline-none text-sm p-4 h-28 rounded-3xl sm:h-44  bg-none my-2 text-gray-600 ${
                    errors.terms
                      ? "border border-red-500"
                      : "bg-gray-100 text-lg"
                  }`}
                />
              </div>
            </div>

            <div className="items-center space-x-4 flex flex-row">
              <input
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                type="checkbox"
                name=""
                id=""
              />
              <p>
                By clicking checked you{" "}
                <span className="text-secondary font-bold">AGREE</span> to our{" "}
                <Link href="/terms-of-use">
                  <span>Terms of Use</span>
                </Link>
              </p>
            </div>
            {user && (
              <div
                className={`flex mb-40 items-center cursor-pointer justify-center py-2 rounded-sm my-10 mt-20`}
              >
                {loading ? (
                  <span className="loading loading-dots loading-lg"></span>
                ) : (
                  <button
                    type="submit"
                    disabled={agreeToTerms ? false : true}
                    className={` btn bg-black hover:bg-gray-400 w-full ${
                      !agreeToTerms ? " cursor-not-allowed" : "text-white"
                    }`}
                  >
                    Create event
                  </button>
                )}
              </div>
            )}

            {!user && (
              <Link
                href={"/signin"}
                className={` btn my-5 bg-black hover:bg-gray-400 w-full text-white`}
              >
                Please sign in to continue
              </Link>
            )}
          </form>
        </>
      </div>
    </div>
  );
}

export default CreateEventComponent;
