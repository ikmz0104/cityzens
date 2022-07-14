import axios from "axios";
import { useState } from "react";
export const useGetPlayers = () => {
  //TODO: 何とかする、必要性あるか今のとろろ不明なのでモックだけここにおいていく
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  // マンチェスターシティの選手スタッツを取得
  const getPlayers = () => {
    setLoading(true);
    setError(false);
    axios
      .get(process.env.NEXT_PUBLIC_LIVE_ALL_URL, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": process.env.NEXT_PUBLIC_API_HOST,
            "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY
        }
      })
      .then((res) => {
      })
      .catch(() => {
        setError(true); //エラー発生
      })
      .finally(() => {
        setLoading(false); //正常終了
      });
  };

  return { loading, error };
};
