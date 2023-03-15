import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useDropzone } from 'react-dropzone';
import axios, { AxiosError } from "axios";
import { Snackbar,Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton'
import CreateIcon from '@mui/icons-material/Create';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';


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
  
  const [title,setTitle] = React.useState<string>("");
  const [tags,setTags] = React.useState<string[]>([]);
  const [website,setWebsite] = React.useState<string>("");
  const [location,setLocation] = React.useState<string>("");
  const [since,setSince] = React.useState<string>("");
  const [base64Image, setBase64Image] = React.useState("");
  const [body,setBody] = React.useState<string>("");

  const [successSnackBarOpen,setSuccessSnackBarOpen] = React.useState(false);
  const [successMessage,setSuccessMessage] = React.useState("");
  const [errorSnackBarOpen,setErrorSnackBarOpen] = React.useState(false);
  const [errorMessage,setErrorMessage] = React.useState("");

  const handleClose = () => {
    setTitle("");
    setTags([]);
    setWebsite("");
    setLocation("");
    setSince("");
    setBase64Image("");
    setBody("");
    setOpen(false);
  }


  const endpointUrl = "https://honnaka-backend.azurewebsites.net/api/v1/post";

  function handleFileDrop(acceptedFiles) {
    console.log(acceptedFiles)
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setBase64Image(reader.result);
    };
  }

  function handleImageRemove() {
    setBase64Image("");
  }

  const handleSuccessSnackBarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessSnackBarOpen(false);
  };

  const handleErrorSnackBarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorSnackBarOpen(false);
  };

  

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

    if(!title || !location || !body){
      setErrorMessage("未記入の項目があります");
      setErrorSnackBarOpen(true);
      return;
    }

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
      setSuccessMessage("投稿に成功しました");
      setSuccessSnackBarOpen(true);
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("投稿に失敗しました");
      setErrorSnackBarOpen(true);
    }
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <CreateIcon/>
      </IconButton>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                新規投稿
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justifyContent="flex-end">
                <Button size="small" variant ="outlined" onClick={handleClose}>
                <CloseIcon/>
               </Button>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
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
                required
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
            required
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
          <Grid container justifyContent="center">
            <Grid item >
              <Button style={{ marginTop: '1rem' }} size="small" type ="submit" variant ="contained" onClick={newPost}>
                <SendIcon/>
                </Button>
            </Grid>
          </Grid>       
        </Box>
      </Modal>
      <Snackbar
        open={errorSnackBarOpen}
        autoHideDuration={3000}
        onClose={handleErrorSnackBarClose}
        >
        
        <Alert onClose={handleErrorSnackBarClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>

      </Snackbar>
      <Snackbar
        open={successSnackBarOpen}
        autoHideDuration={3000}
        onClose={handleSuccessSnackBarClose}
        message = {successMessage}
        >
        
        <Alert onClose={handleSuccessSnackBarClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

