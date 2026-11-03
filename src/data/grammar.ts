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
  {
    id: "N3:you-ni-naru",
    level: "N3",
    pattern: "〜ようになる",
    meaning: "To reach the point where ~; to come to ~",
    formation: "Verb dictionary form / ない-form + ようになる",
    examples: [
      { ja: "日本語の新聞が読めるようになりました。", en: "I've become able to read Japanese newspapers." },
    ],
  },
  {
    id: "N3:you-ni-suru",
    level: "N3",
    pattern: "〜ようにする",
    meaning: "To make an effort to ~; to make sure to ~",
    formation: "Verb dictionary form / ない-form + ようにする",
    examples: [
      { ja: "毎日野菜を食べるようにしています。", en: "I make a point of eating vegetables every day." },
    ],
  },
  {
    id: "N3:wake-da",
    level: "N3",
    pattern: "〜わけだ",
    meaning: "That's why ~; no wonder ~",
    formation: "Plain form + わけだ (な-adj + なわけだ)",
    examples: [
      { ja: "十年も住んでいたのか。日本語が上手なわけだ。", en: "You lived there ten years? No wonder your Japanese is good." },
    ],
  },
  {
    id: "N3:wake-dewa-nai",
    level: "N3",
    pattern: "〜わけではない",
    meaning: "It's not that ~; doesn't necessarily mean ~",
    formation: "Plain form + わけではない",
    examples: [
      { ja: "肉が嫌いなわけではないが、あまり食べない。", en: "It's not that I dislike meat, but I don't eat it much." },
    ],
  },
  {
    id: "N3:ba-yokatta",
    level: "N3",
    pattern: "〜ばよかった",
    meaning: "I should have ~ (regret)",
    formation: "Verb ば-form + よかった",
    examples: [
      { ja: "もっと早く出発すればよかった。", en: "I should have left earlier." },
    ],
  },
  {
    id: "N3:tame-ni",
    level: "N3",
    pattern: "〜ために",
    meaning: "In order to ~; because of ~",
    formation: "Verb dictionary form / Noun + の + ために",
    examples: [
      { ja: "留学するためにお金を貯めています。", en: "I'm saving money in order to study abroad." },
      { ja: "事故のために電車が遅れた。", en: "The train was delayed because of an accident." },
    ],
  },
  {
    id: "N3:rashii",
    level: "N3",
    pattern: "〜らしい",
    meaning: "I heard ~; it seems ~; typical of ~",
    formation: "Plain form + らしい (Noun + らしい for \"typical of\")",
    examples: [
      { ja: "明日は雪が降るらしい。", en: "I hear it's going to snow tomorrow." },
      { ja: "今日は春らしい天気だ。", en: "Today's weather is very spring-like." },
    ],
  },
  {
    id: "N3:ni-yotte",
    level: "N3",
    pattern: "〜によって",
    meaning: "By ~ (agent/means); depending on ~",
    formation: "Noun + によって",
    examples: [
      { ja: "この寺は有名な建築家によって建てられた。", en: "This temple was built by a famous architect." },
      { ja: "国によって習慣が違う。", en: "Customs differ depending on the country." },
    ],
  },
  {
    id: "N3:uchi-ni",
    level: "N3",
    pattern: "〜うちに",
    meaning: "While ~ (before the situation changes)",
    formation: "Verb dictionary / ない-form, い-adj, な-adj + な, Noun + の + うちに",
    examples: [
      { ja: "若いうちに色々な国へ行きたい。", en: "I want to visit many countries while I'm young." },
    ],
  },
  {
    id: "N3:koto-ni-suru",
    level: "N3",
    pattern: "〜ことにする",
    meaning: "To decide to ~",
    formation: "Verb dictionary form / ない-form + ことにする",
    examples: [
      { ja: "来月から禁煙することにしました。", en: "I've decided to quit smoking from next month." },
    ],
  },
  {
    id: "N3:sae",
    level: "N3",
    pattern: "〜さえ",
    meaning: "Even ~",
    formation: "Noun (+ particle) + さえ",
    examples: [
      { ja: "忙しくて、昼ご飯を食べる時間さえない。", en: "I'm so busy I don't even have time to eat lunch." },
    ],
  },
  {
    id: "N3:ppanashi",
    level: "N3",
    pattern: "〜っぱなし",
    meaning: "Leaving something in a state (left undone)",
    formation: "Verb stem + っぱなし",
    examples: [
      { ja: "電気をつけっぱなしで寝てしまった。", en: "I fell asleep with the lights left on." },
    ],
  },
  {
    id: "N2:ni-chigainai",
    level: "N2",
    pattern: "〜に違いない",
    meaning: "There's no doubt that ~; must be ~",
    formation: "Plain form + に違いない (な-adj/Noun without だ)",
    examples: [
      { ja: "電気が消えている。もう寝たに違いない。", en: "The lights are off. They must have gone to bed." },
    ],
  },
  {
    id: "N2:ni-kagitte",
    level: "N2",
    pattern: "〜に限って",
    meaning: "Only when ~ (of all times); ~ in particular",
    formation: "Noun + に限って",
    examples: [
      { ja: "傘を持っていない日に限って雨が降る。", en: "It always rains on the very days I don't have an umbrella." },
    ],
  },
  {
    id: "N2:ue-de",
    level: "N2",
    pattern: "〜上で",
    meaning: "After ~ (doing first); in terms of ~",
    formation: "Verb た-form / Noun + の + 上で",
    examples: [
      { ja: "よく考えた上で決めてください。", en: "Please decide after thinking it over carefully." },
    ],
  },
  {
    id: "N2:kagiri",
    level: "N2",
    pattern: "〜限り",
    meaning: "As long as ~; as far as ~",
    formation: "Verb dictionary / ない-form / Noun + である + 限り",
    examples: [
      { ja: "私が知っている限り、彼は信頼できる人だ。", en: "As far as I know, he is someone you can trust." },
    ],
  },
  {
    id: "N2:kuse-ni",
    level: "N2",
    pattern: "〜くせに",
    meaning: "Even though ~ (critical)",
    formation: "Plain form + くせに (な-adj + な, Noun + の)",
    examples: [
      { ja: "知っているくせに教えてくれない。", en: "Even though they know, they won't tell me." },
    ],
  },
  {
    id: "N2:to-wa-kagiranai",
    level: "N2",
    pattern: "〜とは限らない",
    meaning: "Not necessarily ~",
    formation: "Plain form + とは限らない",
    examples: [
      { ja: "高い物がいい物だとは限らない。", en: "Expensive things aren't necessarily good things." },
    ],
  },
  {
    id: "N2:zaru-wo-enai",
    level: "N2",
    pattern: "〜ざるを得ない",
    meaning: "Cannot help but ~; have no choice but to ~",
    formation: "Verb ない-stem + ざるを得ない (する → せざるを得ない)",
    examples: [
      { ja: "雨が強いので、試合は中止せざるを得ない。", en: "The rain is so heavy we have no choice but to cancel the match." },
    ],
  },
  {
    id: "N2:ni-kanshite",
    level: "N2",
    pattern: "〜に関して",
    meaning: "Concerning ~; regarding ~",
    formation: "Noun + に関して (+ の before a noun)",
    examples: [
      { ja: "この件に関して質問があります。", en: "I have a question regarding this matter." },
    ],
  },
  {
    id: "N2:ni-tsurete",
    level: "N2",
    pattern: "〜につれて",
    meaning: "As ~ (one change brings another)",
    formation: "Verb dictionary form / Noun + につれて",
    examples: [
      { ja: "年を取るにつれて、体力が落ちてきた。", en: "As I've gotten older, my stamina has declined." },
    ],
  },
  {
    id: "N2:mono-no",
    level: "N2",
    pattern: "〜ものの",
    meaning: "Although ~",
    formation: "Plain form + ものの (な-adj + な / である)",
    examples: [
      { ja: "免許は取ったものの、まだ運転に自信がない。", en: "Although I got my license, I'm still not confident driving." },
    ],
  },
  {
    id: "N2:ippou-da",
    level: "N2",
    pattern: "〜一方だ",
    meaning: "Keeps ~ing; more and more (one direction)",
    formation: "Verb dictionary form + 一方だ",
    examples: [
      { ja: "この町の人口は減る一方だ。", en: "This town's population just keeps decreasing." },
    ],
  },
  {
    id: "N2:wake-niwa-ikanai",
    level: "N2",
    pattern: "〜わけにはいかない",
    meaning: "Can't (for social/moral reasons)",
    formation: "Verb dictionary form + わけにはいかない",
    examples: [
      { ja: "大事な会議があるので、休むわけにはいかない。", en: "I have an important meeting, so I can't take the day off." },
    ],
  },
];
