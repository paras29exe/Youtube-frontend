import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiVideoPlus } from "react-icons/bi";
import PlaylistStrip from "./playlistStrip";
import { useDispatch, useSelector } from "react-redux";
import { addVideosToSelectedPlaylist, createPlaylistAndAddVideos, getPlaylists } from "../../store/asyncThunks/playlistThunk";
import { MdAdd } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";
import { displayContext } from "../../context/displayContext";

export default function AddToPlaylistModal({ selectedVideos, closeModal }) {
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();

  const { userPlaylists, loading } = useSelector(state => state.playlists)
  const { userData } = useSelector(state => state.auth)
  const {options} = useContext(displayContext)
  const dispatch = useDispatch()

  const togglePlaylistSelection = (playlistId) => {
    setSelectedPlaylists((prev) =>
      prev.includes(playlistId) ? prev.filter((id) => id !== playlistId)
        : [...prev, playlistId]
    );
  };

  useEffect(() => {
    dispatch(getPlaylists(userData._id))
      .then(res => {
        // console.log(res.payload.data)
      })
  }, [])

  const handleAddVideos = async () => {
    try {
      const res = await dispatch(addVideosToSelectedPlaylist({ playlistIds: selectedPlaylists, videoIds: selectedVideos })).unwrap()
      toast.success(<p className='font-sans font-semibold'>Playlist Updated</p>, options);
      closeModal();
    } catch (error) {
      console.error(error)

    }
  };

  const handleCreatePlaylist = async (data) => {
    data = { ...data, videoIds: selectedVideos }
    try {
      await dispatch(createPlaylistAndAddVideos(data)).unwrap();
      toast.success(<p className='font-sans font-semibold'>Playlist created and Updated.</p>, options);
      closeModal()
      reset();
    } catch (error) {
      setError(error.name, {
        type: 'manual',
        message: error.message
    })
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center"
    // onClick={onClose}
    >
      <div
        className="bg-zinc-800 border border-zinc-600 rounded-md shadow-lg p-4 w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-lg mb-4 flex items-center justify-center gap-x-3">
          <BiVideoPlus /> Add video to...
        </h2>

        {creatingPlaylist ? (
          <form onSubmit={handleSubmit(handleCreatePlaylist)} className="flex flex-col gap-2">
            <input
              {...register("name", { required: "Playlist name is required" })}
              type="text"
              placeholder="Playlist Name"
              className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <textarea
              {...register("description", { required: "Playlist Description is required" })}
              placeholder="Playlist Description"
              className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

            <div className="flex justify-between">
              <button
                type="button"
                className="text-white bg-red-600 px-4 py-2 rounded-md"
                onClick={() => setCreatingPlaylist(false)}
              >
                Discard
              </button>
              <button
                type="submit"
                className="text-white bg-blue-600 px-4 py-2 rounded-md"
              >
                Create & Add Videos
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="max-h-60 overflow-y-auto">
              <div className='flex gap-x-2'>
                <button
                  onClick={() => setCreatingPlaylist(true)}
                  className='p-1 hover:bg-green-700/70 rounded-md transition-colors duration-200 mb-2 text-white flex items-center justify-center gap-2'>
                  <MdAdd className='text-lg' /> Create new playlist
                </button>

              </div>
              {
                userPlaylists?.length > 0 ? (
                  userPlaylists?.map((playlist) => (
                    <PlaylistStrip
                      key={playlist._id}
                      playlist={playlist}
                      togglePlaylistSelection={togglePlaylistSelection}
                      isSelected={selectedPlaylists.includes(playlist._id)}
                    />
                  ))
                ) : (
                  <p className="text-gray-400 text-sm text-center">No playlists available.</p>
                )}
            </div>
            <button
              type="button"
              className="mt-4 p-2 w-full text-sm text-white border border-zinc-600 rounded-md  bg-blue-700 hover:bg-blue-800 transition-colors duration-150 focus:outline-none disabled:bg-gray-500"
              onClick={() => handleAddVideos()}
              disabled={selectedPlaylists.length === 0}
            >
              {loading ? <CgSpinner className="animate-spin text-center mx-auto " /> : "Add selected Videos"}
            </button>
          </>
        )}

        <button
          type="button"
          className="mt-4 w-full text-sm text-white border border-zinc-600 rounded-md p-2 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
}
