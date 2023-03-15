import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useDropzone } from 'react-dropzone';
import axios, { AxiosError } from "axios";
import IconButton from '@mui/material/IconButton'
import CreateIcon from '@mui/icons-material/Create';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
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
  const [base64Image, setBase64Image] = React.useState("");
  const [body,setBody] = React.useState<string>("");


  const endpointUrl = "https://honnaka-backend.azurewebsites.net/api/v1/post";

  function handleFileDrop(acceptedFiles: any) {
    console.log(acceptedFiles)
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      const result = (reader.result as string);
      setBase64Image(result);
    };
  }

  function handleImageRemove() {
    setBase64Image("");
  }

  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleFileDrop ,maxFiles: 1});


  const newPost = async () => {
    const requestData = {
      title: title,
      tags: tags,
      website: website,
      location: location,
      since: since,
      image: base64Image,
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
      <IconButton onClick={handleOpen}>
        <CreateIcon/>
      </IconButton>
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
          <Grid container spacing={1}>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
          </Grid>

          <TextField
            autoFocus
            margin="normal"
            id="body"
            label="本文"
            type="text"
            multiline
            fullWidth
            rows={(4)}
            variant="outlined"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>ここにファイルをドロップしてください</p>
            ) : (
              <Button variant="contained" component="span">
                アップロードする画像ファイルを選択
              </Button>
            )}
          </div>
          {base64Image && (
            <div>
              <h2>選択されたファイル</h2>
              <img src={base64Image} alt="uploaded file" />
              <Button variant="contained" onClick={handleImageRemove}>画像を取り消す</Button>
            </div>
          )}

          <Button style={{ marginTop: '1rem' }} size="small" variant ="contained" onClick={newPost}>Post</Button>
        </Box>
      </Modal>
    </div>
  );
}

