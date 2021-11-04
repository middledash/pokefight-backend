const Trainer = require("../models/Trainer");

const list_trainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (e) {
    res.status(500).send(e);
  }
};

const find_trainer = async (req, res) => {
  const { id } = req.params;
  try {
    const trainer = await Trainer.findById(id);
    if (!trainer) return res.status(404).send("Trainer not found!");
    res.json(trainer);
  } catch (e) {
    res.status(500).send(e);
  }
};

const create_trainer = async (req, res) => {
  const { first_name, last_name, class_type } = req.body;
  // console.log(first_name, last_name, class_type);

  // Trainer.create({ first_name, last_name, class_type })
  //   .then((data) => res.json(data))
  //   .catch((err) => console.log(err));

  // Async/Await
  try {
    const newTrainer = await Trainer.create({
      first_name,
      last_name,
      class_type,
    });
    res.json(newTrainer);
  } catch (e) {
    res.status(500).send(e);
  }
};

const partially_update_trainer = async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;

  try {
    const { modifiedCount } = await Trainer.updateOne(
      {
        _id: id,
      },
      {
        [key]: value,
      }
    );
    if (!modifiedCount) return res.status(404).send("Trainer not found!");
    res.send("Trainer updated successfully");
  } catch (e) {
    res.status(500).send(e);
  }
};

const fully_update_trainer = async (req, res) => {
  const { id } = req.params;
  // const { first_name, last_name, class_type } = req.body
  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(
      id, // id of the trainer
      { ...req.body }, // what I want to update
      { new: true, runValidators: true } // returns the updated document after the modifications + update validators
    );
    if (!updatedTrainer) return res.status(404).send("Trainer not found!");
    res.json(updatedTrainer);
  } catch (e) {
    res.status(500).send(e);
  }
};

const delete_trainer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrainer = await Trainer.findOneAndDelete({ _id: id });
    if (!deletedTrainer) return res.status(404).send("Trainer not found!");
    res.json(deletedTrainer);
  } catch (e) {
    res.status(500).send(e);
  }
};

const delete_trainers = async (req, res) => {
  const { condition } = req.body;
  try {
    if (!condition) {
      const { deletedCount } = await Trainer.deleteMany({});
      return res.send(
        `You have deleted ${deletedCount} trainers from the database`
      );
    }
    const { key, value } = condition;

    if (!key || !value) {
      return res
        .status(400)
        .send("You must provide a key or a value to delete many trainers");
    }
    const { deletedCount } = await Trainer.deleteMany({ [key]: value });

    if (!deletedCount) {
      return res.status(404).send("No trainers match your delete condition");
    }

    res.send(`You have deleted ${deletedCount} trainers from the database`);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  list_trainers,
  find_trainer,
  create_trainer,
  partially_update_trainer,
  fully_update_trainer,
  delete_trainer,
  delete_trainers,
};
