import { useRef, useEffect } from "react";
import "emoji-picker-element";

const EmojiPickerWrapper = ({ onChange }) => {
  const emojiPickerRef = useRef();

  useEffect(() => {
    const emojiPicker = emojiPickerRef.current;

    const handleEmojiClick = (event) => {
      const selectedEmoji = event.detail.emoji;
      // Call the provided onChange function with the selected emoji
      if (onChange) {
        onChange(selectedEmoji);
      }
    };
    emojiPicker.addEventListener("emoji-click", handleEmojiClick);

    return () => {
      emojiPicker.removeEventListener("emoji-click", handleEmojiClick);
    };
  }, [onChange]);

  return <emoji-picker class="light" ref={emojiPickerRef}></emoji-picker>;
};

export default EmojiPickerWrapper;
