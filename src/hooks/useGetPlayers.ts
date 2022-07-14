import axios from "axios";
import { useState } from "react";
import { Player } from "../types/api/player";

export const useGetPlayers = () => {
  const [player, setPlayer] = useState<Array<Player>>([]);
  const [playerNext, setPlayerNext] = useState<Array<Player>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  // マンチェスターシティの選手スタッツを取得
  const getPlayers = () => {
    setLoading(true);
    setError(false);
    axios
      .get(process.env.NEXT_PUBLIC_API_URL, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": process.env.NEXT_PUBLIC_API_HOST,
            "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY
        }
      })
      .then((res) => {
        const playersLists = res.data?.response
        setPlayer(playersLists);
      })
      .catch(() => {
        setError(true); //エラー発生
      })
      .finally(() => {
        setLoading(false); //正常終了
      });
  };

  //TODO: getPlayersNext
  const getPlayersNext = () => {
    setLoading(true);
    setError(false);
    axios
    .get(process.env.NEXT_PUBLIC_API_URL_NEXT, {
      "method": "GET",
      "headers": {
          "x-rapidapi-host": process.env.NEXT_PUBLIC_API_HOST,
          "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY
      }
    })
      .then((res) => {
        const playersListsNext = res.data?.response
        setPlayerNext(playersListsNext);
      })
      .catch(() => {
        setError(true); //エラー発生
      })
      .finally(() => {
        setLoading(false); //正常終了
      });
  };

  return { getPlayers, getPlayersNext, player, playerNext, loading, error };
};
