import React, { PureComponent, useEffect } from 'react';
import Head from 'next/head'
import Layout, { siteTitle } from '../../components/templates/layout/layout'
import Link from 'next/link';
import { Button } from '@mui/material';
import { PentagonGraph } from '../../components/templates/pentagon';
import { useGetPlayers } from '../../hooks/useGetPlayers';

const PentagonGraphPage: React.FC = () => {
  const { getPlayers, getPlayersNext, player, playerNext, loading, error} = useGetPlayers();
  useEffect(()=>{
    getPlayers();
    getPlayersNext();
  },[])
  const playerLists = player.concat(playerNext)

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Link href='/'><Button>Home</Button></Link>
      <section>
      <br />
      {error ? (
        <p>データ取得に失敗しています</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <PentagonGraph players={playerLists}/>
        </>
      )}
      </section>
    </Layout>
  );
};
export default React.memo(PentagonGraphPage); 