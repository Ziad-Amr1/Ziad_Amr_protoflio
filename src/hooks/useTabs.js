// src/hooks/useTabs.js
import { useState } from "react";

/**
 * Custom hook to manage active tab state
 * @param {string[]} categories - Array of available tab IDs
 * @param {string} [defaultCategory] - Optional default tab ID
 * @returns {{ activeTab: string, changeTab: (category: string) => void, isActive: (category: string) => boolean }}
 */
export function useTabs(categories, defaultCategory) {
  const [activeTab, setActiveTab] = useState(defaultCategory || categories[0]);

  const changeTab = (category) => {
    if (categories.includes(category)) {
      setActiveTab(category);
    }
  };

  const isActive = (category) => activeTab === category;

  return { activeTab, changeTab, isActive };
}
