import React, { useState, useEffect } from 'react';
// import { render } from 'react-dom';
import { storage } from './firebase';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LinearProgressWithLabel(props) {
    return (
        <Box display='flex' alignItems='center'>
            <Box width='100%' mr={1}>
                <LinearProgress variant='determinate' {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography
                    variant='body2'
                    color='textSecondary'>{`${Math.round(
                    props.value
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

const App = () => {
    const classes = useStyles();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 0 : prevProgress + progress
            );
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    // const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        setUrl(url);
                    });
            }
        );
    };

    // console.log('image: ', image);

    return (
        <div>
            <div className={classes.root}>
                <LinearProgressWithLabel value={progress} />
            </div>
            {/* <progress value={progress} max='100' /> */}
            <br />
            <br />
            <input type='file' onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            <br />
            {url}
            <br />
            {/* eslint-disable-next-line */}
            <img
                width='300'
                height='300'
                src={url || 'http://via.placeholder.com/300'}
                alt='firebase-image'
            />
        </div>
    );
};

export default App;
