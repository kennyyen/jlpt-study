import type { GrammarPoint } from "@/lib/types";

export const GRAMMAR: GrammarPoint[] = [
  {
    id: "N5:wa-desu",
    level: "N5",
    pattern: "〜は〜です",
    meaning: "A is B (topic + copula)",
    formation: "Noun + は + Noun + です",
    examples: [
      { ja: "私は学生です。", en: "I am a student." },
      { ja: "これは本です。", en: "This is a book." },
    ],
  },
  {
    id: "N5:ka",
    level: "N5",
    pattern: "〜か",
    meaning: "Question marker",
    formation: "Sentence + か",
    examples: [
      { ja: "田中さんは先生ですか。", en: "Is Mr. Tanaka a teacher?" },
      { ja: "何を食べますか。", en: "What will you eat?" },
    ],
  },
  {
    id: "N5:no",
    level: "N5",
    pattern: "〜の〜",
    meaning: "Possession; noun modifier (of, 's)",
    formation: "Noun + の + Noun",
    examples: [
      { ja: "私の本です。", en: "It's my book." },
      { ja: "日本語の先生", en: "a Japanese-language teacher" },
    ],
  },
  {
    id: "N5:masu",
    level: "N5",
    pattern: "〜ます / 〜ません",
    meaning: "Polite present/future verb (affirmative / negative)",
    formation: "Verb stem + ます / ません",
    examples: [
      { ja: "毎日コーヒーを飲みます。", en: "I drink coffee every day." },
      { ja: "肉を食べません。", en: "I don't eat meat." },
    ],
  },
  {
    id: "N5:mashita",
    level: "N5",
    pattern: "〜ました / 〜ませんでした",
    meaning: "Polite past verb (affirmative / negative)",
    formation: "Verb stem + ました / ませんでした",
    examples: [
      { ja: "昨日映画を見ました。", en: "I watched a movie yesterday." },
      { ja: "朝ご飯を食べませんでした。", en: "I didn't eat breakfast." },
    ],
  },
  {
    id: "N5:te-kudasai",
    level: "N5",
    pattern: "〜てください",
    meaning: "Please do ~",
    formation: "Verb て-form + ください",
    examples: [
      { ja: "ここに名前を書いてください。", en: "Please write your name here." },
      { ja: "ちょっと待ってください。", en: "Please wait a moment." },
    ],
  },
  {
    id: "N5:te-iru",
    level: "N5",
    pattern: "〜ている",
    meaning: "Ongoing action; resulting state",
    formation: "Verb て-form + いる",
    examples: [
      { ja: "今、本を読んでいます。", en: "I'm reading a book now." },
      { ja: "兄は結婚しています。", en: "My older brother is married." },
    ],
  },
  {
    id: "N5:tai",
    level: "N5",
    pattern: "〜たい",
    meaning: "Want to do ~",
    formation: "Verb stem + たい",
    examples: [
      { ja: "日本に行きたいです。", en: "I want to go to Japan." },
      { ja: "何が食べたいですか。", en: "What do you want to eat?" },
    ],
  },
  {
    id: "N5:mashou",
    level: "N5",
    pattern: "〜ましょう",
    meaning: "Let's do ~",
    formation: "Verb stem + ましょう",
    examples: [
      { ja: "一緒に帰りましょう。", en: "Let's go home together." },
      { ja: "少し休みましょう。", en: "Let's take a short break." },
    ],
  },
  {
    id: "N5:mo",
    level: "N5",
    pattern: "〜も",
    meaning: "Also; too",
    formation: "Noun + も",
    examples: [
      { ja: "私も学生です。", en: "I'm a student too." },
      { ja: "犬も猫も好きです。", en: "I like both dogs and cats." },
    ],
  },
  {
    id: "N5:ga-arimasu",
    level: "N5",
    pattern: "〜があります / 〜がいます",
    meaning: "There is ~ (inanimate / animate)",
    formation: "Noun + が + あります (things) / います (people, animals)",
    examples: [
      { ja: "机の上に本があります。", en: "There is a book on the desk." },
      { ja: "公園に子供がいます。", en: "There are children in the park." },
    ],
  },
  {
    id: "N5:kara-made",
    level: "N5",
    pattern: "〜から〜まで",
    meaning: "From ~ to ~",
    formation: "Noun + から + Noun + まで",
    examples: [
      { ja: "九時から五時まで働きます。", en: "I work from nine to five." },
      { ja: "駅から学校まで歩きます。", en: "I walk from the station to school." },
    ],
  },
  {
    id: "N4:te-mo-ii",
    level: "N4",
    pattern: "〜てもいい",
    meaning: "It's okay to ~; may ~",
    formation: "Verb て-form + もいい",
    examples: [
      { ja: "窓を開けてもいいですか。", en: "May I open the window?" },
      { ja: "ここで写真を撮ってもいいです。", en: "You may take photos here." },
    ],
  },
  {
    id: "N4:te-wa-ikenai",
    level: "N4",
    pattern: "〜てはいけない",
    meaning: "Must not ~",
    formation: "Verb て-form + はいけない",
    examples: [
      { ja: "ここでたばこを吸ってはいけません。", en: "You must not smoke here." },
    ],
  },
  {
    id: "N4:nakereba-naranai",
    level: "N4",
    pattern: "〜なければならない",
    meaning: "Must ~; have to ~",
    formation: "Verb ない-form (drop い) + ければならない",
    examples: [
      { ja: "明日までに宿題を出さなければなりません。", en: "I have to hand in my homework by tomorrow." },
    ],
  },
  {
    id: "N4:ta-koto-ga-aru",
    level: "N4",
    pattern: "〜たことがある",
    meaning: "Have done ~ before (experience)",
    formation: "Verb た-form + ことがある",
    examples: [
      { ja: "富士山に登ったことがあります。", en: "I have climbed Mt. Fuji." },
    ],
  },
  {
    id: "N4:tsumori",
    level: "N4",
    pattern: "〜つもり",
    meaning: "Intend to ~",
    formation: "Verb dictionary form / ない-form + つもり",
    examples: [
      { ja: "来年、日本に留学するつもりです。", en: "I intend to study abroad in Japan next year." },
    ],
  },
  {
    id: "N4:sou-appearance",
    level: "N4",
    pattern: "〜そう (appearance)",
    meaning: "Looks like ~; seems about to ~",
    formation: "Verb stem / い-adj (drop い) / な-adj + そう",
    examples: [
      { ja: "このケーキは美味しそうです。", en: "This cake looks delicious." },
      { ja: "雨が降りそうです。", en: "It looks like it's going to rain." },
    ],
  },
  {
    id: "N4:tara",
    level: "N4",
    pattern: "〜たら",
    meaning: "If ~; when ~",
    formation: "Plain past form + ら",
    examples: [
      { ja: "駅に着いたら、電話してください。", en: "When you arrive at the station, please call me." },
    ],
  },
  {
    id: "N4:noni",
    level: "N4",
    pattern: "〜のに",
    meaning: "Even though ~ (with disappointment)",
    formation: "Plain form + のに (な-adj/noun + なのに)",
    examples: [
      { ja: "たくさん勉強したのに、試験に落ちました。", en: "Even though I studied a lot, I failed the exam." },
    ],
  },
  {
    id: "N4:te-shimau",
    level: "N4",
    pattern: "〜てしまう",
    meaning: "Do completely; do (regrettably)",
    formation: "Verb て-form + しまう",
    examples: [
      { ja: "財布をなくしてしまいました。", en: "I (unfortunately) lost my wallet." },
    ],
  },
  {
    id: "N4:passive",
    level: "N4",
    pattern: "〜られる (passive)",
    meaning: "Be done (by someone)",
    formation: "Group 1: あ-row + れる; Group 2: stem + られる",
    examples: [
      { ja: "先生に褒められました。", en: "I was praised by the teacher." },
    ],
  },
];
