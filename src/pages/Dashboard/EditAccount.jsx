import React, { useContext, useState } from "react";
import { InputField } from "../../components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountDetails } from "../../store/asyncThunks/accountThunk";
import loadingSpinner from '../../assets/LoadingSpinner.svg'
import { toast } from "react-toastify";
import { displayContext } from "../../context/displayContext";

function EditAccount() {
    const { handleSubmit, register, watch, formState: { errors }, setValue, setError } = useForm();
    const { userData } = useSelector((state) => state.auth)
    const { loading } = useSelector(state => state.account)

    const { options } = useContext(displayContext)

    const [avatarImg, setAvatarImg] = useState(userData?.avatar);
    const [coverImg, setCoverImg] = useState(userData?.coverImg);
    const dispatch = useDispatch()

    const watchFullName = watch("fullName");
    const watchUsername = watch("username");
    const watchAvatar = watch("avatar");
    const watchCover = watch("coverImage");

    const disabled = ((!watchFullName || watchFullName === userData?.fullName) && (!watchUsername || watchUsername === userData?.username) && (avatarImg === userData?.avatar) && (coverImg === userData?.coverImage))

    React.useEffect(() => {
        if (watchAvatar && watchAvatar[0]) {
            const file = watchAvatar[0];
            const reader = new FileReader();
            reader.onload = () => setAvatarImg(reader.result);
            reader.readAsDataURL(file);
        }
        if (watchCover && watchCover[0]) {
            const file = watchCover[0];
            const reader = new FileReader();
            reader.onload = () => setCoverImg(reader.result);
            reader.readAsDataURL(file);
        }
    }, [watchAvatar, watchCover]);

    React.useEffect(() => {
        setAvatarImg(userData?.avatar)
        setCoverImg(userData?.coverImage)
    }, [userData?.avatar, userData?.coverImage, userData])

    const onSubmit = async (data) => {
        data = {
            fullName: (data.fullName !== userData?.fullName) ? data.fullName : null,
            username: (data.username !== userData?.username) ? data.username : null,
            avatar: data.avatar ? data.avatar : null,
            sameCover: (coverImg === userData?.coverImage),
            coverImage: data.coverImage ? data.coverImage : null,
        }

        try {
            await dispatch(updateAccountDetails(data)).unwrap()
            toast.success(<p className='font-sans font-semibold'>Changes have been made.</p>, options);
        } catch (error) {
            setError(error.name, {
                type: 'manual',
                message: error.message
            })
        }
    };
    if (!userData) return

    return (
        <>
            <div className="w-full h-full px-4">
                {/* <h1 className="text-3xl text-center font-bold mb-5 underline font-sans ">Edit Your Account Details</h1> */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    {/* Full Name Input */}
                    <InputField
                        label="Full Name"
                        type="text"
                        required={false}
                        defaultValue={userData?.fullName}
                        register={register}
                        registerAs="fullName"
                        errors={errors}
                        placeholder="Enter full name"
                        fieldInfo="This is the name that will be shown as your channel name across the Platform."
                    />

                    {/* Username Input */}
                    <InputField
                        label="Username"
                        type="text"
                        required={false}
                        defaultValue={userData?.username}
                        register={register}
                        registerAs="username"
                        errors={errors}
                        placeholder="Enter your username"
                        fieldInfo="This username will uniquely identify your channel on this Platform."
                    />

                    {/* Profile Photo Input */}
                    <div className="flex gap-x-2 items-center mt-8">
                        <div
                            className='w-36 aspect-square flex relative border rounded-md bg-cover bg-no-repeat bg-center'
                            style={{ backgroundImage: `url(${avatarImg || "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"})` }}
                            onClick={() => document.getElementById('avatar').click()}
                        >
                            <label htmlFor="avatar" className="absolute -top-6 text-blue-600 text-nowrap">Profile Image</label>

                            <InputField
                                // label="Profile Photo"
                                id="avatar"
                                type='file'
                                accept="image/*"
                                required={!avatarImg}
                                register={register}
                                registerAs="avatar"
                                errors={errors}
                                className="hidden"
                            />
                        </div>
                        <div className="">
                            <p className="text-gray-500 text-sm">Choose a Profile image for your channel. <br /> Size Should be 800 X 800 and of 5MB or less. </p>
                            {/* <button
                                type="button" 
                                className="text-blue-600 disabled:text-gray-700"
                                onClick={() => {
                                     setAvatarImg("")
                                     setValue("avatar", null) 
                                }}
                                disabled={!avatarImg}
                            >Change</button> */}
                        </div>
                    </div>

                    {/* Cover Photo Input */}
                    <div className="flex gap-x-2 items-center mt-8">
                        <div
                            className='w-72 aspect-[16/5] flex relative border rounded-md bg-cover bg-no-repeat bg-center'
                            style={{ backgroundImage: `url(${coverImg || "https://www.chennaivolunteers.org/wp-content/themes/finbuzz/assets/img/noimage_1210X584.jpg"})` }}
                            onClick={() => document.getElementById('coverImage').click()}
                        >
                            <label htmlFor="avatar" className="absolute -top-6 text-blue-600 text-nowrap">Cover Image</label>

                            <InputField
                                // label="Profile Photo"
                                id="coverImage"
                                type='file'
                                accept="image/*"
                                required={false}
                                register={register}
                                registerAs="coverImage"
                                errors={errors}
                                className="hidden"
                            />

                        </div>
                        <div className="">
                            <p className="text-gray-500 text-sm ">Choose a cover image for your channel. <br /> Size Should be 2560 x 1440 and of 5MB or less. </p>
                            <button
                                type="button"
                                className="text-red-600 disabled:text-gray-700"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCoverImg("")
                                    setValue("coverImage", null)
                                }}
                                disabled={!coverImg}
                            >Remove</button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="my-8 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        disabled={disabled || loading}
                    >
                        {loading ? <img src={loadingSpinner} alt="" className="w-12 mx-auto -my-3" /> : "Save Changes"
                        }
                    </button>
                </form>
            </div>
        </>
    );
}

export default EditAccount;