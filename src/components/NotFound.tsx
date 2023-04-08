import {useNavigate} from 'react-router-dom';
import {Typography, Button} from '@mui/material';
import '../App.css';

export const NotFound = () => {
    const navigate = useNavigate();
    const onClick = () => {navigate(-1)};

    return <div className='not-found-page'>
        <Typography variant='h2' className='not-found-title'>NOT FOUND</Typography>
        <Button sx={{marginTop: '50px', width: '150px', height: '60px'}} onClick={onClick}>Go back</Button>
    </div>
}