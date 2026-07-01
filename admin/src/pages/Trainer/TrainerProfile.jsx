import React, { useContext, useEffect, useState } from 'react';
import { TrainerContext } from '../../context/TrainerContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const TrainerProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(TrainerContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/trainer/update-profile`,
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  return profileData && (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-8">

        {/* Profile Image and Edit/Save Button */}
        <div className="flex flex-col items-center text-center gap-4">
          <img
            src={profileData.image}
            alt={profileData.name}
            className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full border-4 border-orange-400 shadow"
          />

          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-6 py-2 text-sm font-medium border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-6 py-2 text-sm font-medium border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition"
            >
              Edit
            </button>
          )}
        </div>

        {/* Profile Info */}
        <div className="md:col-span-2 space-y-5 text-gray-800">
          {/* Name and Training Type */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">{profileData.name}</h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {profileData.degree} - {profileData.speciality}
            </p>
            <span className="inline-block bg-orange-100 mt-2 px-3 py-1 text-sm rounded-full font-medium text-orange-700">
              {profileData.experience} Years Experience
            </span>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-1">About</h3>
            {isEdit ? (
              <textarea
                rows={5}
                className="w-full border border-gray-300 rounded-lg p-2 outline-orange-400"
                value={profileData.about}
                onChange={(e) => {
                  setProfileData((prev) => ({ ...prev, about: e.target.value }));
                }}
              />
            ) : (
              <p className="text-gray-600 text-sm sm:text-base">{profileData.about}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-lg mb-1">Address</h3>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={profileData.address.line1}
                  onChange={(e) =>
                    setProfileData(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }))
                  }
                  placeholder="Line 1"
                />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={profileData.address.line2}
                  onChange={(e) =>
                    setProfileData(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
                    }))
                  }
                  placeholder="Line 2"
                />
              </div>
            ) : (
              <p className="text-gray-600 text-sm sm:text-base">
                {profileData.address.line1} <br />
                {profileData.address.line2}
              </p>
            )}
          </div>

          {/* Fees and Availability */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Session Fee</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    className="border border-gray-300 rounded-md p-1 w-24"
                    value={profileData.fees}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                  />
                ) : (
                  profileData.fees
                )}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                checked={profileData.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
              />
              <label className="text-gray-700 text-sm">Available for Sessions</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
