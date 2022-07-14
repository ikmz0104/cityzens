import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Layout, { siteTitle } from '../../components/templates/layout/layout'
import Link from 'next/link';
import { useGetPlayers } from '../../hooks/useGetPlayers';
import { PlayerCard } from '../../components/templates/players';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  TextField,
  Autocomplete,
  Typography,
} from '@mui/material';
import "./index.module.css"

const PlayerPage: React.FC = () => {
  /*
    APIから取得したデータの合算
  */
  const { getPlayers, getPlayersNext, player, playerNext, loading, error} = useGetPlayers();
  useEffect(()=>{
    getPlayers();
    getPlayersNext();
  },[])
  const playerLists = player.concat(playerNext);

  /*
    選択した選択肢(value)でソートする
  */
  const { control, setValue} = useForm({
    mode: 'onChange',
    defaultValues: {
      single: {},
      multi: [],
    },
  });
  const sortedList = [
    { label: '出場試合数', value: 'appearences'},
    { label: '得点数', value: 'goals'},
    { label: 'アシスト数', value: 'assists'},
    { label: 'アルファベット順', value: 'alphabet'},
    { label: 'FW', value: 'fw'},
    { label: 'MF', value: 'mf'},
    { label: 'DF', value: 'df'},
    { label: 'GK', value: 'gk'},
  ]
  const [obj, setObj] = useState<any>();
  
  /*
    ポジション毎にソートする
  */
  //Attacker
  const playerListsFW = obj?.value === 'fw'
  ? playerLists.filter(r=>r.statistics[0].games?.position === 'Attacker')
  : null;
  //Midfielder
  const playerListsMF = obj?.value === 'mf'
  ? playerLists.filter(r=>r.statistics[0].games?.position === 'Midfielder')
  : null;
  //Defender
  const playerListsDF = obj?.value === 'df'
  ? playerLists.filter(r=>r.statistics[0].games?.position === 'Defender')
  : null;
  //Goalkeeper
  const playerListsGK = obj?.value === 'gk'
  ? playerLists.filter(r=>r.statistics[0].games?.position === 'Goalkeeper')
  : null;

  /*
    降順ソートする
  */
  //出場試合数
  const playerListsGame = obj?.value === 'appearences'
  ? playerLists.sort(function (a, b) {
      return b.statistics[0].games?.appearences - a.statistics[0].games?.appearences;
    })
  : null;

  //得点数
  const playerListsGoal = obj?.value === 'goals'
  ? playerLists.sort(function (a, b) {
      return b.statistics[0].goals?.total - a.statistics[0].goals?.total;
    })
  : null;
  console.log('playerListsGoal', playerListsGoal)

  //アシスト数
  const playerListsAssist = obj?.value === 'assists'
  ? playerLists.sort(function (a, b) {
      return b.statistics[0].goals?.assists - a.statistics[0].goals?.assists;
    })
  : null;

  //アルファベット順
  function SortArray(x, y){
    if (x.player.name < y.player.name) {return -1;}
    if (x.player.name > y.player.name) {return 1;}
    return 0;
  }
  const playerListsName = obj?.value === 'alphabet' 
  ? playerLists.sort(SortArray)
  : null;

  /*
    試験用エリア
  */



    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <Link href='/'><Button>Home</Button></Link>
        <Typography gutterBottom variant="h6" component="h2">
          Sort
        </Typography>
        <Controller
          control={control}
          name="single"
          render={() => (
            <Autocomplete
              fullWidth
              options={sortedList}
              renderInput={(params) => <TextField {...params} label="select..." />}
              onChange={(event, value) => {
                setValue('single', value, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                });
                //選択した選択肢をフロントで保持する
                setObj(null)
                setObj(value)
              }}
            />
          )}
        />
        <section>
        <br />
        {error ? (
          <p>データ取得に失敗しています</p>
        ) : loading ? (
          <p>Loading...</p>
        ) :obj?.value === 'appearences' ? (
          <PlayerCard players={playerListsGame}/>
        ) :obj?.value === 'goals' ? (
          <PlayerCard players={playerListsGoal}/>
        ) :obj?.value === 'assists' ? (
          <PlayerCard players={playerListsAssist}/>
        ) :obj?.value === 'alphabet' ? (
          <PlayerCard players={playerListsName}/>
        ) :obj?.value === 'fw' ? (
          <PlayerCard players={playerListsFW}/>
        ) :obj?.value === 'mf' ? (
          <PlayerCard players={playerListsMF}/>
        ) :obj?.value === 'df' ? (
          <PlayerCard players={playerListsDF}/>
        ) :obj?.value === 'gk' ? (
          <PlayerCard players={playerListsGK}/>
        ) : (
          <PlayerCard players={playerLists}/>
        )}
        </section>
      </Layout>
  )
};
export default React.memo(PlayerPage); 


//CSV出力に必要

//module
// import ExcelJS from "exceljs";
// import encoding from "encoding-japanese";
// const workbook = new ExcelJS.Workbook();

//関数
// const handleClickCsvDownloadBtn = async (
//   format: "xlsx" | "csv",
//   charcode?: "UTF8" | "SJIS"
// ) => {

//   const workbook = new ExcelJS.Workbook();
//   workbook.addWorksheet("sheet1");
//   const worksheet = workbook.getWorksheet("sheet1");

//   worksheet.columns = [
//     { header: "Name", key: "id" },
//     { header: "Age", key: "age" },
//     { header: "Game", key: "game" },
//     { header: "Goal", key: "goal" },
//     { header: "Assist", key: "assist" },
//   ];

//   for (let i = 0; i < playerLists?.length; i++) {
//     worksheet.addRows([
//       {
//         id: playerLists[i].player.name,
//         age: playerLists[i].player.age,
//         game: playerLists[i].statistics.games?.appearences,
//         goal: playerLists[i].statistics.goals?.total,
//         assist: playerLists[i].statistics.goals?.assists
//       },
//     ]);
//   }

//   const uint8Array =
//     format === "xlsx"
//       ? await workbook.xlsx.writeBuffer()
//       : charcode === "UTF8"
//       ? await workbook.csv.writeBuffer()
//       : new Uint8Array(
//           encoding.convert(await workbook.csv.writeBuffer(), {
//             from: "UTF8",
//             to: "SJIS"
//           })
//         );
//   const blob = new Blob([uint8Array], {
//     type: "application/octet-binary"
//   });
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "sampleData." + format;
//   a.click();
//   a.remove();
// };

//フロント側
{/* データ分析時に元に戻す */}
{/* <button onClick={() => {
  handleClickCsvDownloadBtn("csv")
}}>
  <p>データを出力</p>
</button> */}