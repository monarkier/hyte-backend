import bcrypt from 'bcryptjs';
import {
  insertUser,
  selectAllUsers,
  selectUserById,
  removeUser,
} from '../models/user-model.js';
import {customError} from '../middlewares/error-handler.js';

// kaikkien käyttäjätietojen haku
const getUsers = async (req, res) => {
  // in real world application, password properties should never be sent to client
  const users = await selectAllUsers();
  res.json(users);
};

// Userin haku id:n perusteella
const getUserById = async (req, res, next) => {
  console.log('getUserById', req.params.id);

  try {
    const user = await selectUserById(req.params.id);
    console.log('User found:', user);
    // jos user löytyi, eli arvo ei ole undefined, lähetetään se vastauksena
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    next(error);
  }
};

// käyttäjän lisäys (rekisteröinti)
// lisätään parempi virheenkäsittely myöhemmin
const addUser = async (req, res, next) => {
  console.log('addUser request body', req.body);
  // esitellään 3 uutta muuttujaa, johon sijoitetaan req.body:n vastaavien propertyjen arvot
  const {username, password, email} = req.body;
  // luodaan selväkielisestä sanasta tiiviste, joka tallennetaan kantaan
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // luodaan uusi käyttäjä olio ja lisätään se tietokantaa käyttäen modelia
  const newUser = {
    username,
    password: hashedPassword,
    email,
  };
  try {
    const result = await insertUser(newUser);
    res.status(201);
    return res.json({message: 'User added. id: ' + result});
  } catch (error) {
    return next(customError(error.message, 400));
  }
};

// Userin poisto id:n perusteella (TODO: käytä DB)
const deleteUser = async (req, res, next) => {
  console.log('deleteUser', req.params.id);
  const userId = req.params.id;
  try {
    const user = await selectUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const success = await removeUser(userId);
    if (success) {
      res.json({ message: 'User deleted.' });
    } else {
      res.status(500).json({ message: 'Failed to delete user.' });
    }
  } catch (error) {
    next(error);
  }

};

export {getUsers, getUserById, addUser, deleteUser};
