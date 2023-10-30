import express from "express";

import {
  getUsers,
  deleteUserById,
  updateUserById,
  getUserById,
} from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// delete user
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

// update user
export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username, email } = req.body;
    const { id } = req.params;

    if (!username || !email) {
      return res.sendStatus(400);
    }
    const user = await getUserById(id);
    // const updatedUser = await updateUserById(id, values);

    user.username = username;
    user.email = email;

    await user.save();

    return res.status(200).json(user);

    // return res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
