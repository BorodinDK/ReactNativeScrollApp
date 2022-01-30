import React, { FC } from 'react';
import { ScreenList } from "../../components/ScreenList";

export const SettingsScreen:FC = () => {
  return (
    <ScreenList title="Settings" data={[
      "Item 1",
      "Item 2",
      "Item 3",
    ]} />
  );
}
