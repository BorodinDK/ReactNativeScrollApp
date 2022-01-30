import React, { FC } from 'react';
import data from '../../data/bip39.json';
import { ScreenList } from "../../components/ScreenList";

export const ListScreen:FC = () => {
  return (
    <ScreenList title="Long list" data={data} />
  );
}
