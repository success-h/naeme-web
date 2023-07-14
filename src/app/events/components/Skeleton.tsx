export function Skeleton() {
  return (
    <div
      data-aos="fade-up"
      className="card card-compact w-80 h-96 shadow-xl bg-gray-100 animate-pulse"
    >
      <figure className="h-20 w-full bg-gray-200 animate-pulse"></figure>
      <div className="card-body">
        <h2 className="card-title h-4 w-full bg-gray-200 animate-pulse"></h2>
        <p className="text-xs h-20 w-full bg-gray-200 animate-pulse"></p>

        <div className="card-actions h-10 justify-end text-gray-200  w-full bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
}
