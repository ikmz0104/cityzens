import React from 'react';
import { Player } from '../../../types/api/player';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';

export interface playerProps {
  players: Player[]
}

//実際に画面に表示するデータ型の定義
export const PlayerCard: React.FC<playerProps> = ({players}) => {
  console.log('players', players)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth:1200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">名前</TableCell>
            <TableCell align="center">写真</TableCell>
            <TableCell align="center">ポジション</TableCell>
            <TableCell align="center">出場</TableCell>
            <TableCell align="center">得点</TableCell>
            <TableCell align="center">アシスト</TableCell>
            <TableCell align="center">１試合平均パス本数</TableCell>
            <TableCell align="center">インターセプト数</TableCell>
            <TableCell align="center">デュエル勝利数</TableCell>
            {/* スプリント数の代替 */}
            <TableCell align="center">ドリブル成功数</TableCell> 
            <TableCell align="center">PK成功数</TableCell>
            <TableCell align="center">累積警告枚数</TableCell>
            <TableCell align="center">失点数</TableCell>
            <TableCell align="center">決定機阻止数</TableCell>
            <TableCell align="center">PK阻止数</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players?.map((player) => (
            <TableRow
              key={player.player.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
              {player.player.firstname}<br/>
              {player.player.lastname}
              </TableCell>
              <TableCell component="th" scope="row" align="center"><Image src={player.player.photo} width="100" height="100" alt="img" /></TableCell>
              <TableCell align="center">{player.statistics[0]?.games.position}</TableCell>
              <TableCell align="center">{player.statistics[0]?.games?.appearences}</TableCell>
              <TableCell align="center">{player.statistics[0]?.goals?.total}</TableCell>
              <TableCell align="center">{player.statistics[0]?.goals?.assists || 0}</TableCell>
              <TableCell align="center">
                {Math.floor(player.statistics[0]?.passes.total / player.statistics[0]?.games?.appearences) || 0}
              </TableCell>
              <TableCell align="center">{player.statistics[0]?.tackles.interceptions || 0}</TableCell>
              <TableCell align="center">{player.statistics[0]?.duels.won || 0}</TableCell>
              <TableCell align="center">{player.statistics[0]?.dribbles.success || 0}</TableCell>
              <TableCell align="center">{player.statistics[0]?.penalty.scored || 0}</TableCell>
              <TableCell align="center">{player.statistics[0]?.cards.yellow || 0}</TableCell>
              <TableCell align="center">{player.statistics[0]?.goals.conceded || 0}</TableCell>
              <TableCell align="center">{player.statistics[0]?.goals.saves || 0}</TableCell>
              <TableCell align="center">{player.statistics[0]?.penalty.saved || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default React.memo(PlayerCard);