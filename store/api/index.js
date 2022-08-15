import axios from 'axios';
import { toast } from 'react-toastify';

export const useApi = () => {
  const subscribe = async (token, transactionHash, amount, to, period) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/subscribe`, {
        transactionHash,
        amount,
        to,
        period
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": token
        }
      });
      if (data.success) {
        toast.success(`Successfully registered`)
      } else {
        toast.error(`Registration failed.`)
      }
    } catch (err) {
      toast.error(err.message)
      console.log(err)
    }
  }

  const addNewPlayer = async (address) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/add_new_player`, {
        address: address
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
      if (data.success) {
        toast.success(`Loading...`)
      } else {
        toast.error(`Failed.`)
      }
      console.log(data);
    } catch (err) {
      toast.error(err.message)
      console.log(err)
    }
  }

  const createNewHostGame = async (_id, address, title, category, prize, players, privacy, spectator, when, startDate, image) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/new_host`, {
        _id, address, title, category, prize, players, privacy, spectator, when, startDate, image
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
      if (data.success) {
        toast.success(`Successfully saved hosting game.`)
        return data.result
      } else {
        toast.error(`Failed.`)
        return null;
      }
    } catch (err) {
      toast.error(err.message)
      console.log(err)
    }
  }

  const getUserProfile = async (token) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/get_profile`, {}, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": token
        }
      });
      if (data.success) {
        return data
      } else {
        return null;
      }
    } catch (err) {
      toast.error(err.message)
      console.log(err)
    }
  }

  const getAllHostGames = async (address) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/get_host_games`, {
        address: address
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
      if (data.success) {
        return data.result
      } else {
        toast.error('Failed to load all games.')
        return null;
      }
    } catch (err) {
      toast.error(err.message)
      console.log(err)
    }
  }

  const deleteHostGame = async (_id) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/delete_host_game`, {
        _id
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
      if (data.success) {
        toast.success('Successfully removed.')
      } else {
        toast.error('Failed to remove.')
      }
    } catch (err) {
      toast.error(err.message)
      console.log(err)
    }
  }

  return {
    subscribe,
    addNewPlayer,
    getUserProfile,
    createNewHostGame,
    getAllHostGames,
    deleteHostGame
  }
}