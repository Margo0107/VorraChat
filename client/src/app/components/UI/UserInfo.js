"use client";

import { useState } from "react";

export default function UserInfo({
  onClose,
  avatarColor,
  setAvatarColor,
  currentChat,
}) {
  return (
    <section className="absolute top-17 left-3 z-50 rounded-lg bg-gray-900/70 shadow-xl backdrop-blur-sm">
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-3 border-b border-gray-500 p-4 py-2"
      >
        <div
          className="h-7 w-7 rounded-full bg-pink-500"
          style={{ backgroundColor: avatarColor }}
        ></div>
        <input
          type="color"
          value={avatarColor}
          onChange={(e) => setAvatarColor(e.target.value)}
        />
        <p className="font-semibold"> {currentChat?.userName}</p>
      </div>
      <div className="p-4 py-2">
        <button>logout</button>
      </div>
    </section>
  );
}
