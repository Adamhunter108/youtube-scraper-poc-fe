import { useState } from "react";

// const videos = [
//   {
//     videoId: "KtYJemz_pgo",
//     channelTitle: "WeMaxit Football",
//     image: "https://i.ytimg.com/vi/KtYJemz_pgo/default_live.jpg",
//     channelId: "UCbwH2qDT9aciRLeRTQNSLPA",
//     description:
//       "Nigeria vs Mali Live Stream | Super Eagles International Friendly | Watchalong Join this channel to get access to perks: ...",
//   },
//   {
//     videoId: "4tqtui_zcWk",
//     channelTitle: "Làm Handmade Thật Vui",
//     image: "https://i.ytimg.com/vi/4tqtui_zcWk/default.jpg",
//     channelId: "UCZmaiRFLzaUmhy2sxRnm0Jw",
//     description:
//       "FIRST TAKE | Stephen A. on Giants GM John Mara fears Barkley will lead Eagles to dominate NFC East.",
//   },
// ];

interface VideoResult {
  channelId: string;
  channelTitle: string;
  description: string;
  publishTime: string;
  thumbnailUrl: string;
  videoId: string;
  image: string;
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [excludeChannels, setExcludeChannels] = useState("");
  const [searchResults, setSearchResults] = useState<VideoResult[]>([]);

  const handleSearch = async () => {
    const baseURL = "/api/search";
    let endpoint = `${baseURL}?query=${encodeURIComponent(searchQuery)}`;

    if (excludeChannels) {
      const excludeParam = excludeChannels
        .split(",")
        .map((channel) => channel.trim())
        .join(",");
      endpoint += `&exclude=${encodeURIComponent(excludeParam)}`;
    }

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="px-10">
      <div className="">
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-200">
                Search YouTube Data API
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Searches are automatically saved in the database
              </p>
            </div>

            <form className="bg-white rounded-xl shadow-2xl ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="search"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Search
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="search"
                          id="search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="i.e.: Lil Wayne"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="channelId"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Exclude Channel Name{" "}
                      <span className="text-gray-400 ml-1">(Optional)</span>
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="channelId"
                          id="channelId"
                          value={excludeChannels}
                          onChange={(e) => setExcludeChannels(e.target.value)}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="i.e.: LilWayneVevo, DrakeVevo"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button
                  onClick={handleSearch}
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* ///////////////////////////////////////////////////// */}
        {/* Conditionally Render section if results and display results */}
        {/* ///////////////////////////////////////////////////// */}
        {searchResults && (
          <div className="rounded-xl mt-6 mb-6 overflow-hidden bg-white shadow-2xl sm:rounded-lg">
            <div className="px-4 py-6 sm:px-6">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Search Results
              </h3>
            </div>
            <div className="border-t border-gray-100">
              {searchResults.map((video, index) => (
                <div key={index}>
                  <dl className="divide-y divide-gray-100">
                    <div className="ml-6 mt-3 mb-2 h-11 w-11 flex-shrink-0">
                      <img
                        className="h-11 w-11 rounded-md"
                        src={video.image}
                        alt=""
                      />
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-900">
                        Video ID
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {video.videoId}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-900">
                        Channel Title
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {video.channelTitle}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-900">
                        Channel ID
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {video.channelId}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-900">
                        Description
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {video.description}
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        )}

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
  );
}
