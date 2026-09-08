LIFE SIM CORE 2.2

修复 / 新增：
- Elyn 六方向重新精确裁切，修头发碎片 bug
- Shawn 同步统一
- 衣服系统完全换掉：不再用矩形 overlay
- 每人 40 套，共 80 套；每套都有 6 个方向，走路时也保持衣服
- 任务快速面板放大
- 新增完整任务手册：今日 / 每周 / 情侣 / 特殊 / 成就 / 系统说明
- Coins：消费
- EXP：升级，不会花
- Love：情侣关系，0–1000，5个阶段
- Type 字：Enter输入/发送、头顶泡泡、最近50条聊天
- 本机双人：Elyn=WASD，Shawn=方向键，可同时移动
- 同浏览器两个标签页：相同房间码可同步人物位置与 typed chat
- 跨设备真正联网仍需要 Firebase/Supabase/WebRTC 后端，这版没有假装静态网页已跨设备联网

上传：
1. 解压 ZIP
2. 把 index.html、app.js、styles.css、assets 拖进当前 StackBlitz
3. Replace / Overwrite
4. 原本 scenes / food / fish / fridge / cars 等不要删
