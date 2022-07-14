import { VFC } from "react";
import { UserProfile } from "../../../types/UserProfile";

type Props = {
  user: UserProfile;
};

//実際に画面に表示するデータ型の定義
export const UserCard: VFC<Props> = (props) => {
  const { user } = props;
  const style = {
    border: "solid 1px #000",
    padding: "0px 16px",
    margin: "8px"
  };
  return (
    <div style={style}>
      <dl>
        <dt>名前</dt>
        <dd>{user.name}</dd>
        <dt>メール</dt>
        <dd>{user.email}</dd>
        <dt>住所</dt>
        <dd>{user.address}</dd>
      </dl>
    </div>
  );
};
