import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserController {
  static getAll = async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User);
    let users: User[];

    try {
      users = await userRepository.find();
    } catch (error) {
      return res.status(404).json({ message: "Not user results!" });
    }

    if (users.length > 0) {
      return res.send(users);
    } else {
      return res.status(404).json({ message: "Not result!" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);

    try {
      const user = await userRepository.findOneOrFail({
        where: {
          id: Number(id),
        },
      });
      return res.send(user);
    } catch (error) {
      return res.status(404).json({ message: "Not result!" });
    }
  };

  static newUser = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    const user = new User();

    user.username = username;
    user.password = password;
    user.role = role;

    const errors = await validate(user, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const userRepository = AppDataSource.getRepository(User);

    try {
      user.hashPassword();
      await userRepository.save(user);
    } catch (error) {
      return res.status(409).json({ message: "User name alredy exist" });
    }

    return res.send("User create!");
  };

  static editUser = async (req: Request, res: Response) => {
    let user;
    const { id } = req.params;
    const { username, password, role } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    try {
      user = await userRepository.findOneOrFail({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username;
    user.password = password;
    user.role = role;

    const errors = await validate(user, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      await userRepository.save(user);
    } catch (error) {
      return res.status(409).json({ message: "User name alredy in use" });
    }

    return res.send("User update!");
  };

  static deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      return res.status(404).json({ message: "User not found" });
    }

    userRepository.delete(id);
    return res.status(201).json({ message: "User deleted!" });
  };
}
export default UserController;
