import { generateStreamToken, streamClient } from '../config/stream.js';
import User from '../models/userModel.js';  
import trainerModel from '../models/trainerModel.js';  


export async function getStreamToken(req, res) {
  try {
    const userId = req.body.userId; // from auth middleware
    const targetUserId = req.query.targetUserId; // from URL

    // Fetch current user from User model
    const currentUser = await User.findById(userId);

    // Fetch target user from trainerModel first, fallback to User model
    let targetUser = await trainerModel.findById(targetUserId);
    if (!targetUser) {
      targetUser = await User.findById(targetUserId);
    }

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Upsert both users to Stream (with name and image)
    await streamClient.upsertUsers([
      {
        id: currentUser._id.toString(),
        name: currentUser.name || "User",
        image: currentUser.image || "",
      },
      {
        id: targetUser._id.toString(),
        name: targetUser.name || "User",
        image: targetUser.image || "",
      },
    ]);

    console.log("Upserted users to Stream:", {
      currentUser: {
        id: currentUser._id.toString(),
        name: currentUser.name,
        image: currentUser.image,
      },
      targetUser: {
        id: targetUser._id.toString(),
        name: targetUser.name,
        image: targetUser.image,
      },
    });

    const token = generateStreamToken(userId);
    res.status(200).json({ token });

  } catch (error) {
    console.error("Error in getStreamToken controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getStreamTokenForTrainer(req, res) 
{
  try 
  {
    const trainerId = req.body.trainerId; // from authTrainer middleware
    const targetUserId = req.query.targetUserId; // client ID from URL query

    // Fetch authenticated trainer
    const currentTrainer = await trainerModel.findById(trainerId);

    // Fetch target client from User model
    const targetUser = await User.findById(targetUserId);

    if (!currentTrainer || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Upsert both users into Stream
    await streamClient.upsertUsers([
      {
        id: currentTrainer._id.toString(),
        name: currentTrainer.name || "Trainer",
        image: currentTrainer.image || "",
      },
      {
        id: targetUser._id.toString(),
        name: targetUser.name || "User",
        image: targetUser.image || "",
      },
    ]);

    console.log("Upserted trainer and user to Stream:", {
      currentTrainer: {
        id: currentTrainer._id.toString(),
        name: currentTrainer.name,
        image: currentTrainer.image,
      },
      targetUser: {
        id: targetUser._id.toString(),
        name: targetUser.name,
        image: targetUser.image,
      },
    });

    const token = generateStreamToken(trainerId);
    res.status(200).json({ token });

  } 
  catch (error) 
  {
    console.error("Error in getStreamTokenForTrainer controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



export async function getStreamTokenVideoUser(req, res) 
{

    try 
    {

        const token = generateStreamToken( req.body.userId );

        res.status(200).json({ token });

    } 

    catch (error) 
    {

        console.log("Error in getStreamToken controller:", error.message);

        res.status(500).json({ message: "Internal Server Error" });

    }

}

export async function getStreamTokenVideoTrainer(req, res) 
{

    try 
    {

        const token = generateStreamToken( req.body.trainerId );

        res.status(200).json({ token });

    } 

    catch (error) 
    {

        console.log("Error in getStreamToken controller:", error.message);

        res.status(500).json({ message: "Internal Server Error" });

    }

}
