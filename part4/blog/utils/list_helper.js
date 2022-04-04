const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, current) => accumulator + current.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, curr) =>
    acc.likes < curr.likes
      ? { title: curr.title, author: curr.author, likes: curr.likes }
      : acc
  );
};

module.exports = { dummy, totalLikes, favoriteBlog };
