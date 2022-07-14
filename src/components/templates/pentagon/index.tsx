import React, { PureComponent } from 'react';
import {
    Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { Player } from '../../../types/api/player';

export interface pentagonGraphProps {
  players: Player[]
}


//実際に画面に表示するデータ型の定義
export const PentagonGraph: React.FC<pentagonGraphProps> = (players) => {
  //どの選手のどのパラメータをグラフ化するかサービスのロジックを組む
//console.log('players.players[3]?.statistics[0]', players.players[3]?.statistics[0])
  //シュート精度
  const shotsTotal= players.players[3]?.statistics[0]?.shots.total
  const shotsOn= players.players[3]?.statistics[0]?.shots.on
  const shots = 100 * (shotsOn / shotsTotal)
  //console.log('SHOTS', shots)
  //パス精度
  const pass = players.players[3]?.statistics[0]?.passes.accuracy
  //console.log('PASS', players.players[3]?.statistics[0]?.passes.accuracy)
  //ドリブル成功回数
  const dribbleAttempts = players.players[3]?.statistics[0]?.dribbles.attempts
  const dribbleSuccess = players.players[3]?.statistics[0]?.dribbles.success
  const dribble = 100 * (dribbleSuccess / dribbleAttempts)
  //console.log('DRIBBLE', dribbleAttempts, dribbleSuccess, dribble)
  //デュエル勝率
  const duelTotal= players.players[3]?.statistics[0]?.duels.total
  const duelWon= players.players[3]?.statistics[0]?.duels.won
  const duel = 100 * (duelWon / duelTotal)
  //console.log('DUEL', duel)
  //タックル
  const tackle = players.players[3]?.statistics[0]?.tackles.total
  //console.log('TACKLES', tackle * 5)
  //出場率
  //総時間
  const totalMin = 90 * 38
  const attemptMin= players.players[3]?.statistics[0]?.games.minutes
  const game = 100 * (attemptMin / totalMin)
  //console.log('GAMES', game)


  const data = [
    {subject: 'SHOTS', A: shots, fullMark: 100}, //シュート精度
    {subject: 'PASS', A: pass, fullMark: 100}, //パス精度
    {subject: 'DRIBBLE', A: dribble, fullMark: 100}, //ドリブル成功回数
    {subject: 'DUEL', A: duel, fullMark: 100}, //デュエル勝率
    {subject: 'TACKLES', A: 75, fullMark: 100}, //tackles(blocks+interceptions)
    {subject: 'MATCH', A: game, fullMark: 100}, //38試合中の出場時間数（90×38のうちの割合）
  ];


  return (
    <RadarChart  // レーダーチャート全体の設定を記述
      cx={250}  // 要素の左端とチャートの中心点との距離(0にするとチャートの左半分が隠れる)
      cy={250}  // 要素の上部とチャートの中心点との距離(0にするとチャートの上半分が隠れる)
      outerRadius={100}  // レーダーチャート全体の大きさ  
      width={500}  // レーダーチャートが記載される幅(この幅よりチャートが大きい場合、はみ出た箇所は表示されない)
      height={500}   // レーダーチャートが記載される高さ
      data={data}  // 表示対象のデータ
    >
    {/* レーダーチャートの蜘蛛の巣のような線 */}
    <PolarGrid />
    {/* 項目を決めるデータのキー(サンプルでいう数学や歴史) */}
    <PolarAngleAxis dataKey="subject" />

    {/* 目安となる数値が表示される線を指定  */}
    <PolarRadiusAxis 
      angle={30}  // 中心点から水平を0°とした時の角度 垂直にしたいなら90を指定
      domain={[0, 100]}  // リストの１番目の要素が最小値、2番目の要素が最大値
    />  

    {/* レーダーを表示 */}
    <Radar 
      name=""  // そのチャートが誰のデータか指定(チャート下にここで指定した値が表示される)
      dataKey="A"   // 表示する値と対応するdata内のキー
      stroke="blue"  // レーダーの外枠の色
      fill="#98c5e9"  // レーダー内の色
      fillOpacity={0.6}  // レーダー内の色の濃さ(1にすると濃さMAX)
    />
    {/* ２個目のレーダー */}
    {/* <Radar name="" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}

    {/* グラフの下のAさんBさんの表記 */}
    <Legend />
    </RadarChart>
  );
};
export default React.memo(PentagonGraph);