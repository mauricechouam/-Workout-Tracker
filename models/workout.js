const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Workoutdb = new Schema({
    day: { type: Date, default: Date.now },
    numExercises: { type: Number },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Enter an exercise type"
            },
            name: {
                type: String,
                trim: true,
                required: "Enter an exercise name"
            },
            duration: {
                type: Number,
                required: "Enter an exercise duration in minutes"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


// adds a dynamically-created property to schema
Workoutdb.virtual("totalDuration").get(function () {
    // "reduce" array of exercises down to just the sum of their durations
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model('Workout', Workoutdb);

module.exports = Workout;