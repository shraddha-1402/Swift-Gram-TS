import { Dispatch, useState, MouseEvent } from "react";
import { IconButton, Popover, Stack } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { emojis } from "../../constants";

const EmojiPopover = ({
  setPostData,
}: {
  setPostData: Dispatch<
    React.SetStateAction<{
      postContent: string;
      postImageURL: string;
    }>
  >;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleIconClick = (emoji: string) => {
    setPostData((prev) => ({
      ...prev,
      postContent: `${prev.postContent}${emoji}`,
    }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        <EmojiEmotionsIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Stack
          direction="row"
          flexWrap="wrap"
          width="16rem"
          justifyContent="center"
        >
          {emojis.map((emoji, index) => (
            <IconButton
              onClick={() => handleIconClick(emoji)}
              color="inherit"
              key={index}
            >
              {emoji}
            </IconButton>
          ))}
        </Stack>
      </Popover>
    </div>
  );
};

export { EmojiPopover };
