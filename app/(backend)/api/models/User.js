import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    institution: { type: String },
    degree: { type: String },
    field_of_study: { type: String },
    start_year: { type: Number },
    end_year: { type: Number },
});

const experienceSchema = new mongoose.Schema({
    company: { type: String },
    position: { type: String },
    start_year: { type: Number },
    end_year: { type: String },
});

const contactInfoSchema = new mongoose.Schema({
    website_url: { type: String },
    phone_number: { type: String },
    address: { type: String },
});

const jobPreferencesSchema = new mongoose.Schema({
    job_title: { type: [String] },
    location_type: { type: [String] },
    start_date: { type: String },
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    headline: { type: String },
    country: { type: String },
    city: { type: String },
    about: { type: String },
    skills: { type: [String] },
    language: { type: [String] },
    profile_url: {
        type: String,
        default: "https://res.cloudinary.com/dcen2mnhx/image/upload/v1718846232/3h0vrtch1zepjr4p54aja8i9x_1_d6ltue.webp",
    },
    banner_url: {
        type: String,
        default: "https://res.cloudinary.com/dcen2mnhx/image/upload/v1718846232/3h0vrtch1zepjr4p54aja8i9x_d3hbjc.webp",
    },
    education: educationSchema,
    experience: experienceSchema,
    contact_info: contactInfoSchema,
    job_preferences: jobPreferencesSchema,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
