// ============================================================
// Завдання 5 — Перекладач емодзі
// ============================================================
 
const dictionary = {
  "сонце":    "☀️",
  "хмара":    "☁️",
  "дощ":      "🌧️",
  "сніг":     "❄️",
  "блискавка":"⚡",
  "серце":    "❤️",
  "усмішка":  "😊",
  "сум":      "😢",
  "сміх":     "😂",
  "кава":     "☕",
  "піца":     "🍕",
  "яблуко":   "🍎",
  "собака":   "🐶",
  "кіт":      "🐱",
  "книга":    "📚",
  "телефон":  "📱",
  "комп":     "💻",
};
 
/**
 * Перекладає слова в тексті на емодзі.
 *
 * - Case-insensitive: "СОНЦЕ", "Сонце", "сонце" → "☀️"
 * - Розділові знаки зберігаються: "сонце," → "☀️,"
 * - Слова, яких немає у словнику, лишаються без змін
 *
 * translate("сьогодні сонце і усмішка")
 * // "сьогодні ☀️ і 😊"
 */
function translate(text) {
  return text.split(" ").map(token => {
    // Відокремлюємо розділові знаки до і після слова
    const match = token.match(/^(\P{L}*)([\p{L}]+)(\P{L}*)$/u);
    if (!match) return token;
 
    const [, before, word, after] = match;
    const emoji = dictionary[word.toLowerCase()];
    return emoji !== undefined ? before + emoji + after : token;
  }).join(" ");
}
 
/**
 * Зворотний переклад: емодзі → слово (українською).
 */
function translateReverse(text) {
  // Будуємо зворотний словник: емодзі → слово
  const reversed = Object.fromEntries(
    Object.entries(dictionary).map(([word, emoji]) => [emoji, word])
  );
 
  // Сортуємо емодзі за довжиною (спадно), щоб жадібно знаходити
  // багатосимвольні емодзі (наприклад 🌧️ = 2 code points) першими
  const emojis = Object.keys(reversed).sort((a, b) => [...b].length - [...a].length);
 
  // Скануємо рядок по одному Unicode code point за допомогою [...text]
  const chars = [...text];
  const result = [];
  let i = 0;
 
  while (i < chars.length) {
    const found = emojis.find(emoji => {
      const len = [...emoji].length;
      return chars.slice(i, i + len).join("") === emoji;
    });
 
    if (found) {
      result.push(reversed[found]);
      i += [...found].length;
    } else {
      result.push(chars[i]);
      i++;
    }
  }
 
  return result.join("");
}
 
// ============================================================
// Тестові кейси
// ============================================================
console.log(translate("сьогодні сонце і усмішка"));
 "сьогодні ☀️ і 😊"
 
console.log(translate("СОНЦЕ і Хмара. Дощ?"));
 "☀️ і ☁️. 🌧️?"
 
console.log(translateReverse("☀️ і ☁️"));
 "сонце і хмара"




