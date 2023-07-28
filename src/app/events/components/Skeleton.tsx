export function Skeleton() {
  return (
    <div
      data-aos="fade-up"
      className="card card-compact w-full max-w-96 h-80 pb-4 animate-pulse rounded-3xl"
    >
      <figure className="h-40 w-full bg-gray-200 animate-pulse"></figure>
      <h2 className="ml-4 card-title h-10 my-5 w-4/5 bg-gray-200 animate-pulse"></h2>
      <p className="ml-4 h-6 my-5 w-3/5 bg-gray-200 animate-pulse"></p>

      <div className="ml-4 w-2/5 h-4 text-gray-200 bg-gray-200 animate-pulse"></div>
    </div>
  );
}
