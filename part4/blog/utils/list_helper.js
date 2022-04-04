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

const mostBlogs = (blogs) => {
  let authorList = [];

  blogs.forEach((curr) => {
    let found = authorList.find((element) => element.author == curr.author);

    if (found) {
      authorList[authorList.indexOf(found)].blogs++;
    } else {
      authorList.push({ author: curr.author, blogs: 1 });
    }
  });

  return authorList.reduce((acc, curr) =>
    acc.author < curr.author ? curr : acc
  );
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
