const articleModel = require("../models/article.model");

const uploadArticle = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(401).send({ message: "No content provided !" });
  }
  try {
    await articleModel.create(body);
    res.status(200).send({ message: "success!" });
  } catch (error) {
    return res.status(401).send({ message: error?.message });
  }
};

const viewArticle = async function (req, res) {
  const { title } = req.params;
  if (!title) {
    return res.status(401).send({ message: "No specifications !" });
  }
  try {
    const article = articleModel.findOne({ title });
    if (!article) {
      return res.status(404).send({ message: "Not found!" });
    }
    res.status(200).send({ article });
  } catch (error) {
    return res.status(401).send({ message: error?.message });
  }
};

const deleteArticle = async function (req, res) {
  const { title } = req.params;
  if (!title) {
    return res.status(401).send({ message: "No specifications !" });
  }
  try {
    const article = articleModel.findOne({ title }, { _id: 0 });
    if (!article) {
      return res.status(404).send({ message: "Not found!" });
    }
    res.status(200).send({ message: "Success" });
  } catch (error) {
    return res.status(401).send({ message: error?.message });
  }
};

const allArticles = async function (req, res) {
  try {
    const articles = articleModel.find();
    if (!articles) {
      return res.status(404).send({ message: "Not found!" });
    }
    res.status(200).send(articles);
  } catch (error) {
    return res.status(401).send({ message: error?.message });
  }
};

module.exports = { allArticles, viewArticle, deleteArticle, uploadArticle };
