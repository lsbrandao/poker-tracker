const user: user = {
  id: "userId",
  playingGroups: [
    {
      _id: "groupId",
      name: "Group 1",
      playerNames: ["Player 1", "Player 2", "Player 3"],
      months: [
        {
          id: "202111",
          name: "November",
          sessions: [
            {
              name: "Session 1",
              date: "04-11-2021",
              totalDolarsAmount: 120,
              playersResult: [
                {
                  playerName: "Player 1",
                  buyins: 1,
                  rebuys: 1,
                  totalChips: 30,
                  result: 10,
                },
              ],
            },
            {
              name: "Session 2",
              date: "11-11-2021",
              totalDolarsAmount: 180,
              playersResult: [
                {
                  playerName: "Player 1",
                  buyins: 1,
                  rebuys: 1,
                  totalChips: 30,
                  result: 10,
                },
                {
                  playerName: "Player 2",
                  buyins: 1,
                  rebuys: 2,
                  totalChips: 60,
                  result: 30,
                },
              ],
            },
          ],
        },
        {
          id: "202110",
          name: "October",
          sessions: [
            {
              name: "Session 1",
              date: "07-10-2021",
              totalDolarsAmount: 120,
              playersResult: [
                {
                  playerName: "Player 1",
                  buyins: 1,
                  rebuys: 1,
                  totalChips: 30,
                  result: 10,
                },
              ],
            },
            {
              name: "Session 2",
              date: "14-11-2021",
              totalDolarsAmount: 180,
              playersResult: [
                {
                  playerName: "Player 1",
                  buyins: 1,
                  rebuys: 1,
                  totalChips: 30,
                  result: 10,
                },
                {
                  playerName: "Player 2",
                  buyins: 1,
                  rebuys: 2,
                  totalChips: 60,
                  result: 30,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

interface user {
  id: string;
  playingGroups: playingGroup[];
}

interface playingGroup {
  _id: string;
  name: string;
  playerNames: string[];
  months: month[];
}

interface month {
  id: string;
  name: string;
  balance?: number;
  sessions: session[];
}

interface session {
  name: string;
  date: Date | string;
  totalDolarsAmount: number;
  playersResult: playerResult[];
}

interface playerResult {
  playerName: string;
  buyins: number;
  rebuys: number;
  totalChips: number;
  result: number;
}
