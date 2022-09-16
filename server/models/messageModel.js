const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      title: { type: String, required: true },
      text: { type: String, required: true },
    },
    read: {
      type: Boolean,
      default: false,
    },
  
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
