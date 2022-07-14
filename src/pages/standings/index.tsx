import React, { PureComponent, useEffect } from 'react';
import Head from 'next/head'
import Layout, { siteTitle } from '../../components/templates/layout/layout'
import Link from 'next/link';
import { Button } from '@mui/material';
import Standings from '../../components/templates/standings';

const StandingsPage: React.FC = () => {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Link href='/'><Button>Home</Button></Link>
      <section>
      <br />
      <>
        <Standings/>
      </>
      </section>
    </Layout>
  );
};
export default React.memo(StandingsPage); 