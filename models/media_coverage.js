const mongoose = require('mongoose');
const schema = mongoose.Schema;

const written_media_schema = new schema( {
    country: String,
    date: Date,
    title: String,
    source: String,
    link: String
});

const audio_media_schema = new schema( {
    country: String,
    date: Date,
    title: String,
    source: String,
    link: String
});

const video_media_schema = new schema( {
    country: String,
    date: Date,
    title: String,
    source: String,
    link: String
});

const media_coverage_schema = new schema( {
    written_media: written_media_schema,
    audio_media: audio_media_schema,
    video_media: video_media_schema
});