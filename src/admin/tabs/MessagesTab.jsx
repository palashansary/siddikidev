import React, { useCallback, useEffect, useState } from "react";
import { get, limitToLast, orderByChild, query, ref, remove, update } from "firebase/database";
import { FiMail, FiRefreshCw, FiTrash2 } from "react-icons/fi";
import { useAdmin } from "../AdminContext";
import { Button, Panel } from "../ui";

const formatTime = (timestamp) =>
  timestamp
    ? new Date(timestamp).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
    : "Date unknown";

const MessagesTab = () => {
  const { db, notify } = useAdmin();
  const [messages, setMessages] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const snapshot = await get(query(ref(db, "messages"), orderByChild("createdAt"), limitToLast(200)));
      const list = Object.entries(snapshot.val() || {}).map(([id, message]) => ({ id, ...message }));
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setMessages(list);
    } catch (error) {
      notify(`Couldn't load messages: ${error.message}`, "error");
      setMessages([]);
    }
  }, [db, notify]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggleRead = async (message) => {
    try {
      await update(ref(db, `messages/${message.id}`), { read: !message.read });
      setMessages((list) => list.map((m) => (m.id === message.id ? { ...m, read: !m.read } : m)));
    } catch (error) {
      notify(error.message, "error");
    }
  };

  const deleteMessage = async (message) => {
    if (!window.confirm(`Delete the message from ${message.name || "this sender"}?`)) return;
    try {
      await remove(ref(db, `messages/${message.id}`));
      setMessages((list) => list.filter((m) => m.id !== message.id));
    } catch (error) {
      notify(error.message, "error");
    }
  };

  const unread = messages?.filter((message) => !message.read).length || 0;

  return (
    <Panel
      title="Messages"
      description={messages ? `${messages.length} messages, ${unread} unread. From the contact form.` : undefined}
      actions={
        <Button onClick={refresh}>
          <FiRefreshCw /> Refresh
        </Button>
      }
    >
      {messages === null && <p className="text-sm text-slate-400">Loading…</p>}
      {messages?.length === 0 && <p className="text-sm text-slate-400">No messages yet.</p>}
      <ul className="space-y-3">
        {messages?.map((message) => {
          const phone = message.phone || message.number;
          return (
            <li
              key={message.id}
              className={`rounded-xl border p-4 ${
                message.read ? "border-slate-800 bg-slate-950/30" : "border-emerald-900 bg-emerald-950/20"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium text-slate-100">
                    {!message.read && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />}
                    {message.name || "Anonymous"}
                  </p>
                  <p className="break-all text-sm text-slate-400">
                    {message.email}
                    {phone && ` · ${phone}`}
                  </p>
                </div>
                <p className="text-xs text-slate-500">{formatTime(message.createdAt)}</p>
              </div>
              <p className="mt-3 whitespace-pre-line break-words text-sm text-slate-200">{message.message}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {message.email && (
                  <a
                    href={`mailto:${message.email}?subject=${encodeURIComponent("Re: your message")}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-1.5 text-sm hover:bg-slate-800"
                  >
                    <FiMail /> Reply
                  </a>
                )}
                <Button onClick={() => toggleRead(message)}>
                  {message.read ? "Mark unread" : "Mark read"}
                </Button>
                <Button variant="danger" aria-label="Delete message" onClick={() => deleteMessage(message)}>
                  <FiTrash2 />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
};

export default MessagesTab;
