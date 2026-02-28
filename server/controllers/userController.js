export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(200).json({ user: null });
    }
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(`Error From Get Current User ${error}`);
    return res.status(500).json({ message: `Error Occoured ${error}` });
  }
};
