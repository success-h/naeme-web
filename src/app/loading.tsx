export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-md">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
}
