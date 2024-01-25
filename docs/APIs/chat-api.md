---
sidebar_position: 1
title: Chat APIs
sidebar_label: Chat APIs
---

### Conversational Application API
1. Conversational API ```post /chat-messages``` with configurable SSE

   The request parameter conversation_id is used to identify the session ID, while the application ID is implicitly included during token creation.

2. Feedback API for a specific message ```post /messages/{message_id}/feedbacks```

3. Next suggested question for a message ```get /messages/{message_id}/suggested```

4. Conversation history of messages ```get /messages```

5. List of conversations ```get /conversations```

6. Rename a conversation ```post /conversations/{conversation_id}/name```

7. Delete a conversation ```delete /conversations/{conversation_id}```

8. Speech-to-text ```post /audio-to-text```

9. Get application configuration information ```get /parameters```
