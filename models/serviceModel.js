const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const serviceSchema = new mongoose.Schema(
  {
    serviceId: { type: Number, unique: true }, // Auto-incrementing ID
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    details: [{ type: String }],
    technologies: [{ type: String }],
  },
  { timestamps: true }
);

// Apply auto-increment plugin
serviceSchema.plugin(AutoIncrement, { inc_field: "serviceId" });

module.exports = mongoose.model("Service", serviceSchema);
