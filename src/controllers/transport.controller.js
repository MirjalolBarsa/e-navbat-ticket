import Transport from "../models/transport.model.js";

export const createTransport = async (req, res) => {
  try {
    const transport = await Transport.create(req.body);
    res.status(201).json(transport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllTransports = async (req, res) => {
  const transports = await Transport.find();
  res.json(transports);
};

export const getTransportById = async (req, res) => {
  const transport = await Transport.findById(req.params.id);
  if (!transport) return res.status(404).json({ message: "Not found" });
  res.json(transport);
};

export const updateTransport = async (req, res) => {
  try {
    const transport = await Transport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!transport) return res.status(404).json({ message: "Not found" });
    res.json(transport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTransport = async (req, res) => {
  const transport = await Transport.findByIdAndDelete(req.params.id);
  if (!transport) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted successfully" });
};
