const BossList = [
  // 炎魔
  {
    id: 0,
    name: 'zakum',
    difficulties: [
      { difficulty: 'easy', mesos: 200000 },
      { difficulty: 'normal', mesos: 612500 },
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
      { difficulty: 'easy', mesos: 722000 },
      { difficulty: 'normal', mesos: 2592000 },
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
      { difficulty: 'normal', mesos: 648000 },
      { difficulty: 'hard', mesos: 2664500 },
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
      },
    ],
    defeatType: 'week',
    defeatTime: 1,
  },
  // 茱麗伊特
  {
    id: 10,
    name: 'julieta',
    withoutDifficulty: true,
    difficulties: [
      {
        difficulty: 'normal',
        mesos: 1200000,
      },
    ],
    defeatType: 'day',
    defeatTime: 4,
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
      },
      {
        difficulty: 'normal',
        mesos: 1458000,
      },
      {
        difficulty: 'hard',
        mesos: 2450000,
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
      },
      {
        difficulty: 'normal',
        mesos: 1012500,
      },
      {
        difficulty: 'chaos',
        mesos: 1352000,
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
      },
      {
        difficulty: 'normal',
        mesos: 2520500,
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
      },
      {
        difficulty: 'normal',
        mesos: 14450000,
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
      },
      {
        difficulty: 'normal',
        mesos: 2664500,
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
      },
      {
        difficulty: 'hard',
        mesos: 74112500,
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
      },
      {
        difficulty: 'hard',
        mesos: 70312500,
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
      },
      {
        difficulty: 'normal',
        mesos: 40612500,
      },
      {
        difficulty: 'hard',
        mesos: 80000000,
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
      },
      {
        difficulty: 'hard',
        mesos: 88200000,
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
      },
      {
        difficulty: 'chaos',
        mesos: 92450000,
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
      },
      {
        difficulty: 'chaos',
        mesos: 96800000,
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
      },
    ],
    defeatType: 'month',
    defeatTime: 1,
    enterType: 'day',
    enterTime: 1,
  },
]

export default BossList
