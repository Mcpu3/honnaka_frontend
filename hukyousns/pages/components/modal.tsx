import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useDropzone } from 'react-dropzone';
import axios, { AxiosError } from "axios";


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};





export default function PostForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title,setTitle] = React.useState<string>("");
  const [tags,setTags] = React.useState<string[]>([]);
  const [website,setWebsite] = React.useState<string>("");
  const [location,setLocation] = React.useState<string>("");
  const [since,setSince] = React.useState<string>("");
  const [image,setImage] = React.useState<string>("");
  const [body,setBody] = React.useState<string>("");


  const endpointUrl = "https://honnaka-backend.azurewebsites.net/api/v1/post";

  const newPost = async () => {
    const requestData = {
      title: title,
      tags: tags,
      website: website,
      location: location,
      since: since,
      image: image,
      body: body
    };

    try {
      const accessToken = localStorage.getItem("access_token");
      if(!accessToken){
        window.location.href ="./signin";
        return;
      }
      const response = await axios.post(endpointUrl, requestData,
        {
          headers:{
            Authorization:`Bearer ${accessToken}`
          }
        });
      console.log("Success:", response);
      requestData.title="";
      requestData.tags=[];
      requestData.website="";
      requestData.location="";
      requestData.since="";
      requestData.image="";
      requestData.body="";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            新規投稿
          </Typography>
          <TextField
            autoFocus
            margin="normal"
            id="title"
            label="タイトル"
            type="text"
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            autoFocus
            margin="normal"
            id="tags"
            label="タグ"
            type="text"
            variant="standard"
            value={tags}
            onChange={(e) => setTags([e.target.value])}
          />
          
          <TextField
            autoFocus
            margin="normal"
            id="location"
            label="位置情報"
            type="text"
            variant="standard"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        
          <TextField
            autoFocus
            margin="normal"
            id="website"
            label="サイトURL"
            type="text"
            variant="standard"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <TextField
            autoFocus
            margin="normal"
            id="since"
            label="いつから？"
            type="text"
            variant="standard"
            value={since}
            onChange={(e) => setSince(e.target.value)}
          />

          <TextField
            autoFocus
            margin="normal"
            id="body"
            label="本文"
            type="text"
            multiline
            rows={(4)}
            variant="outlined"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <Button size="small" variant ="contained" onClick={newPost}>Post</Button>
        </Box>
      </Modal>
    </div>
  );
}