import React from 'react';

const VideoPlayer = () => {
    return (
        <div>
        <h1>Video Player</h1>
        <iframe width="560" height="315" src="https://www.youtube.com/watch?v=McvMVqdK_hQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    );
    };

export default VideoPlayer;