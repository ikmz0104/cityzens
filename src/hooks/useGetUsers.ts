import axios from "axios";
import { useState } from "react";
import { UserProfile } from "../types/UserProfile";
import { User } from "../types/api/user";

//テスト：API側で型定義されている全データを取得するカスタムフック
export const useGetUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setLoading(true);
    setError(false);
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users") //任意のAPIです
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}${user.username}`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        //フェッチしたデータを編集して、stateの更新
        setUserProfiles(data);
      })
      .catch(() => {
        setError(true); //エラー発生
      })
      .finally(() => {
        setLoading(false); //正常終了
      });
  };
  return { getUsers, userProfiles, loading, error };
};
