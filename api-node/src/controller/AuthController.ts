import { validate } from 'class-validator';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

class AuthController {
  static login = async (rep: Request, res: Response) => {
    const { username, password } = rep.body;
    if (!(username && password)) {
      return res
        .status(400)
        .json({ message: 'Username & password are required!' });
    }

    const userRepository = AppDataSource.getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail({
        where: {
          username: username,
        },
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Username or password incorrect!' });
    }

    if (!user.checkPassword(password)) {
      return res
        .status(400)
        .json({ message: 'Username or password incorrect!' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '180000' }
    );
    const tokenRefresh = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecretRefresh,
      { expiresIn: '180000' }
    );

    user.refreshToken = tokenRefresh;
    try {
      await userRepository.save(user);
    } catch (error) {
      return res.status(400).json({ message: 'Somethings goes wrong' });
    }

    res.json({ message: 'OK', token, tokenRefresh, role: user.role });
  };

  static changePassword = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      return res
        .status(400)
        .json({ message: 'Old password & new password are required!' });
    }

    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { id: userId } });
    } catch (error) {
      return res.status(400).json({ message: 'Not found' });
    }

    if (!user.checkPassword(oldPassword)) {
      return res.status(401).json({ message: 'Check your old password' });
    }

    user.password = newPassword;
    const errors = await validate(user, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    user.hashPassword();
    userRepository.save(user);
    return res.status(200).json({ message: 'Password change!' });
  };

  static refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.headers.refresh as string;

    if (!refreshToken) {
      res.status(400).json({ message: 'Somethings goes wrong' });
    }

    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      const verifyResult = jwt.verify(refreshToken, config.jwtSecretRefresh);
      const { username } = verifyResult as User;

      user = await userRepository.findOneOrFail({
        where: {
          username: username,
        },
      });
    } catch (error) {
      return res.status(400).json({ message: 'Somethings goes wrong', error });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '120' }
    );

    res.json({ message: 'OK', token });
  };
}
export default AuthController;
