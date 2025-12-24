// src/pages/game.tsx

import type { NextPage } from "next";
import Head from "next/head";
import ArrowKeyHero from "../components/ArrowKeyHero";

const GamePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Arrow Key Hero Practice</title>
        <meta
          name="description"
          content="Simple keyboard practice game for students using arrow keys."
        />
      </Head>

      {/* Main content – the hero game */}
      <ArrowKeyHero />
    </>
  );
};

export default GamePage;
