---
sidebar_position: 1
title: 对话 API
sidebar_label: 对话 API
---

### 对话型应用 API
1. 对话 API ```post /chat-messages``` 可配置 SSE

这里有情求参数配置了 conversation_id 会话 ID，而应用 id 实际是创建 token 的时候隐含了。

2. 某条消息的反馈 API ```post /messages/{message_id}/feedbacks```

3. 消息的下一步问题建议 ```get /messages/{message_id}/suggested```

4. 会话历史消息 ```get /messages```

5. 会话列表 ```get /conversations```

6. 会话重命名 ```post /conversations/{conversation_id}/name```

7. 删除会话 ```delete /conversations/{conversation_id}```

8. 语音转文字 ```post /audio-to-text```

9. 获取应用配置信息 ```get /parameters```
