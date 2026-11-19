# Trust, But Verify — 演讲稿 / Presentation Script
**PSP404TC · Lab 5R · Zihan Wang · Yibo Xu · Zhuoyi Ye**
总时长目标：**14:00**（留 1 分钟缓冲，硬上限 15:00）· 26 幕 · 共 840 秒

---

## 0 · 使用说明

| 标记 | 含义 |
|---|---|
| 🎤 | 英文台词，可直接照读（语速 ~150 wpm，标点处换气） |
| 🎬 | 中文动作提示：按键、点击、站位、举手互动 |
| 😄 | 笑点，**可以删**——紧张就跳过，不影响逻辑 |
| ⏱ | 该幕秒数，卡点用；总表在 §1 |

**三条纪律**
1. 每幕只讲一个意思。屏幕上已经写了的字不要念，讲它**为什么**。
2. 笑点控制：每人每段 ≤ 3 个，讲完不解释、不自己先笑。
3. 换人时，**下一位先说「Thanks + 名字」再切题**，不要等掌声。

---

## 1 · 时间总表（卡点用）

| # | 段落 | 幕 | 讲者 | 时长 | 累计应到 |
|---|---|---|---|---|---|
| 1 | 开场 + 问题 + 研究问题 + 分工 | S01–S04 | **Zihan** | 1:45 | 1:45 |
| 2 | 方法 + 被试 + 现场重演说明 | S05–S07 | **Zihan** | 1:05 | 2:50 |
| 3 | **H1 不确定性分数** | S08–S12 | **Zihan** | 2:40 | 5:30 |
| 4 | **H2 行动前确认** | S13–S17 | **Yibo** | 2:30 | 8:00 |
| 5 | **H3 分数解释** | S18–S21 | **Zhuoyi** | 2:10 | 10:10 |
| 6 | 三条发现收束 | S22 | **Zihan** | 0:30 | 10:40 |
| 7 | 落地建议 | S23 | **Yibo** | 0:40 | 11:20 |
| 8 | 局限 | S24 | **Zhuoyi** | 0:40 | 12:00 |
| 9 | 结论 + 白盒揭秘 | S25 | **Zihan** | 0:45 | 12:45 |
| 10 | **实时 AI 白盒演示** | S26 | **Zihan** | 1:15 | 14:00 |

> 检查点：**5:30 必须进入 H2**、**10:10 必须进入 S22**。超了就砍 😄 句和 S05 的第二段。

---

## 2 · 逐幕脚本

### ═══ 第一段 · 开场（Zihan，1:45）═══

#### S01 · 封面 — ⏱ 0:30

🎤 "Good morning. We're Zihan, Yibo and Zhuoyi. Our title is *Trust, but verify* — which is also, more or less, what your parents say about the internet. 😄
For the next fourteen minutes we'll show you one small interface change, and what thirty-four people actually did with it.
Two housekeeping notes: click, scroll or drag to move forward. And press **W** at any time to open our white box — every claim in this deck can show its evidence. We'll come back to that at the end, and it's the part we're most nervous about."

🎬 站中间，不指屏幕。说到 W 时**真的按一下再关掉**，让观众知道有这东西。

#### S02 · 三个日常场景 — ⏱ 0:30

🎤 "Every day, AI answers for us, acts for us, scores for us. It has a fuller calendar than we do. 😄
And here's the thing — we rarely check. Not because we're lazy. Because the interface gives us nothing to check *with*. A confident sentence looks exactly the same whether it's right or wrong. That's the design problem we're attacking."

🎬 三行依次出现时用激光笔/手指点 HALLUCINATION、OVERREACH、OPAQUE & UNFAIR 三个红标签。
💡 这是全场的"痛点定调"，语速放慢，最后一句停顿 1 秒。

#### S03 · 研究问题 + 文献 — ⏱ 0:25

🎤 "So: what if users could see how the AI reached its answer — *before* they trust it? We tested one integrated mechanism built from three cues: an uncertainty score, a confirmation request, and a score explanation. Each one stands on prior work — on uncertainty expression, calibrated confidence, agent autonomy, and transparent autograders."

🎬 **不要念四个作者名**，屏幕上有。手一挥带过，"standing on prior work" 就够。

#### S04 · 三条线索 / 分工 — ⏱ 0:20

🎤 "Three cues, three hypotheses, three presenters. I take H1 — uncertainty scores. Yibo takes H2, the confirmation gate. Zhuoyi takes H3 — explaining the score.
Same mechanism, three different questions about trust."

🎬 说到谁的名字，用手示意那个人；被点到的人**点头**，不要站起来。

---

### ═══ 第二段 · 方法（Zihan，1:05）═══

#### S05 · 实验设计 — ⏱ 0:30

🎤 "Design first. Thirty-four participants, within-subjects — everyone saw both versions of every task. Cheapest control group in science: people matched against themselves, and they still complained. 😄
Three tasks × two versions, twenty-four plus eighteen decisions each, Wilcoxon signed-rank. Version order randomised; two parallel stimulus sets."

🎬 数字跟着屏幕念，别背错：**34 / 3×2 / 24+18 / Wilcoxon**。

#### S06 · 被试画像 — ⏱ 0:15

🎤 "Who were they? Twenty-six of thirty-four use AI every day. Thirty-two of thirty-four study CS or AI. So we didn't test 'the public'. We tested the people who will build the thing that replaces us. 😄"

🎬 这幕最快，15 秒讲完就切，别展开。

#### S07 · 现场重演说明 — ⏱ 0:20

🎤 "Before the data, the interface. These are the exact screens our thirty-four participants used — deterministic replays. No language model inside, by design. We study transparency; hiding a black box inside our own slides would be a bit on the nose. 😄"

🎬 这是"诚实"人设的关键句，为结尾的白盒做铺垫，**语气要认真**。

---

### ═══ 第三段 · H1（Zihan，2:40）═══

#### S08 · H1 假设 — ⏱ 0:20

🎤 "H1. Compared with a confident assertion, an uncertainty score should help people catch wrong answers — without making them distrust the right ones. That's the whole claim. Detection up, trust intact."

🎬 只讲这一句，然后立刻切任务，不要铺垫。

#### S09 · Task A 黑盒（互动）— ⏱ 0:35

🎤 "Task A, black box. The AI says: *I checked eight students' raw scores — the median is eighty.* Looks fine. You can't verify it, but it's confident, and confidence is very persuasive.
Behind the screen, the real median is seventy-nine. The AI is wrong. In this version, nothing in that message tells you so.
You are participant thirty-five — congratulations, unpaid. 😄 Accept, or reject?"

🎬 **真点一个选项**（建议点 Reject，屏幕会给出真相条），让观众看到"AI 说错了但你看不出来"。

#### S10 · Task A 白盒（互动）— ⏱ 0:30

🎤 "Same question. Same sentence — plus fifty-eight percent confidence. That's the only difference.
Now that sentence stops sounding like a fact and starts sounding like a guess. Nobody told the participant to be suspicious. The number just did the work. That single change is H1."

🎬 切到白盒后**停 2 秒**让观众自己看那条 Confidence 58% 的进度条——这是全片最重要的视觉对比。

#### S11 · 现场投票 — ⏱ 0:20

🎤 "Before I show you the numbers — your call. Raise your hand if you think a visible confidence score makes people better at catching errors.
Keep it up if you're sure. … Great. That's exactly the question we asked thirty-four people."

🎬 举手互动，**一定真的等 3 秒**看观众，然后笑一下再切。

#### S12 · H1 结果 — ⏱ 0:55

🎤 "Here's what thirty-four people did.
Detection of wrong answers: thirty-six point eight to fifty-two point nine percent — plus sixteen point two points, p equals .016.
Adoption of wrong answers: sixty-three point two down to forty-seven point one — significant.
Both directions at once: more suspicious of bad claims, no more paranoid about good ones. **Caution without paralysis.** For a user that's a judgement, not a mood."

🎬 两个箭头方向要念清楚（↑ detection、↓ adoption）。最后四个词一字一顿。

---

### ═══ 第四段 · H2（Yibo，2:30）═══

#### S13 · H2 假设 — ⏱ 0:20

🎤 "Thanks, Zihan. H2 — confirmation before action. Claim: a confirmation request makes people feel safer and more in control, and cuts risky automatic execution.
It sounds obvious. Obvious things are usually wrong, so we measured it."

🎬 接麦时向前半步，站位偏左，把中间留给人机交互的画面。

#### S14 · Task B 黑盒（互动）— ⏱ 0:35

🎤 "Task B, black box. The agent says: *I'm about to send our progress report to the tutor — cc all twelve group members.* It's already in the execution queue. Ten seconds.
Ten seconds is shorter than my attention span, and I'm the one presenting. 😄
You can pause, execute now, or revoke. Do nothing and it sends. Let me… pause it."

🎬 **真按 Pause & inspect**，让计时环冻住、屏幕出现 PAUSED。这是全场最有戏剧性的一秒。

#### S15 · Task B 白盒（互动）— ⏱ 0:25

🎤 "Same agent, white box: one confirmation gate. Nothing auto-executes. Execute — or don't.
That's the entire intervention. A button. Not a dashboard, not a policy, not a committee. A button."

🎬 可以故意点"Don't execute"，屏幕给出 ✓ Blocked，正好接下一句。

#### S16 · 现场投票 — ⏱ 0:15

🎤 "Quick vote: will a confirmation request cut risky executions by a third or more? Hands up if yes.
Hands up if you think people will just click through anyway.
Both hands up? You're our median participant. 😄"

#### S17 · H2 结果 — ⏱ 0:55

🎤 "Risky actions executed: eighty-two point four down to fifty-one point five — minus thirty point nine points, p under .05.
And then the part we did *not* expect: opening the details went forty-four point one to thirty-nine point seven — **not** significant.
So the gate worked, and inspection didn't happen. People didn't read more. They just got stopped.
Why? Because a gate changes the *default*. Reading requires effort; not-reading doesn't. So the honest reading of this result is: we bought safety with interruption, not with understanding.
**Friction, not inspection.** We built a speed bump, not a windshield. That's a design lesson, not a failure."

🎬 这一句是 Yibo 的"金句"，说完停 1.5 秒再接 Zhuoyi。

---

### ═══ 第五段 · H3（Zhuoyi，2:10）═══

#### S18 · H3 假设 — ⏱ 0:20

🎤 "Thank you, Yibo. H3 — explaining the score. Claim: a breakdown raises perceived fairness, and acceptance, of AI scoring.
This is the cue everyone loves and almost nobody tests."

#### S19 · Task C 双版本（互动）— ⏱ 0:30

🎤 "Task C. The AI graded an essay — sixty-two out of one hundred. In the black box, that's it: a number falling out of the sky.
Toggle to white box: content, organization, language, mechanics, with points. Same sixty-two.
Let me toggle it, so you can feel the difference rather than hear me describe it."

🎬 **按 Toggle 来回切一次**，让观众看到同一个分数在两种呈现下的差别。

#### S20 · 现场投票 — ⏱ 0:15

🎤 "Before the data: does an explanation make people accept AI scores — and judge them more wisely? Or does it only make them accept *more*? Those are very different outcomes."

🎬 这幕可以省掉举手，改成口头设问，保持节奏。

#### S21 · H3 结果 — ⏱ 1:05

🎤 "Acceptance went forty-nine point three to sixty-one point zero — plus eleven point seven points, p equals .049. So yes, an explanation helps.
But now the uncomfortable one: accepting an **unreasonable** score went thirty point nine to thirty-eight point two — also up. Not significant, but up.
The explanation **persuaded**. It did not yet **enlighten**.
Think of it as a very good lawyer: it wins the case, and that's not the same thing as the truth. 😄
What would make it enlightening? Evidence you can check — the rubric, the sentence it penalised, the comparable essay. A breakdown tells you *where* the points went; it doesn't let you *disagree* with them."

🎬 p = .049 这个"擦边显著"要如实说，不要含糊——评委一定会注意到。最后比喻说完立刻切。

---

### ═══ 第六段 · 收束（Zihan，0:30）═══

#### S22 · 三合一 — ⏱ 0:30

🎤 "One mechanism, three findings.
**Uncertain** — sixteen points more errors caught, correct answers still accepted.
**Gate** — risk down a third, through friction, not reading.
**Justify** — acceptance up, including of bad scores. Persuasion is not discernment.
Three cheap UI decisions, three measurable behavioural effects."

🎬 三个词配三个手势（不确定 → 闸 → 解释），节奏像鼓点。

---

### ═══ 第七段 · 落地（Yibo，0:40）═══

#### S23 · 产品与监管建议 — ⏱ 0:40

🎤 "Three rules for builders.
Irreversible actions — email, payments, bookings — get a hard stop. Even a gate nobody reads cut risky runs by thirty-seven percent.
Models that answer should show calibrated uncertainty. Our participants caught sixteen points more hallucinations when the model said how sure it was.
And grading needs checkable evidence — otherwise the breakdown is only persuasion."

🎬 三段式，每段一个手指；不要读屏幕上已有的长句。

---

### ═══ 第八段 · 局限（Zhuoyi，0:40）═══

#### S24 · 四个局限 — ⏱ 0:40

🎤 "What this pilot cannot say.
Thirty-four classmates, one campus, mostly CS — general users may differ.
Synthetic tasks with no stakes: a wrong median costs nothing, and real stakes change both trust and friction.
Fixed task order H1 to H3, so fatigue and learning may confound the later tasks.
And the ten-second window. One participant wrote — I quote — *'Ten seconds before the AI takes an automatic action is too short. Better have an accept/decline button without a time limit — like Claude.'*
A participant roasted our design and cited a competitor in the same sentence. 😄
Next: larger sample, real stakes, tracked inspection, adjustable timing."

🎬 引语**照着读**，别转述——原话最有杀伤力。这是加分项，语气要诚恳。

---

### ═══ 第九段 · 结论 + 白盒（Zihan，0:45）═══

#### S25 · 结论与自我审计 — ⏱ 0:45

🎤 "Conclusion. Eight hundred and sixteen decisions, thirty-four people, two of three hypotheses supported — and one that taught us more by failing.
Transparency changed **behaviour**, not just opinions.
Show the uncertainty. Gate the action. Explain the score — and make the explanation checkable.
And now the part we promised. Everything you just saw was selected, framed and simplified by three people. That is a black box too.
Press W — and this deck shows its evidence, what it leaves out, and what it wants from you. That's not a gimmick; it's the same standard we're asking interfaces to meet."

🎬 **真按 W 打开白盒面板**，停 4–5 秒让观众看清结构，再关。这是全场的设计高点。

---

### ═══ 第十段 · 实时 AI 白盒演示（Zihan，1:15）═══

#### S26 · Live model（互动，压轴）— ⏱ 1:15

🎤 "One more thing. Everything before this was a replay. This one is live — a real reasoning model, streamed.
Left pane: the trace it thinks with. Right pane: what it tells you. **The gap between them is the product.**
Let's ask it something real. [typed/or preset question]
Watch the trace. Red is high-stakes — dosage, termination, legal. Orange is a risk it names. Yellow is hedges. Green is reassurance. Blue is neutral steps.
Notice where the red appears — usually *before* the answer does. That gap, the thinking you don't normally see, is exactly what we spent fourteen minutes arguing should be visible.
Thank you — questions welcome."

🎬 **演示顺序（关键）**：
1. 先点一个预设高敏感问题（提到"medical advice"或"contract risk"），红色必然出现，视觉最抓人。
2. 点 **RUN**，让流式输出跑 3–4 秒再说话（沉默比解说更有压迫感）。
3. 手指从左窗（思考轨迹）滑到右窗（答案），说 "the gap between them is the product"。
4. **兜底**：若网络/代理失败，页面会自动回落 REPLAY——这时改口说 "we're on the deterministic replay — same interface, pre-recorded trace"，**不解释技术原因**，直接继续讲红色在左窗出现的位置。

---

## 3 · 换人与站姿

| 时刻 | 动作 |
|---|---|
| S01–S12 | Zihan 居中偏右，屏幕右侧留白给他走动 |
| S13 | Yibo 从左侧上前一步，Zihan 后退半步但仍留在台上（不要下场，太打断） |
| S18 | Zhuoyi 上前，Yibo 后退；三人呈浅弧形，不要并排站成"三根柱子" |
| S22 | Zihan 回到中间做收束（三人里唯一"回到中心"的位置，视觉上像总结） |
| S23 / S24 | Yibo、Zhuoyi 各自上前一步，只讲一屏就退 |
| S25–S26 | Zihan 独立完成，另外两人退到两侧，**不要看电脑屏幕**，看观众 |

**手不要插兜、不要抱臂**；讲数字时手比方向（↑ ↓），讲"闸"时手掌竖切一下。

---

## 4 · Q&A 预案（按被问概率排序）

| 问题 | 回答要点（20–30 秒） |
|---|---|
| **p = .049 是不是太擦边？多重比较有没有校正？** | 三个假设各自独立预注册方向；H3 是边缘显著，我们如实报告不美化。样本 34 的功效有限，这正是我们说"pilot"的原因。 |
| **16 个百分点在现实里有意义吗？** | 每 6 个错误答案多抓到 1 个；对高风险场景（剂量、合同）这个量级足够改变后果。效应量我们也报了。 |
| **为什么用被试内设计？** | 个体差异远大于操纵效应，被试内能把 N=34 变成 34 个"自己的对照"；代价是顺序效应，所以版本顺序随机、任务顺序固定并在局限里承认。 |
| **H2 里没人看细节，那"控制感"是真的还是错觉？** | 我们测的是行为（执行率 −30.9pp）和自评控制感，两者同向；但"感觉被保护"不等于"理解风险"，这一点写进了局限。 |
| **62% 的人注意到线索，剩下 38% 呢？** | 操纵检查通过率 62%，说明线索可见但不刺眼；未注意者的行为效应更弱——这是我们的天花板，也是"线索要更显眼"的设计依据。 |
| **任务是人造的，真实场景会一样吗？** | 不会完全一样。真实 stakes 会同时抬高信任需求与摩擦成本，所以我们下一步做真实 stakes + 行为追踪（停留时间、展开率）。 |
| **Live demo 用的是什么模型？数据去哪了？** | deepseek-reasoner，temperature 0.7，prompt v1；key 由我们自己的代理持有，请求不落库、不训练。左边的 trace 是模型自己输出的 reasoning，不是我们编的。 |
| **这套东西真能落地吗？成本呢？** | 三条都是廉价 UI：一个进度条、一个按钮、一个分项表。真正的成本不在实现，在**产品是否愿意暴露不确定性**。 |

---

## 5 · 演示日 Checklist

**前一晚**
- [ ] 打开线上页，硬刷新一次，确认三处动画（跳跃点合体、倒计时环、白盒面板）正常
- [ ] 确认 `W` 键、`→` `←`、点击/滚动翻页都能用
- [ ] 把 34 人 / 816 决策 / 三个 p 值抄在卡片上，防嘴瓢

**开讲前 10 分钟**
- [ ] **系统代理打开**（否则 live AI 会回落 REPLAY）
- [ ] 音量确认：点两下按钮能听到 tick 声；看标签页喇叭图标**没有斜杠**
- [ ] 浏览器建议 Chrome（Safari 也可，但输出延迟更高）
- [ ] 关掉通知、关掉其他标签页、勿扰模式
- [ ] 页面缩放到 100%，确认投影分辨率下 26 幕都不溢出

**万一**
- 没声音 → 点标签页喇叭解除静音；仍无声 → 忽略，继续讲（内容不依赖音效）
- Live AI 卡住 → 说 "we're on the deterministic replay"，不解释
- 超时 → 砍 S06 的笑点、S20、S23 的第三条

---

## 6 · 一页速记（上台前看这张就够）

```
Zihan  0:00 痛点 → 研究问题 → 分工 → 方法(34/3×2/Wilcoxon) → 重演声明
Zihan  2:50 H1：黑盒说中位数 80（真值 79）→ 白盒加 58% → 投票
       H1 数据 36.8→52.9 (+16.2pp, p=.016) | 采纳 63.2→47.1 | 警觉而不多疑
Yibo   5:30 H2：10 秒自动发邮件 → Pause → 白盒一个按钮 → 投票
       H2 数据 82.4→51.5 (−30.9pp) | 看细节 44.1→39.7 n.s. | 是摩擦不是查看
Zhuoyi 8:00 H3：62 分 → 切分项 → 投票
       H3 数据 49.3→61.0 (+11.7pp, p=.049) | 不合理分数 30.9→38.2 n.s. | 说服≠明辨
Zihan 10:10 三合一 → Yibo 三条落地 → Zhuoyi 四条局限
Zihan 12:00 结论(816 决策/2 of 3) → 按 W 开白盒 → Live AI：左脑 vs 右嘴
```
