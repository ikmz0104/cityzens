import React from "react";
import "./index.module.css";
import { cardsData } from "../../../../backend/data/data";
import dynamic from 'next/dynamic'
const Card: any = dynamic(() => import('../card'), {
  ssr: false,
})

export default function Cards() {
  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};