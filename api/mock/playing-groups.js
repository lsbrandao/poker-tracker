module.exports = [
  {
    id: "groupId",
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
        sessions: [],
      },
    ],
  },
  {
    id: "groupId",
    name: "Group 2",
    playerNames: ["Player 4", "Player 5", "Player 6"],
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
                playerName: "Player 3",
                buyins: 1,
                rebuys: 1,
                totalChips: 30,
                result: 10,
              },
              {
                playerName: "Player 4",
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
        sessions: [],
      },
    ],
  },
];
