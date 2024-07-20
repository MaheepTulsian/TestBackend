import mongoose from 'mongoose';

const { Schema } = mongoose;

const alumniSchema = new Schema({
    batch: {
        type: Number,
        required: true
    },
    collegeId: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    personalEmail: {
        type: String,
        required: true,
        unique: true
    },
    collegeEmail: {
        type: String,
        required: true,
        unique: true
    },
    programEnrolled: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        required: true,
        min: 0.0,
        max: 10.0
    },
    linkedInProfile: {
        type: String,
        required: false
    },
    placementCompany: {
        type: String,
        default: null
    },
    higherEducationCourse: {
        type: String,
        default: null
    },
    startUpCompany: {
        type: String,
        default: null
    },
    salary: {
        type: Number,
        default: null
    },
    jobLocation: {
        type: String,
        default: null
    },
    registeredOnAlumniPortal: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

alumniSchema.pre('save', function(next) {
    if (this.placementCompany || this.higherEducationCourse || this.startUpCompany) {
        next();
    } else {
        next(new Error('One of Placement Company, Higher Education Course, or Start Up Company must be provided.'));
    }
});

const Alumni = mongoose.model('Alumni', alumniSchema);

export default Alumni;
