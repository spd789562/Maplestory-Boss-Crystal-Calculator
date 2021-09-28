const BossList = [
  // 炎魔
  {
    id: 0,
    name: 'zakum',
    difficulties: [
      {
        difficulty: 'easy',
        mesos: 200000,
        hp: 2200000,
        drops: ['red_stone'],
        contribution: {
          self: 100,
          party: 500,
        },
      },
      {
        difficulty: 'normal',
        mesos: 612500,
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
        mesos: 16200000,
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
        mesos: 722000,
        hp: 400000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 6 }],
        contribution: {
          self: 100,
          party: 500,
        },
      },
      {
        difficulty: 'normal',
        mesos: 2592000,
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
        mesos: 19012500,
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
        mesos: 800000,
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
        mesos: 11250000,
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
        mesos: 648000,
        contribution: {
          self: 150,
          party: 1000,
        },
      },
      {
        difficulty: 'hard',
        hp: 10500000000,
        mesos: 2664500,
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
        mesos: 15312500,
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
        mesos: 1250000,
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
        mesos: 968000,
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
        mesos: 968000,
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
        mesos: 968000,
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
        mesos: 968000,
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
        mesos: 16200000,
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
        mesos: 16200000,
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
        mesos: 16200000,
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
        mesos: 21012500,
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
        mesos: 1058000,
        hp: 700000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 7 }],
        contribution: {
          self: 150,
          party: 1000,
        },
      },
      {
        difficulty: 'normal',
        mesos: 1458000,
        hp: 6300000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 10 }],
        contribution: {
          self: 250,
          party: 1500,
        },
      },
      {
        difficulty: 'hard',
        mesos: 2450000,
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
        mesos: 882000,
        hp: 1018000000,
        drops: [{ name: 'crusaders_coin', value: 6 }],
        contribution: {
          self: 150,
          party: 1000,
        },
      },
      {
        difficulty: 'normal',
        mesos: 1012500,
        hp: 2750000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 7 }],
        contribution: {
          self: 150,
          party: 1000,
        },
      },
      {
        difficulty: 'chaos',
        mesos: 1352000,
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
        mesos: 1152000,
        hp: 2100000000,
        drops: ['red_stone', { name: 'crusaders_coin', value: 8 }],
        contribution: {
          self: 200,
          party: 1500,
        },
      },
      {
        difficulty: 'normal',
        mesos: 2520500,
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
        mesos: 1404500,
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
    enterShareId: 24,
    enterShareTime: 7,
  },
  // 混沌皮卡啾
  {
    id: 24,
    name: 'pink_bean',
    difficulties: [
      {
        difficulty: 'chaos',
        mesos: 12800000,
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
    enterShareId: 23,
    enterShareTime: 7,
  },
  // 西格諾斯
  {
    id: 25,
    name: 'cygnus',
    difficulties: [
      {
        difficulty: 'easy',
        mesos: 9112500,
        hp: 10500000000,
        drops: [{ name: 'crusaders_coin', value: 24 }],
        contribution: {
          self: 1000,
          party: 2000,
        },
      },
      {
        difficulty: 'normal',
        mesos: 14450000,
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
        mesos: 684500,
        hp: [300000000, 100000000],
        drops: [{ name: 'crusaders_coin', value: 6 }],
        contribution: {
          self: 100,
          party: 500,
        },
      },
      {
        difficulty: 'normal',
        mesos: 2664500,
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
        mesos: 26450000,
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
        mesos: 32512500,
        hp: [400000000000, 400000000000, 700000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'hard',
        mesos: 74112500,
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
        mesos: 33800000,
        hp: [828000000000, 360000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'hard',
        mesos: 70312500,
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
  // 露希妲
  {
    id: 30,
    name: 'lucid',
    difficulties: [
      {
        difficulty: 'easy',
        mesos: 35112500,
        hp: [6000000000000, 6000000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'normal',
        mesos: 40612500,
        hp: [12000000000000, 12000000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'hard',
        mesos: 80000000,
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
        mesos: 46512500,
        hp: [4200000000000, 6300000000000, 10500000000000],
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'hard',
        mesos: 88200000,
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
        mesos: 49612500,
        hp: 26000000000000,
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'chaos',
        mesos: 92450000,
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
        mesos: 110450000,
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
        mesos: 52812500,
        hp: 26000000000000,
        drops: [{ name: 'crusaders_coin', value: 26 }],
        contribution: {
          self: 1500,
          party: 3000,
        },
      },
      {
        difficulty: 'chaos',
        mesos: 96800000,
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
        mesos: 500000000,
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
        mesos: 151250000,
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
