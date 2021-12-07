export interface obj {
  name: string;
  playerNames: [string];
  playedMonths: [
    {
      name: string;
      isMonthClosed: boolean;
      sessions: {
        name: string;
        date: string;
        totalDollarsAmount: number;
        playersResults: [
          {
            playerName: string;
            buyins: number;
            rebuys: number;
            totalChips: number;
            result: number;
          }
        ];
      };
    }
  ];
}

export interface User {
  _id?: string;
  playingGroups: PlayingGroup[];
}

export interface PlayingGroup {
  _id?: string;
  name: string;
  playersNames: string[];
  playedMonths: PlayedMonths[];
}

export interface PlayedMonths {
  _id?: string;
  name: string;
  isMonthClosed: boolean;
  balance?: number;
  sessions: Session[];
}

export interface Session {
  _id?: string;
  name: string;
  date: Date | string;
  totalDolarsAmount: number;
  playersResult: PlayerResult[];
}

export interface PlayerResult {
  _id?: string;
  playerName: string;
  buyins: number;
  rebuys: number;
  totalChips: number;
  result: number;
}
