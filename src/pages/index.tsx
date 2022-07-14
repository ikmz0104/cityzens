import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Layout, { siteTitle } from '../components/templates/layout/layout';
import { Button } from '@mui/material';

export default function Home() {
    return (
      <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <Link href='/player'><Button>PlayerStats</Button></Link>
        <section>
        <br />
        </section>
      </Layout>
      </>
  )
}