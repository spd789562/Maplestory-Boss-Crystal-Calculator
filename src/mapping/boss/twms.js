const BossList = [
  // 炎魔
  {
    id: 0,
    name: 'zakum',
    difficulties: [
      {
        difficulty: 'easy',
        mesos: 157500,
        hp: 2200000,
        drops: ['red_stone'],
        contribution: {
          self: 100,
          party: 500,
        },
      },
      {
        difficulty: 'normal',
        mesos: 482400,
        hp: 7000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 6 }],
        contribution: {
          self: 100,
          party: 500,
        },
      },
    ],
    defeatType: 'day',
    defeatTime: 1,
  },
  // 混沌炎魔
  {
    id: 1,
    name: 'zakum',
    difficulties: [
      {
        difficulty: 'chaos',
        mesos: 12834800,
        hp: 84000000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1000,
          party: 2000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 梅格奈斯
  {
    id: 2,
    name: 'magnus',
    difficulties: [
      {
        difficulty: 'easy',
        mesos: 568600,
        hp: 400000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 6 }],
        contribution: {
          self: 100,
          party: 500,
        },
      },
      {
        difficulty: 'normal',
        mesos: 2041500,
        hp: 6000000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 12 }],
        contribution: {
          self: 500,
          party: 2000,
        },
      },
    ],
    defeatType: 'day',
    defeatTime: 1,
  },
  // 困難梅格奈斯
  {
    id: 3,
    name: 'magnus',
    difficulties: [
      {
        difficulty: 'hard',
        mesos: 15074200,
        hp: 120000000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1250,
          party: 2500,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 希拉
  {
    id: 4,
    name: 'hilla',
    withoutDifficulty: true,
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 630000,
        hp: 500000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 6 }],
        contribution: {
          self: 150,
          party: 1000,
        },
      },
    ],
    defeatType: 'day',
    defeatTime: 1,
  },
  // 困難希拉
  {
    id: 5,
    name: 'hilla',
    difficulties: [
      {
        difficulty: 'hard',
        mesos: 8968100,
        hp: 16800000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 24 }],
        contribution: {
          self: 1000,
          party: 2000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 森蘭丸
  {
    id: 6,
    name: 'mori_ranmaru',
    difficulties: [
      {
        difficulty: 'normal',
        hp: 1000000000,
        mesos: 510300,
        contribution: {
          self: 150,
          party: 1000,
        },
      },
      {
        difficulty: 'hard',
        hp: 10500000000,
        mesos: 2098600,
        contribution: {
          self: 500,
          party: 2000,
        },
      },
    ],
    defeatType: 'day',
    defeatTime: 1,
  },
  // 濃姬
  {
    id: 9,
    name: 'princess_no',
    withoutDifficulty: true,
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 12115400,
        hp: 200000000000,
        contribution: {
          self: 1000,
          party: 2000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 卡翁
  {
    id: 11,
    name: 'omni_cln',
    withoutDifficulty: true,
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 984500,
        hp: 1680000000,
        drops: [{ name: 'crusaders_coin', value: 8 }],
        contribution: {
          self: 250,
          party: 1500,
        },
      },
    ],
    defeatType: 'day',
    defeatTime: 1,
  },
  // 班班
  {
    id: 12,
    name: 'von_bon',
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 766000,
        hp: 315000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 6 }],
        contribution: {
          self: 150,
          party: 1000,
        },
      },
    ],
    defeatType: 'day',
    defeatTime: 1,
  },
  // 比艾樂
  {
    id: 13,
    name: 'pierre',
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 762400,
        hp: 315000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 6 }],
        contribution: {
          self: 150,
          party: 1000,
        },
      },
    ],
    defeatType: 'day',
    defeatTime: 1,
  },
  // 血腥皇后
  {
    id: 14,
    name: 'crimson_queen',
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 765800,
        hp: 315000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 6 }],
        contribution: {
          self: 150,
          party: 1000,
        },
      },
    ],
    defeatType: 'day',
    defeatTime: 1,
  },
  // 貝倫
  {
    id: 15,
    name: 'vellum',
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 766900,
        hp: 550000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 6 }],
        contribution: {
          self: 150,
          party: 1000,
        },
      },
    ],
    defeatType: 'day',
    defeatTime: 1,
  },
  // 混沌班班
  {
    id: 16,
    name: 'von_bon',
    difficulties: [
      {
        difficulty: 'chaos',
        mesos: 12819500,
        hp: 100000000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1000,
          party: 2000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 混沌比艾樂
  {
    id: 17,
    name: 'pierre',
    difficulties: [
      {
        difficulty: 'chaos',
        mesos: 12834800,
        hp: 80000000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1000,
          party: 2000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 混沌血腥皇后
  {
    id: 18,
    name: 'crimson_queen',
    difficulties: [
      {
        difficulty: 'chaos',
        mesos: 12817600,
        hp: 140000000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1000,
          party: 2000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 混沌貝倫
  {
    id: 19,
    name: 'vellum',
    difficulties: [
      {
        difficulty: 'chaos',
        mesos: 16549700,
        hp: 200000000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1250,
          party: 2500,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 凡雷恩
  {
    id: 20,
    name: 'von_leon',
    difficulties: [
      {
        difficulty: 'easy',
        mesos: 833200,
        hp: 700000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 7 }],
        contribution: {
          self: 150,
          party: 1000,
        },
      },
      {
        difficulty: 'normal',
        mesos: 1148300,
        hp: 6300000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 10 }],
        contribution: {
          self: 250,
          party: 1500,
        },
      },
      {
        difficulty: 'hard',
        mesos: 1929600,
        hp: 10500000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 12 }],
        contribution: {
          self: 500,
          party: 200,
        },
      },
    ],
    defeatType: 'day',
    defeatTime: 1,
  },
  // 闇黑龍王
  {
    id: 21,
    name: 'horntail',
    difficulties: [
      {
        difficulty: 'easy',
        mesos: 694600,
        hp: 1018000000,
        drops: [{ name: 'crusaders_coin', value: 6 }],
        contribution: {
          self: 150,
          party: 1000,
        },
      },
      {
        difficulty: 'normal',
        mesos: 797400,
        hp: 2750000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 7 }],
        contribution: {
          self: 150,
          party: 1000,
        },
      },
      {
        difficulty: 'chaos',
        mesos: 1064800,
        hp: 26600000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 10 }],
        contribution: {
          self: 250,
          party: 1500,
        },
      },
    ],
    defeatType: 'day',
    defeatTime: 1,
  },
  // 阿卡伊農
  {
    id: 22,
    name: 'arkarium',
    difficulties: [
      {
        difficulty: 'easy',
        mesos: 907300,
        hp: 2100000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 8 }],
        contribution: {
          self: 200,
          party: 1500,
        },
      },
      {
        difficulty: 'normal',
        mesos: 1985100,
        hp: 12600000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 12 }],
        contribution: {
          self: 500,
          party: 2000,
        },
      },
    ],
    defeatType: 'day',
    defeatTime: 1,
  },
  // 皮卡啾
  {
    id: 23,
    name: 'pink_bean',
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 1106200,
        hp: 2100000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 10 }],
        contribution: {
          self: 250,
          party: 1500,
        },
      },
    ],
    defeatType: 'day',
    defeatTime: 1,
  },
  // 混沌皮卡啾
  {
    id: 24,
    name: 'pink_bean',
    difficulties: [
      {
        difficulty: 'chaos',
        mesos: 10225800,
        hp: 69500000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 24 }],
        contribution: {
          self: 1000,
          party: 2000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 西格諾斯
  {
    id: 25,
    name: 'cygnus',
    difficulties: [
      {
        difficulty: 'easy',
        mesos: 7195900,
        hp: 10500000000,
        drops: [{ name: 'crusaders_coin', value: 24 }],
        contribution: {
          self: 1000,
          party: 2000,
        },
      },
      {
        difficulty: 'normal',
        mesos: 11607300,
        hp: 63000000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1000,
          party: 2000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 拉圖斯
  {
    id: 26,
    name: 'papulatus',
    difficulties: [
      {
        difficulty: 'easy',
        mesos: 539100,
        hp: [300000000, 100000000],
        drops: [{ name: 'crusaders_coin', value: 6 }],
        contribution: {
          self: 100,
          party: 500,
        },
      },
      {
        difficulty: 'normal',
        mesos: 2098600,
        hp: [12600000000, 4200000000],
        drops: [{ name: 'crusaders_coin', value: 12 }],
        contribution: {
          self: 500,
          party: 2000,
        },
      },
    ],
    defeatType: 'day',
    defeatTime: 1,
  },
  // 混沌拉圖斯
  {
    id: 27,
    name: 'papulatus',
    difficulties: [
      {
        difficulty: 'chaos',
        mesos: 26770800,
        hp: [378000000000, 126000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1250,
          party: 2500,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 史烏
  {
    id: 28,
    name: 'lotus',
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 33974400,
        hp: [400000000000, 400000000000, 700000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'hard',
        mesos: 115805800,
        hp: [1700000000000, 7000000000000, 23370000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 戴米安
  {
    id: 29,
    name: 'damien',
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 35524300,
        hp: [828000000000, 360000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'hard',
        mesos: 110088400,
        hp: [24840000000000, 10800000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 守護者天使綠水靈
  {
    id: 37,
    name: 'guardian_angel_slime',
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 47498700,
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'hard',
        mesos: 148071700,
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 露希妲
  {
    id: 30,
    name: 'lucid',
    difficulties: [
      {
        difficulty: 'easy',
        mesos: 48592600,
        hp: [6000000000000, 6000000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'normal',
        mesos: 57814300,
        hp: [12000000000000, 12000000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'hard',
        mesos: 127197800,
        hp: [41040000000000, 41040000000000, 11970000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 威爾
  {
    id: 31,
    name: 'will',
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 66588300,
        hp: [4200000000000, 6300000000000, 10500000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'hard',
        mesos: 140594200,
        hp: [21000000000000, 31500000000000, 52500000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 戴斯克
  {
    id: 32,
    name: 'gloom',
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 71327600,
        hp: 26000000000000,
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'chaos',
        mesos: 151576200,
        hp: 114600000000000,
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
    enterType: 'day',
    enterTime: 1,
  },
  // 真．希拉
  {
    id: 33,
    name: 'verus_hilla',
    withoutDifficulty: true,
    difficulties: [
      {
        difficulty: 'hard',
        mesos: 180241400,
        hp: 176000000000000,
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
    enterType: 'day',
    enterTime: 1,
  },
  // 頓凱爾
  {
    id: 34,
    name: 'guard_captain_darknell',
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 76683600,
        hp: 26000000000000,
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'chaos',
        mesos: 159223800,
        hp: 127000000000000,
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
    enterType: 'day',
    enterTime: 1,
  },
  // 黑魔法師
  {
    id: 35,
    name: 'black_mage',
    withoutDifficulty: true,
    difficulties: [
      {
        difficulty: 'hard',
        mesos: 1628295299,
        hp: [65000000000000, 135000000000000, 200000000000000, 100000000000000],
        contribution: {
          self: 2000,
          party: 3000,
        },
      },
    ],
    defeatType: 'month',
    defeatTime: 1,
    enterType: 'day',
    enterTime: 1,
  },
  // 賽蓮
  {
    id: 36,
    name: 'chosen_seren',
    withoutDifficulty: true,
    difficulties: [
      {
        difficulty: 'hard',
        mesos: 251350800,
        hp: [126000000000000, 0],
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
    enterType: 'day',
    enterTime: 1,
  },
]

export default BossList
