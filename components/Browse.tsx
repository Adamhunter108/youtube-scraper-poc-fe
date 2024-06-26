import { useEffect, useState } from "react";

interface Video {
  channelId: string;
  channelTitle: string;
  description: string;
  publishTime: string;
  thumbnailUrl: string;
  videoId: string;
}

export default function Browse() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/browse");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        setError("Failed to fetch videos");
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteVideo = async (videoId: any) => {
    try {
      const response = await fetch("/api/delete-video", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      setVideos(videos.filter((video) => video.videoId !== videoId));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-4 px-10">
      <div className="">
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-200">
                Browse Database
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Past YouTube Data API search results
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-2xl ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 mb-6">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="my-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-300">
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {videos.map((video) => (
                            <tr key={video.channelTitle}>
                              <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                <div className="flex items-center">
                                  <div className="h-11 w-11 flex-shrink-0">
                                    <img
                                      className="h-11 w-11 rounded-md"
                                      src={video.thumbnailUrl}
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="font-medium text-gray-900">
                                      <span className="text-gray-500">
                                        Video ID:
                                      </span>{" "}
                                      {video.videoId}
                                    </div>
                                    <div className="mt-1 text-gray-900">
                                      <span className="text-gray-500">
                                        Channel Title:{" "}
                                      </span>
                                      {video.channelTitle}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                <a
                                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  View on YouTube
                                </a>
                              </td>
                              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                <button
                                  onClick={() => deleteVideo(video.videoId)}
                                  className="rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <svg
            viewBox="0 0 1024 1024"
            className="large-svg absolute bottom-1/2 -z-10 h-[64rem] w-[64rem] [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
