import React, { useState } from "react";
import "./conversation.scss";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Conversations: React.FC = () => {
  const { conversations } = useGetConversations();
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const filteredRows = conversations.filter((row) =>
    row.otherParticipant.lastName
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );
  return (
    <>
      <TextField
        id="searchText"
        label="Search Conversation"
        variant="outlined"
        name="searchText"
        value={searchText}
        onChange={handleSearch}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      {filteredRows.map((conversation) => (
        <Conversation
          key={conversation.conversationId}
          conversation={conversation}
        />
      ))}
    </>
  );
};

export default Conversations;
